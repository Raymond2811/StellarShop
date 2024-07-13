const { Product, Category } = require('../models');
const products = require('./seedData');
const cleanDB = require('./cleanDB');

const seedData = async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = [
    {name: 'Computers & Tablets'},
    {name: 'Video Games'},
    {name: 'Cell Phones'},
    {name: 'Cameras & Drones'}
  ];

  try {

    const createdCategories = await Category.insertMany(categories);

    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    const productsWithCatgoryIds = products.map(product => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productsWithCatgoryIds);

    console.log('Database seeded successfully');
  } catch(error){
    console.error('Error seeding database:', error);
  } 

  process.exit();
};

seedData();