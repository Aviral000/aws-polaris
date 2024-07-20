const router = require('express').Router();
const passport = require('passport');
const { findAllTask, findTaskByStatus, taskMaker, taskUpdator, taskDeletion } = require('../controller/task.controller');

const { taskAddValidBody } = require("../validations/task.validation");

const authenticate = passport.authenticate('jwt', { session: false });

router.get('/view', authenticate, findAllTask);
router.get('/view/status', authenticate, findTaskByStatus);
router.post('/add', authenticate, taskAddValidBody, taskMaker);
router.put('/update/:id', authenticate, taskAddValidBody, taskUpdator);
router.delete('/delete/:id', authenticate, taskDeletion);

module.exports = router