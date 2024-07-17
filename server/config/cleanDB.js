const models = require('../models');
const db = require('./connection');
module.exports = async (modelName, collectionName) => {
  try {
    // Check if the model exists in the models object
    if (models && models[modelName] && models[modelName].db && models[modelName].db.db) {
      let modelExists = await models[modelName].db.db.listCollections({
        name: collectionName
      }).toArray();

      if (modelExists.length) {
        await db.dropCollection(collectionName);
        console.log(`Successfully dropped collection: ${collectionName}`);
      }
    } else {
      console.error(`Model "${modelName}" is not properly defined or is missing necessary properties.`);
    }
  } catch (err) {
    throw err;
  }
};