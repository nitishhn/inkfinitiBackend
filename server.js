const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/inkfiniti', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the eCommerce API');
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes= require('./routes/product')
app.use('/api/products', productRoutes);


const orderRoutes= require('./routes/order')
app.use('/api/orders', orderRoutes);





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
