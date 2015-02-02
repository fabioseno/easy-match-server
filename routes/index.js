/*global require, module*/
module.exports = function (app, passport) {
    'use strict';

    require('../routes/default')(app);
    require('../routes/auth')(app, passport);
};