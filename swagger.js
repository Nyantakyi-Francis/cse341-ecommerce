const swaggerAutogen = require('swagger-autogen')();

// Check if we're generating for production or local
const isProduction = process.argv.includes('--production');

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API for managing products and categories with OAuth authentication',
    version: '1.0.0'
  },
  host: isProduction ? 'cse341-ecommerce-uruy.onrender.com' : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http'],
  basePath: '/',
  securityDefinitions: {
    oauth2: {
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: isProduction 
        ? 'https://cse341-ecommerce-uruy.onrender.com/auth/login'
        : 'http://localhost:3000/auth/login',
      scopes: {
        'user:email': 'Access user email'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);