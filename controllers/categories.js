const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('categories').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while retrieving categories.' });
  }
};

const getSingle = async (req, res) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('categories').findOne({ _id: categoryId });
    
    if (!result) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while retrieving the category.' });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = {
      categoryName: req.body.categoryName,
      description: req.body.description,
      parentCategory: req.body.parentCategory,
      createdDate: req.body.createdDate,
      isActive: req.body.isActive
    };

    // Validation
    if (!category.categoryName || !category.description || 
        category.isActive === undefined || !category.createdDate) {
      res.status(400).json({ message: 'CategoryName, description, createdDate, and isActive are required' });
      return;
    }

    // Validate isActive is boolean
    if (typeof category.isActive !== 'boolean') {
      res.status(400).json({ message: 'isActive must be a boolean' });
      return;
    }

    const result = await mongodb.getDatabase().collection('categories').insertOne(category);
    
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create category' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the category.' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const category = {
      categoryName: req.body.categoryName,
      description: req.body.description,
      parentCategory: req.body.parentCategory,
      createdDate: req.body.createdDate,
      isActive: req.body.isActive
    };

    // Validation
    if (!category.categoryName || !category.description || 
        category.isActive === undefined || !category.createdDate) {
      res.status(400).json({ message: 'CategoryName, description, createdDate, and isActive are required' });
      return;
    }

    // Validate isActive is boolean
    if (typeof category.isActive !== 'boolean') {
      res.status(400).json({ message: 'isActive must be a boolean' });
      return;
    }

    const result = await mongodb.getDatabase().collection('categories').updateOne(
      { _id: categoryId },
      { $set: category }
    );

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the category.' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('categories').deleteOne({ _id: categoryId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the category.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory
};