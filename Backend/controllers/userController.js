const Auth = require('../models/auth'); // Import the Auth model

// Add a new user (Admin only)
const addUser = (req, res) => {
    const { username, password, role } = req.body;

    // Check if user already exists
    Auth.findOne({ username })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Create new user
            const newUser = new Auth({ username, password, role });

            // Save the new user
            newUser.save()
                .then(() => res.status(201).json({ success: true, message: 'User added' }))
                .catch(err => res.status(500).json({ error: 'Error adding user', error: err }));
        })
        .catch(err => res.status(500).json({ error: 'Internal server error', error: err }));
};

// Delete a user (Admin only)
const deleteUser = (req, res) => {
    const { id } = req.params;

    // Delete user by ID
    Auth.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ success: true, message: 'User deleted' });
        })
        .catch(err => res.status(500).json({ error: 'Internal server error', error: err }));
};

module.exports = {
    addUser,
    deleteUser,
};
