const Joi = require('joi');
const { StatusCodes } = require('http-status-codes')

const taskAddBody = Joi.object({
    title: Joi.string(),
    description: Joi.string()
})

const taskAddValidBody = (req, res, next) => {
    const { error } = taskAddBody.validate(req.body);

    if(error) {
        res.status(StatusCodes.BAD_GATEWAY).json(error.details[0].message);
    }

    next();
}

module.exports = { taskAddValidBody }