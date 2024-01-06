const {Product} = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();




// Get all products
const getAllProducts = async (req, res) => {
    try {
        let filter = {};
        
        // Check for the existence of the 'categories' query parameter
        if (req.query.categories) {
            filter = { category: { $in: req.query.categories.split(',') } };
        }

        // Use 'await' to wait for the Product.find() operation to complete
        const productList = await Product.find(filter).populate('category');

        // Check if productList is an empty array
        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        // Respond with the productList
        res.status(200).json({ success: true, data: productList });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        // Validate required fields
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({ success: false, error: "Name, description, and price are required fields" });
        }

        // Create a new product
        const product = new Product({
            name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        });

        // Save the product to the database
        const savedProduct = await product.save();

        // Respond with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Update a product by ID
const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // First argument: product ID
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            { new: true } // { new: true } ensures you get the updated document in the response
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


// Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
