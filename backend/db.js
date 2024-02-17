const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB Database ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error in MongoDB ${error}`);
    }
};

module.exports = connectDB;




// //2EEARiWLjOBEosQm
// const mongoose = require('mongoose');

// //  const DB = "mongodb+srv://myadav986:2EEARiWLjOBEosQm@data.3n83hqb.mongodb.net/?retryWrites=true&w=majority"
// // const DB =process.env.DATABASE
// mongoose.connect(DB).then(() => {
//     console.log('Connected to MongoDB');
//   }).catch((err) => console.error('MongoDB connection error:', err));
  
// module.exports = mongoose.connection; // Exporting the mongoose connection object






