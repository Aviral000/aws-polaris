const { addTask } = require('../services/task.service');
const { StatusCodes } = require('http-status-codes');

const taskMaker = async (req, res) => {
    try {
        const task = await addTask(req.body, req.user._id);
        res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
}

module.exports = { taskMaker };