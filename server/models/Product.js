const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ' '
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref:'Tag'
    }
  ]
}, {
    timestamps: true
});

productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ tags: 1});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;