/*global module*/

//function controller() {
//    'use strict';

    //    function login(req, res, next) {
    //        passport.authenticate('local-login', function (err, user, info) {
    //            if (err) {
    //                return next(err);
    //            }
    //
    //            if (!user) {
    //                return res.status(500).send('Invalid user');
    //            }
    //
    //            req.logIn(user, function (err) {
    //                if (err) {
    //                    return next(err);
    //                }
    //
    //                res.json(req.user);
    //            });
    //        })(req, res, next);
    //    }
    //
    //    function signup(req, res, next) {
    //        passport.authenticate('local-signup', function (err, user, info) {
    //            if (err) {
    //                return next(err);
    //            }
    //
    //            if (!user) {
    //                return res.status(500).send('Invalid user');
    //            }
    //
    //            req.logIn(user, function (err) {
    //                if (err) {
    //                    return next(err);
    //                }
    //
    //                res.json(req.user);
    //            });
    //        })(req, res, next);
    //    }   
//}

module.exports.logout = function (req, res) {
    'use strict';
    
    req.logout();
    res.end();
};