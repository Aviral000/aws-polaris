const { required } = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    taskNumber: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;