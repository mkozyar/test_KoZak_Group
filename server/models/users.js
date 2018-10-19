var db = require('../db');

exports.getAllUsers = function (data, cb) {
    let sortBy = data.body.sortBy
    let sortDir = data.body.sortDir
    let filters = data.body.filters
    function filtersExp(arr){
        let resArr = [{}]
        Object.keys(arr).forEach(element => {
            if(element==="male"){
                resArr.push({[element]: { $regex:  filters[element]|| ''}})
            }
            resArr.push({[element]: { $regex:  filters[element]|| '', '$options': 'i' }})
        });
        return resArr
    }
    db.get().collection('users').find({$and:filtersExp(filters)}).sort({[sortBy]: sortDir}).toArray( function (err, users) {
        if (err) {
            return cb(err)
        }
        let data = users.map(e=>{delete e.password })
cb(err, users)
    })

} 
exports.updateUser = function (data, cb) {
    db.get().collection('users').updateOne({login: data.user.login},{$set:{
        fName: data.user.fName,
        lName: data.user.lName,
        male: data.user.male,
        salary: data.user.salary,
        salary: data.user.salary,
        position: data.user.position,
        position: data.user.position,
        phoneNumber: data.user.phoneNumber,
        phoneNumber: data.user.phoneNumber,
        dateAdded: data.user.dateAdded
    }}, function(err, doc) {
        if (err) {
            return cb(err)
        }
        cb(err, doc)
    })

} 
exports.deleteUser = function (data, cb) {
    db.get().collection('users').findOneAndDelete({login: data.body.login}, function(err, doc) {
        if (err) {
            return cb(err)
        }
        cb(err, doc)
    })

} 

