//2EEARiWLjOBEosQm
const mongoose = require('mongoose');
const DB ="mongodb+srv://myadav986:2EEARiWLjOBEosQm@data.3n83hqb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => console.error('MongoDB connection error:', err));
  
module.exports = mongoose.connection; // Exporting the mongoose connection object






