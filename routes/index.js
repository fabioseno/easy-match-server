/*global require, module*/
module.exports = function (app, passport) {
    'use strict';

    require('./default')(app);
    require('./auth')(app, passport);
};