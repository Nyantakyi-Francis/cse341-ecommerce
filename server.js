const express = require('express');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Dynamic Swagger setup
let swaggerDocument = require('./swagger-output.json');

// Override host based on environment
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
  swaggerDocument.host = 'https://cse341-ecommerce-uruy.onrender.com/api-docs';
  swaggerDocument.schemes = ['https'];
} else {
  swaggerDocument.host = 'localhost:3000';
  swaggerDocument.schemes = ['http'];
}

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', require('./routes'));

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to your database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to database and server is running on port ${port}`);
    });
  }

});

