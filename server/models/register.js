var User = require('../schemas/user');

exports.registration = function (data, cb) {
   
    var newUser = new User(data);

    newUser.save(function (err, res) {
        if (err) {
            console.log(err)
        }
        cb(err, res);
    })
} 