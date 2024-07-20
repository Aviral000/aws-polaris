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
        const { data: user, token } = await loggedUser(req.body);

        res.cookie('token', token, { maxAge: 3600000 });

        res.status(StatusCodes.OK).json({ data: user, token, loggedIn: true });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

module.exports = { signup, login };