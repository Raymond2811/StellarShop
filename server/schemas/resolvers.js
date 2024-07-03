const { Cart, Category, Order, Product, Tag, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('');

const resolvers = {
  Query: {
    user: async (_root, args, context) => {
      if(!context.user) {
        throw new AuthenticationError('You need to be logged in!');
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
        return await Category.find();
      } catch(error){
        throw new Error(`Error fetching categories: ${error.message}`)
      }
    },
    category: async (_root, {_id}) => {
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
          path:'orders.products',
        });

        if(!userOrders){
          throw new Error('User not found');
        }

        return userOrders.orders
      } catch(error){
        throw new Error(`An error occurred while fetching orders: ${error.message}`);
      }
    },
  }
}

module.exports = resolvers;