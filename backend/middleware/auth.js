const jwt = require('jsonwebtoken');

// Authentication middleware to verify JWT tokens
const auth = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Added split to get the token part
    if (!token) return res.status(401).json({ message: 'Access denied' }); // Check if token exists

    try {
        // Verify the token using the JWT secret from environment variables
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user information to the request object
        next(); // Move to the next middleware or route handler
    } catch (error) {
        // Handle invalid token
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = auth; // Export the auth middleware
