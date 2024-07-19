const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
        validator: validator.isEmail,
        message: "Email is invalid"
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
        validator: validator.isStrongPassword,
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
