const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API for managing products and categories',
    version: '1.0.0'
  },
  host: 'cse341-ecommerce-uruy.onrender.com',  
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);