const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate:{
    type: Date,
    default: Date.now
  },
  products: [
    {  
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity:{
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ],
  totalAmount:{
    type: Number,
    requied: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
},{
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;