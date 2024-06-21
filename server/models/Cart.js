const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
  ],
  addedOn: [{type: Date, default: Date.now}],
  quantity: [{type: Number, default: 1}]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;