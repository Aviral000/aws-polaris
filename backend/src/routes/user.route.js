const router = require('express').Router();
const passport = require('passport');
const { signup, login } = require('../controller/user.controller');
const { userSignupValidBody, userLoginValidBody } = require('../validations/user.validation');

const authenticate = passport.authenticate('jwt', { session: false });

router.post("/signup", userSignupValidBody, signup);
router.post("/login", userLoginValidBody, login);

module.exports = router;