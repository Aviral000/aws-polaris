const User = require("../models/user.model");
const { Token_Key } = require("../config/config");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const addUser = async (data) => {
    try {
        const { firstName, email, password } = data;

        if(!firstName || !email || !password) {
            throw new Error("Fill out the details properly");
        }

        if(await findUserByEmail()) {
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

const loggedUser = async (data) => {
    try {
        const { email, password } = data;

        if(!email || !password) {
            throw new Error("Email and password shouldn't be blanked");
        }

        const user = await findUserByEmail(data);

        if(user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if(isPasswordCorrect) {
                const token = await genToken(user._id);

                return { data: user, token: token }
            } else {
                throw new Error("Invalid credentials");
            }
        } else {
            throw new Error("Email is not registered");
        }
    } catch (error) {
        throw new Error(error);
    }
}

const findUserByEmail = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        return user;
    } catch (error) {
        return null;
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

const genToken = async (id) => {
    const payload = { _id: id };
    const options = { expiresIn: '1h' };

    const token = jwt.sign(payload, Token_Key.Private_key, options);

    if(token) {
        return token;
    } else {
        throw new Error("Token creation failed")
    }
}

module.exports = { addUser, findUserById, loggedUser }