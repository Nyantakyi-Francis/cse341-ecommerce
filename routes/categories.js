const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

// GET all categories
router.get('/', categoriesController.getAll);

// GET single category by ID
router.get('/:id', categoriesController.getSingle);

// POST create new category
router.post('/', categoriesController.createCategory);

// PUT update category by ID
router.put('/:id', categoriesController.updateCategory);

// DELETE category by ID
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;