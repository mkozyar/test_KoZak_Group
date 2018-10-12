var Login = require('../models/login');
//var session = require('express-session');
//var jwt = require('jwt-simple');

exports.login = function (req, res) {
    Login.login(req.body, function (err, user) {
        if (err) {
            return res.sendStatus(505);
        }
        if (user) {
           
            //var token = jwt.encode(user, 'secretkey')
            var form = {
                //token: token,
                user: user.login,
            }
            return res.send(form);
 
        } else
            return res.sendStatus(404);
    })
} 


