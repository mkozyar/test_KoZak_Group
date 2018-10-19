var express = require('express');
var registerController = require('../controllers/register');
var loginController = require('../controllers/login');
var usersController = require('../controllers/users');
var router = express.Router();

router.delete('/table/delete', usersController.deleteUser)
router.put('/table', usersController.updateUser)
router.post('/table', usersController.getAllUsers)

router.post('/registration', registerController.registration);
router.post('/login', loginController.login);




module.exports = router;
