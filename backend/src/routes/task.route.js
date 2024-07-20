const router = require('express').Router();
const passport = require('passport');
const { taskMaker } = require('../controller/task.controller');

const authenticate = passport.authenticate('jwt', { session: false });

router.post('/add', authenticate, taskMaker);

module.exports = router