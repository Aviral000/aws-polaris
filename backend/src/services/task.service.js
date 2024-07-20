const Task = require('../models/task.model');

const addTask = async (data, id) => {
    try {
        const task = await Task.create({ ...data, userId: id });
        return task;
    } catch (error) {
        throw new Error("Task creation failed")
    }
}

module.exports = { addTask };