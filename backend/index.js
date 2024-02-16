const mongooseConnection = require('./db');
const express = require('express');

mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
  
  const app = express();
  const port = 3000;

  app.use(express.json());
  // app.get('/', (req, res) => {
  //   res.send('Hello World!');
  // });

  //Available Routes

  app.use('/api/auth',require('./routes/auth'));
  app.use('/api/notes',require('./routes/notes'));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
