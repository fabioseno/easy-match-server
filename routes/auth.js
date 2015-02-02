/*global require, module*/

var authController = require('../controllers/auth');

module.exports = function (app, passport) {
    'use strict';
    
    // local strategy
    app.post('/login', passport.authenticate('local-login'), authController.login);
    app.post('/signup', authController.signup);
    app.get('/logout', authController.logout);

    // facebook strategy
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'), authController.login);

};