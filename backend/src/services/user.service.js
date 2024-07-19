const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const addUser = async (data) => {
    try {
        const { firstName, email, password } = data;
        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ ...data, password: cryptedPassword });
        return user;
    } catch (error) {
        throw new Error(error);
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