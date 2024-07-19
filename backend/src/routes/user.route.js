const router = require('express').Router();
const { signup } = require('../controller/user.controller');
const { userSignupValidBody } = require('../validations/user.validation');

router.post("/signup", userSignupValidBody, signup);

module.exports = router;