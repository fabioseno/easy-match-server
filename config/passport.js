/*global require, module, process*/
var LocalStrategy    = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
//var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
//var TwitterStrategy  = require('passport-twitter').Strategy;
//
// load up the user model
var User       = require('../models/user');

// load the auth variables
//var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {
    'use strict';

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function (req, login, password, done) {

        // asynchronous
        process.nextTick(function () {
            User.findOneAndUpdate({ 'local.login':  login, 'local.password': password }, { lastLogin: new Date() }, function (err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                    return done(null, false, 'User not found.');
                } else {
                    return done(null, user);
                }

            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function (req, login, password, done) {
        // asynchronous
        process.nextTick(function () {
            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local.login': login}, { 'local.password': 0 }, function (err, existingUser) {
                var user;

                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // check to see if there's already a user with that email
                if (existingUser) {
                    return done(null, false, 'The login is already in use.');
                }

                //  If we're logged in, we're connecting a new local account.
                if (req.user) {
                    user                = req.user;
                    user.local.email    = req.user.email;
                    user.local.login    = login;
                    user.local.password = password;
                    user.lastLogin      = new Date();

                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, user);
                    });
                } else { //  We're not logged in, so we're creating a brand new user.
                    // create the user
                    user                = new User();
                    user.local.login    = login;
                    user.local.password = password;
                    user.local.email    = req.body.email;
                    user.lastLogin      = new Date();
                    user.creationDate   = new Date();

                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, user);
                    });
                }

            });
        });

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    //    passport.use(new FacebookStrategy({
    //
    //        clientID        : configAuth.facebookAuth.clientID,
    //        clientSecret    : configAuth.facebookAuth.clientSecret,
    //        callbackURL     : configAuth.facebookAuth.callbackURL,
    //        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    //
    //    }, function (req, token, refreshToken, profile, done) {
    //
    //        // asynchronous
    //        process.nextTick(function () {
    //
    //            // check if the user is already logged in
    //            if (!req.user) {
    //
    //                User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
    //                    if (err) {
    //                        return done(err);
    //                    }
    //
    //                    if (user) {
    //
    //                        // if there is a user id already but no token (user was linked at one point and then removed)
    //                        if (!user.facebook.token) {
    //                            user.facebook.token = token;
    //                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    //                            user.facebook.email = profile.emails[0].value;
    //
    //                            user.save(function (err) {
    //                                if (err) {
    //                                    throw err;
    //                                }
    //
    //                                return done(null, user);
    //                            });
    //                        }
    //
    //                        return done(null, user); // user found, return that user
    //                    } else {
    //                        // if there is no user, create them
    //                        var newUser            = new User();
    //
    //                        newUser.facebook.id    = profile.id;
    //                        newUser.facebook.token = token;
    //                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    //                        newUser.facebook.email = profile.emails[0].value;
    //
    //                        newUser.save(function (err) {
    //                            if (err) {
    //                                throw err;
    //                            }
    //
    //                            return done(null, newUser);
    //                        });
    //                    }
    //                });
    //
    //            } else {
    //                // user already exists and is logged in, we have to link accounts
    //                var user            = req.user; // pull the user out of the session
    //
    //                user.facebook.id    = profile.id;
    //                user.facebook.token = token;
    //                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    //                user.facebook.email = profile.emails[0].value;
    //
    //                user.save(function (err) {
    //                    if (err) {
    //                        throw err;
    //                    }
    //
    //                    return done(null, user);
    //                });
    //
    //            }
    //        });
    //
    //    }));

    //    // =========================================================================
    //    // TWITTER =================================================================
    //    // =========================================================================
    //    passport.use(new TwitterStrategy({
    //
    //        consumerKey     : configAuth.twitterAuth.consumerKey,
    //        consumerSecret  : configAuth.twitterAuth.consumerSecret,
    //        callbackURL     : configAuth.twitterAuth.callbackURL,
    //        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    //
    //    }, function (req, token, tokenSecret, profile, done) {
    //
    //        // asynchronous
    //        process.nextTick(function () {
    //
    //            // check if the user is already logged in
    //            if (!req.user) {
    //
    //                User.findOne({ 'twitter.id' : profile.id }, function (err, user) {
    //                    if (err) {
    //                        return done(err);
    //                    }
    //
    //                    if (user) {
    //                        // if there is a user id already but no token (user was linked at one point and then removed)
    //                        if (!user.twitter.token) {
    //                            user.twitter.token       = token;
    //                            user.twitter.username    = profile.username;
    //                            user.twitter.displayName = profile.displayName;
    //
    //                            user.save(function (err) {
    //                                if (err) {
    //                                    throw err;
    //                                }
    //
    //                                return done(null, user);
    //                            });
    //                        }
    //
    //                        return done(null, user); // user found, return that user
    //                    } else {
    //                        // if there is no user, create them
    //                        var newUser                 = new User();
    //
    //                        newUser.twitter.id          = profile.id;
    //                        newUser.twitter.token       = token;
    //                        newUser.twitter.username    = profile.username;
    //                        newUser.twitter.displayName = profile.displayName;
    //
    //                        newUser.save(function (err) {
    //                            if (err) {
    //                                throw err;
    //                            }
    //
    //                            return done(null, newUser);
    //                        });
    //                    }
    //                });
    //
    //            } else {
    //                // user already exists and is logged in, we have to link accounts
    //                var user                 = req.user; // pull the user out of the session
    //
    //                user.twitter.id          = profile.id;
    //                user.twitter.token       = token;
    //                user.twitter.username    = profile.username;
    //                user.twitter.displayName = profile.displayName;
    //
    //                user.save(function (err) {
    //                    if (err) {
    //                        throw err;
    //                    }
    //
    //                    return done(null, user);
    //                });
    //            }
    //
    //        });
    //
    //    }));
    //
    //    // =========================================================================
    //    // GOOGLE ==================================================================
    //    // =========================================================================
    //    passport.use(new GoogleStrategy({
    //
    //        clientID        : configAuth.googleAuth.clientID,
    //        clientSecret    : configAuth.googleAuth.clientSecret,
    //        callbackURL     : configAuth.googleAuth.callbackURL,
    //        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    //
    //    }, function (req, token, refreshToken, profile, done) {
    //
    //        // asynchronous
    //        process.nextTick(function () {
    //
    //            // check if the user is already logged in
    //            if (!req.user) {
    //
    //                User.findOne({ 'google.id' : profile.id }, function (err, user) {
    //                    if (err) {
    //                        return done(err);
    //                    }
    //
    //                    if (user) {
    //
    //                        // if there is a user id already but no token (user was linked at one point and then removed)
    //                        if (!user.google.token) {
    //                            user.google.token = token;
    //                            user.google.name  = profile.displayName;
    //                            user.google.email = profile.emails[0].value; // pull the first email
    //
    //                            user.save(function (err) {
    //                                if (err) {
    //                                    throw err;
    //                                }
    //
    //                                return done(null, user);
    //                            });
    //                        }
    //
    //                        return done(null, user);
    //                    } else {
    //                        var newUser          = new User();
    //
    //                        newUser.google.id    = profile.id;
    //                        newUser.google.token = token;
    //                        newUser.google.name  = profile.displayName;
    //                        newUser.google.email = profile.emails[0].value; // pull the first email
    //
    //                        newUser.save(function (err) {
    //                            if (err) {
    //                                throw err;
    //                            }
    //
    //                            return done(null, newUser);
    //                        });
    //                    }
    //                });
    //
    //            } else {
    //                // user already exists and is logged in, we have to link accounts
    //                var user               = req.user; // pull the user out of the session
    //
    //                user.google.id    = profile.id;
    //                user.google.token = token;
    //                user.google.name  = profile.displayName;
    //                user.google.email = profile.emails[0].value; // pull the first email
    //
    //                user.save(function (err) {
    //                    if (err) {
    //                        throw err;
    //                    }
    //
    //                    return done(null, user);
    //                });
    //
    //            }
    //
    //        });
    //
    //    }));

};