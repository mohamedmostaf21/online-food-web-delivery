const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const rawAuth = req.header('Authorization');
    const token = rawAuth?.replace('Bearer ', '');

    if (!token) {
      console.warn('authMiddleware: No token provided. Authorization denied. Headers:', { rawAuth });
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Decode and attach user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    console.log('authMiddleware: token decoded for userId=', req.userId, 'role=', req.userRole);
    next();
  } catch (error) {
    console.error('authMiddleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
