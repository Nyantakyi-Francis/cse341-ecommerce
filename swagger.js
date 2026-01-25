const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: `API for managing products and categories with OAuth authentication.
    
**AUTHENTICATION INSTRUCTIONS:**
1. To test protected routes (POST, PUT, DELETE), you must first log in
2. Open a new tab and go to: ${process.env.NODE_ENV === 'production' ? 'https://cse341-ecommerce-uruy.onrender.com' : 'http://localhost:3000'}/auth/login
3. Authorize with GitHub
4. Return to this Swagger page and test the protected routes
5. To log out, visit: ${process.env.NODE_ENV === 'production' ? 'https://cse341-ecommerce-uruy.onrender.com' : 'http://localhost:3000'}/auth/logout

**PUBLIC ROUTES** (no login required):
- GET /products
- GET /products/{id}  
- GET /categories
- GET /categories/{id}

**PROTECTED ROUTES** (login required):
- POST /products
- PUT /products/{id}
- DELETE /products/{id}
- POST /categories
- PUT /categories/{id}
- DELETE /categories/{id}`,
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);