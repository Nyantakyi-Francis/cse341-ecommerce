const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: `API for managing products and categories with OAuth authentication.
    
**AUTHENTICATION INSTRUCTIONS:**
1. To test protected routes (POST, PUT, DELETE), you must first log in
2. Open a new tab and go to: https://cse341-ecommerce-uruy.onrender.com/auth/login
3. Authorize with GitHub
4. Return to this Swagger page and test the protected routes
5. To log out, visit: https://cse341-ecommerce-uruy.onrender.com/auth/logout

**PUBLIC ROUTES** (no login required):
- GET /products - Get all products
- GET /products/{id} - Get single product
- GET /categories - Get all categories
- GET /categories/{id} - Get single category

**PROTECTED ROUTES** (login required):
- POST /products - Create new product
- PUT /products/{id} - Update product
- DELETE /products/{id} - Delete product
- POST /categories - Create new category
- PUT /categories/{id} - Update category
- DELETE /categories/{id} - Delete category`,
    version: '1.0.0'
  },
  host: 'cse341-ecommerce-uruy.onrender.com',
  schemes: ['https'],
  basePath: '/'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);