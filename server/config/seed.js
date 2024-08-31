const { User, Product, Category } = require('../models');
const products  = require('./seedData');
const cleanDB = require('./cleanDB');
const db = require('./connection');

async function seedData() {
  try {
    await cleanDB('Category', 'categories');
    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');

    const categories = await Category.insertMany([
      { name: 'Home', sortOrder: 1},
      { name: 'Computers', sortOrder: 2 },
      { name: 'Video Games', sortOrder: 3 },
      { name: 'Cell Phones', sortOrder: 4 },
      { name: 'Cameras', sortOrder: 5 }
    ]);

    const categoryMap = categories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    const productsWithCategoryIds = products.map(product => ({
      ...product,
      category: categoryMap[product.category]
    }));
    
    createdProducts = await Product.insertMany(productsWithCategoryIds);

    for (let product of createdProducts) {
      await Category.findByIdAndUpdate(product.category, { $push: { products: product._id } });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
  process.exit();
};

db.once('open', seedData);