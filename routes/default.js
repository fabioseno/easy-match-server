/*global require, module*/
module.exports = function (app) {
    'use strict';

    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, SessionId');
        res.header('Access-Control-Expose-Headers', 'X-SessionID');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

        next();
    });
};