const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Define routes using the controller functions
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
