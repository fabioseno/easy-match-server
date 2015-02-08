/*global require, module*/
var User            = require('../models/user');
    
module.exports.list = function (req, res, next) {
    'use strict';
    
    User.find({ }, function (err, result) {
        if (err) {
            return next(err);
        }

        return res.json(result);
    });
};