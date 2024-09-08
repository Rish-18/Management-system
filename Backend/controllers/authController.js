const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Register a new user
const register = (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    Auth.findOne({ username })
      .then(existingUser => {
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
        const newUser = new Auth({ username, password, role });
        newUser.save()
          .then(() => res.status(201).json({ message: 'User registered successfully' }))
          .catch(err => res.status(500).json({ message: 'Error registering user', error: err }));
      })
      .catch(err => res.status(500).json({ message: 'Error checking user existence', error: err }));
  };

// Login a user
const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }
    Auth.findOne({ username })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return res.status(500).json({ message: 'Error comparing passwords' });
                if (!result) return res.status(401).json({ message: 'Invalid credentials' });

                // Generate JWT token
                const token = jwt.sign({ id: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

                res.json({ message: 'Login successful', token });
            });
        })
        .catch((err) => res.status(500).json({ message: 'Error logging in', error: err }));
};

module.exports = {
    register,
    login,
};
