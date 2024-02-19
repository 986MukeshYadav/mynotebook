
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'});
const DB =process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => console.error('MongoDB connection error:', err));
  
module.exports = mongoose.connection; 

// for db connection