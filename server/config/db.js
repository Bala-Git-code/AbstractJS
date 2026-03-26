const mongoose = require('mongoose');
const env = require('./env');

async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is not configured.');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
}

module.exports = {
  connectDatabase,
};
