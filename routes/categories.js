const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const { isAuthenticated } = require('../middleware/auth');

// #swagger.tags = ['Categories']
router.get('/', categoriesController.getAll);

// #swagger.tags = ['Categories']
router.get('/:id', categoriesController.getSingle);

// #swagger.tags = ['Categories']
// #swagger.security = [{ "oauth2": [] }]
router.post('/', isAuthenticated, categoriesController.createCategory);

// #swagger.tags = ['Categories']
// #swagger.security = [{ "oauth2": [] }]
router.put('/:id', isAuthenticated, categoriesController.updateCategory);

// #swagger.tags = ['Categories']
// #swagger.security = [{ "oauth2": [] }]
router.delete('/:id', isAuthenticated, categoriesController.deleteCategory);

module.exports = router;