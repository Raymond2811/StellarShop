const { Product, Category } = require('../models');
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

  const products = [
    {
      name: 'Apple - MacBook Pro 14" Laptop - 512GB SSD - Space Black',
      description: 'Very smart computer with fancy parts',
      price: 1500.00,
      quantity: 50,
      category: 'Computers & Tablets',
    },
    {
      name: 'Apple - MacBook Air 13.6" Laptop - 256GB SSD - Midnight',
      description:'Very smart computer with fancy parts',
      price: 499.00,
      quantity: 50,
      category: 'Computers & Tablets',
    },
    {
      name: 'PlayStation 5 Slim Console Digital Edition',
      description:'Pretty good console',
      price: 249.99,
      quantity: 50,
      category: 'Video Games',
    },
    {
      name: 'PlayStation 6 Slim Console',
      description:'Better than the ps5 ',
      price: 999.98,
      quantity: 25,
      category: 'Video Games',
    },
    {
      name: 'Apple - iPhone 15 Pro 512GB - Natural Titanium (AT&T)',
      description:'smart phone and has 3 good cameras',
      price: 1099.97,
      quantity: 50,
      category: 'Cell Phones',
    },
    {
      name: 'Apple - iPhone 17 Pro 512GB - Natural Admantium (AT&T)',
      description:'better than the iPhone 15',
      price: 2111.94,
      quantity: 15,
      category: 'Cell Phones',
    },
    {
      name: 'Nikon - Z 8 8K Video Mirrorless Camera (Body Only) - Black',
      description:'good camera',
      price: 2576.00,
      quantity: 25,
      category: 'Cameras & Drones',
    },
    {
      name: 'Canon - EOS R6 Mark II Mirrorless Camera (Body Only) - Black',
      description:'alright camera',
      price: 1025.93,
      quantity: 30,
      category: 'Cameras & Drones',
    },
  ]

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