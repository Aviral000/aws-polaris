const { StatusCodes } = require('http-status-codes')
const { addUser, loggedUser } = require('../services/user.service');

const signup = async (req, res) => {
    try {
        const user = await addUser(req.body);
        res.status(StatusCodes.CREATED).json({ data: user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const user = await loggedUser(req.body);
        res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    }
}

module.exports = { signup, login };