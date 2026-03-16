

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import the Product model
const mongoose = require('mongoose');

// POST endpoint to create a new product
router.post('/createProduct', async (req, res) => {
    const { title,category, price, imageUrl } = req.body;

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


router.post('/addBulktshirts', async (req, res) => {
  const tshirts = [
  {
    "title": "Classic White Tee",
    "category": "tshirt",
    "price": "19.99",
    "imageUrl": "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25840430/2025/5/21/9fc780b2-0167-47a1-ae42-7984cfbee1201747804224431-Mad-Over-Print-Psychedelic-Printed-Cotton-Oversized-T-shirt--1.jpg"
  },
  {
    "title": "Graphic Black Tee 1",
    "category": "tshirt",
    "price": "24.99",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Cw9KNOLazlw2rX2ZabhzMhiS7csOElKuuA&s"
  },
  {
    "title": "Striped Blue Tee 1",
    "category": "tshirt", 
    "price": "22.99",
    "imageUrl": "https://4.imimg.com/data4/VU/TY/MY-3836831/t-shirts-printing.jpg"
  },
  {
    "title": "Vintage Red Tee 1",
    "category": "tshirt",
    "price": "27.99",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBOKhxtlNyvdNeg7qYl_z7bYwt3rFEC-eQw&s"
  },
  {
    "title": "Graphic Black Tee 2",
    "category": "tshirt",
    "price": "25.99",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Cw9KNOLazlw2rX2ZabhzMhiS7csOElKuuA&s"
  },
  {
    "title": "Striped Blue Tee 2",
    "category": "tshirt",
    "price": "23.99",
    "imageUrl": "https://4.imimg.com/data4/VU/TY/MY-3836831/t-shirts-printing.jpg"
  },
  {
    "title": "Vintage Red Tee 2",
    "category": "tshirt",
    "price": "28.99",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBOKhxtlNyvdNeg7qYl_z7bYwt3rFEC-eQw&s"
  },
  {
    "title": "Classic White Tee 2",
    "category": "tshirt",
    "price": "20.99",
    "imageUrl": "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25840430/2025/5/21/9fc780b2-0167-47a1-ae42-7984cfbee1201747804224431-Mad-Over-Print-Psychedelic-Printed-Cotton-Oversized-T-shirt--1.jpg"
  }




  ];

  try {
    await Product.insertMany(tshirts);
    res.json({ message: 'All t-shirts added successfully!', count: tshirts.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { title,size, category, price, imageUrl } = req.body;

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

