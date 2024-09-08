const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Stock Manager'],
        required: true,
    },
});

// Hash password before saving the user
AuthSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
    });
});

module.exports = mongoose.model('Auth', AuthSchema); // 'Auth' is the name of the model
