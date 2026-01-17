const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('products').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while retrieving products.' });
  }
};

const getSingle = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('products').findOne({ _id: productId });
    
    if (!result) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while retrieving the product.' });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = {
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      manufacturer: req.body.manufacturer,
      sku: req.body.sku,
      weight: req.body.weight,
      dimensions: req.body.dimensions,
      imageUrl: req.body.imageUrl
    };

    // Validation
    if (!product.productName || !product.description || !product.category || 
        !product.price || !product.stockQuantity || !product.manufacturer || 
        !product.sku || !product.weight || !product.dimensions || !product.imageUrl) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Validate price and stockQuantity are numbers
    if (typeof product.price !== 'number' || product.price <= 0) {
      res.status(400).json({ message: 'Price must be a positive number' });
      return;
    }

    if (typeof product.stockQuantity !== 'number' || product.stockQuantity < 0) {
      res.status(400).json({ message: 'Stock quantity must be a non-negative number' });
      return;
    }

    const result = await mongodb.getDatabase().collection('products').insertOne(product);
    
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create product' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while creating the product.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const product = {
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      manufacturer: req.body.manufacturer,
      sku: req.body.sku,
      weight: req.body.weight,
      dimensions: req.body.dimensions,
      imageUrl: req.body.imageUrl
    };

    // Validation
    if (!product.productName || !product.description || !product.category || 
        !product.price || !product.stockQuantity || !product.manufacturer || 
        !product.sku || !product.weight || !product.dimensions || !product.imageUrl) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Validate price and stockQuantity are numbers
    if (typeof product.price !== 'number' || product.price <= 0) {
      res.status(400).json({ message: 'Price must be a positive number' });
      return;
    }

    if (typeof product.stockQuantity !== 'number' || product.stockQuantity < 0) {
      res.status(400).json({ message: 'Stock quantity must be a non-negative number' });
      return;
    }

    const result = await mongodb.getDatabase().collection('products').updateOne(
      { _id: productId },
      { $set: product }
    );

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the product.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('products').deleteOne({ _id: productId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while deleting the product.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};