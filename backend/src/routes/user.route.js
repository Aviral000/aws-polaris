const router = require('express').Router();
const passport = require('passport');
const { signup, login } = require('../controller/user.controller');
const { userSignupValidBody, userLoginValidBody } = require('../validations/user.validation');

const authenticate = passport.authenticate('jwt', { session: false });

router.post("/signup", userSignupValidBody, signup);
router.post("/login", userLoginValidBody, login);

router.get("/get", authenticate, (req, res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
});

module.exports = router;