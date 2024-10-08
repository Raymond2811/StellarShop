const { Cart, Category, Order, Product, Tag, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if(!context.user) {
        throw AuthenticationError;
      }

      try {
        const user = await User.findById(context.user._id)
          .populate({
            path: 'orders.products',
            populate: 'category',
          })
          .populate('cart');
        
        if (user.orders){
          user.orders.sort ((a,b) => b.purchaseDate - a.purchaseDate);
        }
      
        return user;
      } catch( error ) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user data');
      }
    }, 
    categories: async () => {
      try{
        return await Category.find().sort({ sortOrder: 1 });
      } catch(error){
        throw new Error(`Error fetching categories: ${error.message}`)
      }
    },
    category: async (parent, {_id}) => {
      try {
        const category = await Category.findById(_id)
          .populate('products');
          return category;
      } catch(error){
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    product: async (parent, { _id }) => {
      try {
        console.log("product data:",_id)
        const product = await Product.findById(_id)
          .populate('category')
          .populate('tags');
        
        if (!product) {
          throw new Error('Product not found');
        }

        return product;
      } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
      }
    },
    products: async (parent, { category, name, tag }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (tag) {
        params.tags = tag;
      }

      if (name) {
        params.name = {
          $regex: name,
          $options: 'i'
        };
      }

      try {
        const products = await Product.find(params).populate('category').populate('tags');
        return products;
      } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
    },
    orders: async (parent, args, context) => {
      if(!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const userOrders = await User.findById(context.user._id)
        .populate({
          path: 'orders',
          populate: {
            path: 'products.product',
            model: 'Product'
          }
        });

        if(!userOrders){
          throw new Error('User not found');
        }

        return userOrders.orders
      } catch(error){
        throw new Error(`An error occurred while fetching orders: ${error.message}`);
      }
    },
    cart: async (parent, args, context) => {
      if(!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const user = await User.findById(context.user._id)
          .populate('cart.product');
        
        if (!user) {
          throw new Error('User not found');
        }
        return user.cart;
      } catch (error) {
        throw new Error(`Failed to fetch cart: ${error.message}`);
      }
    },
  },
  Mutation: {
    checkout: async (parent, { products }, context) => {
      if(!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }
      const url = new URL(context.headers.referer).origin;

      try {
        const lineItems = products.map(product => ({
          price_data:{
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              //only works with img urls!
              // images: ['https://via.placeholder.com/150'],
            },
            unit_amount: Math.floor(product.price * 100),
          },
          quantity: product.purchaseQuantity,
        }));
      
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${url}/success`,
          cancel_url: `${url}/`,
        });

        return { session: session.id };
      } catch (error) {
        throw new Error(`Failed to create checkout session: ${error.message}`);
      }
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
  
        return {token, user};
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    updateUser: async (parent, args, context) => {
      if(!context.user){
        throw AuthenticationError;
      }

      try {
        if (args.password) {
          const saltRounds = 10;
          args.password = await bcrypt.hash(args.password, saltRounds);
        }
    
        const user = await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });

        return user;
      } catch (error) {
       throw new Error(`Failed to update user: ${error.message}`);
      }
    },
    deleteUser: async (parent, {email, password}, context) => {
      if(!context.user){
        throw AuthenticationError;
      }

      try {
        const user = await User.findById(context.user._id);

        const isPasswordCorrect = await user.isCorrectPassword(password);
        if (!isPasswordCorrect || user.email !== email){
          throw new Error('Incorrect email or password');
        }

        await User.findByIdAndDelete(context.user._id);
        return {
          success: true,
          message: 'User deleted successfully',
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to delete user: ${error.message}`,
        };
      }
    },
    addOrder: async (parent, { products }, context) => {
      if(!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const orderProducts = products.map(({_id, purchaseQuantity}) => ({
          product: _id,
          purchaseQuantity
        }))

        const totalAmount = products.reduce((sum, {price, purchaseQuantity}) => 
        sum + (price * purchaseQuantity), 0);

        const order = await Order.create({ 
          products: orderProducts,
          totalAmount,
          status:'Pending',
         });
        
        await User.findByIdAndUpdate(context.user._id, {
          $push: {orders: order._id},
        });
        const populatedOrder = await Order.findById(order._id).populate('products.product');

        return populatedOrder;
      } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
      }
    },
    updateProduct: async (parent, { _id, quantity }) => {
      try {
        const decrement = Math.abs(quantity) * -1;

        return await Product.findByIdAndUpdate(
          _id,
          { $inc: {quantity: decrement }},
          { new: true}
        ); 
      } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({email});

        if (!user){
          throw new AuthenticationError('No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw){
          throw new AuthenticationError('Incorrect password');
        }

        const token = signToken(user);

        return { token, user};
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },
    logout: async (parent, args, context) => {
      try {
        if(context.user){
          context.user = null;
          return 'you have been logged out';
        }

        throw new AuthenticationError('No user is currently logged in');
      } catch (error) {
        throw new Error(`Logout failed: ${error.message}`);
      }
    },
    addToCart: async (parent, { productId , purchaseQuantity}, context) => {
      if(!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const productToAdd = await Product.findById(productId);

        if(!productToAdd){
          throw new Error('Product not found');
        }

        const user = await User.findById(context.user._id);
        const cartItemIndex = user.cart.findIndex(item => item.product.equals(productId));

        if (cartItemIndex > -1){
          user.cart[cartItemIndex].purchaseQuantity[0] += purchaseQuantity ; 
        }else{
          user.cart.push ({ product: productId, purchaseQuantity:[ purchaseQuantity]});
        }
        await user.save();
        await user.populate('cart.product');
        return user.cart;
      } catch (error) {
        throw new Error(`Failed to add product to cart: ${error.message}`);
      }
    },
    removeFromCart: async (parent, { productId } , context ) =>{
      if(!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: {cart:  {product: productId} }},
          { new: true}
        ).populate('cart.product');

        console.log('successfully removed from cart:', user.cart);
        return user.cart;
      } catch (error) {
        throw new Error(`Failed to remove product from cart: ${error.message}`);
      }
    },
    clearCart: async (parent, args, context) => {
      if(!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const user = await User.findByIdAndUpdate (
          context.user._id,
          { $set: {cart: [] }},
          { new: true }
        ).populate('cart');

        return user.cart;
      } catch (error) {
        throw new Error(`Failed to clear cart: ${error.message}`);
      }
    },
  }
}

module.exports = resolvers;