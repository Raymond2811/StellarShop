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
  }
}

module.exports = resolvers;