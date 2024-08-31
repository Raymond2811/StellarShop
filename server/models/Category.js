const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  sortOrder: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;