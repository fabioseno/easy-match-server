/*global require, module*/
var authController = require('../controllers/auth');

module.exports = function (app, passport) {
    'use strict';

    // local strategy
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', {session: true}, function (err, user, info) {
            
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(500).json(info);
            }

            req.login(user, {}, function (err) {
                if (err) {
                    return next(err);
                }

                res.send(req.user.toJSON());
            });
        })(req, res, next);
    });
    
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', {session: true}, function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(500).json(info);
            }

            req.login(user, {}, function (err) {
                if (err) {
                    return next(err);
                }

                res.send(req.user.toJSON());
            });
        })(req, res, next);
    });
    
    app.get('/logout', authController.logout);

    // facebook strategy
//    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
//    app.get('/auth/facebook/callback', passport.authenticate('facebook'), authController.login);

};