const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;