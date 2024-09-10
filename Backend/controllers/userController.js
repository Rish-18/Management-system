const bcrypt = require('bcrypt'); 
const Auth = require('../models/auth'); 

const addUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const existingUser = await Auth.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Auth({ username, password: hashedPassword, role });

        await newUser.save();
        return res.status(201).json({ success: true, message: 'User added' });
    } catch (err) {
        return res.status(500).json({ error: 'Error adding user', details: err.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Auth.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};


const getUsers = (req, res) => {
    Auth.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Error fetching users', error: err }));
};

module.exports = {
    addUser,
    deleteUser,
    getUsers,
};
