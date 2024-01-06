const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();



const getAllCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();

        if (!categoryList) {
            return res.status(500).json({ success: false });
        }

        res.status(200).send(categoryList);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(500).json({ message: 'The category with the given ID was not found' });
        }

        res.status(200).send(category);
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const createCategory = async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });

        category = await category.save();

        if (!category) {
            return res.status(400).send('The category cannot be created');
        }

        res.status(201).send(category);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            },
            { new: true }
        );

        if (!category) {
            return res.status(404).send('The category with the given ID was not found');
        }

        res.status(200).send(category);
    } catch (error) {
        console.error("Error updating category by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (category) {
            return res.status(200).json({ success: true, message: 'The category is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Category not found!' });
        }
    } catch (error) {
        console.error("Error deleting category by ID:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
};
