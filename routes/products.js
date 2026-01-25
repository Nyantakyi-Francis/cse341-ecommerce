const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/auth');

// #swagger.tags = ['Products']
router.get('/', productsController.getAll);

// #swagger.tags = ['Products']
router.get('/:id', productsController.getSingle);

// #swagger.tags = ['Products']
// #swagger.security = [{ "oauth2": [] }]
router.post('/', isAuthenticated, productsController.createProduct);

// #swagger.tags = ['Products']
// #swagger.security = [{ "oauth2": [] }]
router.put('/:id', isAuthenticated, productsController.updateProduct);

// #swagger.tags = ['Products']
// #swagger.security = [{ "oauth2": [] }]
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;