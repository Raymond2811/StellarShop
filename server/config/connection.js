require('dotenv').config();
const mongoose = require('mongoose');

// const mongoOptions = {
//   useNewURLParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000,
// }

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/StellarShop');

module.exports = mongoose.connection;