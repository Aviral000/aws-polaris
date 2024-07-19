const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const addUser = async (data) => {
    try {
        const { firstName, email, password } = data;

        if(!firstName || !email || !password) {
            throw new Error("Fill out the details properly");
        }

        if(findUserByEmail()) {
            throw new Error("Email is already taken");
        }

        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ ...data, password: cryptedPassword });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

const findUserByEmail = async (data) => {
    try {
        const user = await User.find({ email: data.email });
        return user;
    } catch (error) {
        return false;
    }
}

const findUserById = async (data) => {
    try {
        const user = await User.findById(data.id);
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { addUser, findUserById }