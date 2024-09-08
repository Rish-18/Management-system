const jwt = require('jsonwebtoken');
const User = require('../models/auth'); // Adjust path as needed

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => { // Use your secret key here
      if (err) {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
      }

      User.findById(decoded.id)
        .then(user => {
          if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ success: false, message: 'Access Denied. Unauthorized role.' });
          }

          req.user = user; // Add user to request object
          next(); // Proceed to the next middleware or route handler
        })
        .catch(() => res.status(500).json({ success: false, message: 'Internal Server Error.' }));
    });
  };
};

module.exports = authorizeRole;
