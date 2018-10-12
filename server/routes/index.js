var express = require('express');
var registerController = require('../controllers/register');
var loginController = require('../controllers/login');
var router = express.Router();

router.post('/registration', registerController.registration);
router.post('/login', loginController.login);

router.get('/message', function(req, res, next) {
  res.json('Welcome To React');
});


module.exports = router;
