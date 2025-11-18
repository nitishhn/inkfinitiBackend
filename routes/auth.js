// routes/auth.js
const express = require('express');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();


// Secret key for JWT
const JWT_SECRET = 'nanhesargotil'; // Change this to a secure key

// Login route
router.post('/login', async (req, res) => {
    // console.log("hitting");
    const { email, password } = req.body;
    // console.log('Request body:', req.body);

    try {
        const user = await User.findOne({ email: email });
        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Create JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, role: user.role,username:user.username });
    }    catch (error) {
        console.error('Error during login:', error); // Log the error
        return res.status(500).json({ message: 'Server error' });
    }
    
});



// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Example protected route
router.get('/dashboard', authMiddleware, (req, res) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.json({ message: 'Welcome to the admin dashboard' });
});





router.post('/signup', async (req, res) => {
    const { email,username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with default role as 'user'
        const newUser  = new User({
            email,
            username,
            password: hashedPassword,
            role: 'user', // Default role
        });

        // Save the user to the database
        await newUser .save();

      
        res.status(201).json({ message: "User  registered successfully" });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
