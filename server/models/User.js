const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// const Order = require('./Order');
const Cart = require('./Cart')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+/, 'Must be a valid email address!']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  orders: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Order'
    },
  ],
  cart: [Cart.schema],
});

userSchema.pre('save', async function(next){
  if(this.isNew || this.isModified('password')){
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User',userSchema);

module.exports = User;
