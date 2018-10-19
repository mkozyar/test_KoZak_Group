var Users = require('../models/users');



exports.getAllUsers = function (req, res) {
    Users.getAllUsers(req, function (err, doc) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(doc);
    })
  }

  exports.updateUser = function (req, res) {
    Users.updateUser(req.body, function (err) {
        if (err) {
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
} 

  exports.deleteUser = function (req, res) {
    Users.deleteUser(req, function (err) {
        if (err) {
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    })
  }