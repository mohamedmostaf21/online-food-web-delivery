const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files only when explicitly enabled and the frontend build exists
const frontendDist = path.join(__dirname, '../frontend/dist');
const frontendIndex = path.join(frontendDist, 'index.html');
const frontendBuildExists = fs.existsSync(frontendDist) && fs.existsSync(frontendIndex);
const serveFrontend = process.env.SERVE_FRONTEND === 'true' && frontendBuildExists;
if (serveFrontend) {
    console.log('Serving frontend from', frontendDist);
    app.use(express.static(frontendDist));
} else if (process.env.SERVE_FRONTEND === 'true' && !frontendBuildExists) {
    console.warn('ENV SERVE_FRONTEND=true but frontend build not found at', frontendDist);
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/food-ordering')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Fallback route for React Router - serve index.html only when enabled and build exists
if (serveFrontend) {
    app.get('*', (req, res) => {
        res.sendFile(frontendIndex);
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const response = { message: err.message || 'Something went wrong!' };
    if (process.env.NODE_ENV !== 'production') {
        response.stack = err.stack;
    }
    res.status(500).json(response);
});

const PORT = process.env.PORT || 5001;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
