const { StatusCodes } = require('http-status-codes')
const { addUser } = require('../services/user.service');

const signup = async (req, res) => {
    try {
        const user = await addUser(req.body);
        res.status(StatusCodes.CREATED).json({ data: user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error: error});
    }
}

module.exports = { signup };