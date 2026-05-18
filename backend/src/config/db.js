// creating this file to connect using mongoDB

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
        'mongodb+srv://william_lemus:U0VCTctI0yLwMNAK@cluster0.5zasnqn.mongodb.net/notes_db?appName=Cluster0'
    );
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // exit with failure
  }
};

module.exports = connectDB;