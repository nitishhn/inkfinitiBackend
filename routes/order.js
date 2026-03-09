




const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust the path to your Order model
const mongoose = require('mongoose');



// Create Order
router.post('/createOrder', async (req, res) => {
    const { title, quantity, price, size } = req.body;

    try {
        const newOrder = new Order({
            title,
            quantity,
            price,
            size,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error('Error during order creation:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Get All Orders
router.get('/getAllOrders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Get Order by ID
router.get('/getOrderById/:id', async (req, res) => {
    const { id } = req.params;



    try {
        const orderId = new mongoose.Types.ObjectId(id);
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Update Order
router.put('/updateOrderById/:id', async (req, res) => {
    const { id } = req.params;
    const { title, quantity, price, size } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { title, quantity, price, size }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Delete Order
router.delete('/deleteOrderById/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

