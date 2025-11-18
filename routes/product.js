

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import the Product model
const mongoose = require('mongoose');

// POST endpoint to create a new product
router.post('/createProduct', async (req, res) => {
    const { title, category, price, imageUrl } = req.body;

    try {
        const newProduct = new Product({
            title,
            category,
            price,
            imageUrl,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error('Error during product creation:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET endpoint to retrieve all products
router.get('/getProducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});





router.get('/getProductById/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Convert the id to a MongoDB ObjectId using the new keyword
        const productId = new mongoose.Types.ObjectId(id);
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});





router.put('/updateProductById/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, price, imageUrl } = req.body;

    try {
        // Convert the id to a MongoDB ObjectId using the new keyword
        const productId = new mongoose.Types.ObjectId(id);
        
        // Find the product to ensure it exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, // Use the ObjectId here
            { title, category, price, imageUrl },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// DELETE endpoint to delete a product by ID
router.delete('/deleteProductById/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Convert the id to a MongoDB ObjectId using the new keyword
        const productId = new mongoose.Types.ObjectId(id);
        
        // Find the product to ensure it exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }



        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Server error' });
    }

});

module.exports = router;

