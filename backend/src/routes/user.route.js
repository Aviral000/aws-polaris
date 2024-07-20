const router = require('express').Router();
const { signup, login } = require('../controller/user.controller');
const { userSignupValidBody, userLoginValidBody } = require('../validations/user.validation');

router.post("/signup", userSignupValidBody, signup);
router.post("/login", userLoginValidBody, login);

module.exports = router;