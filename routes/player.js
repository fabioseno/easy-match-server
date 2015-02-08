/*global require, module*/
var playerController = require('../controllers/player');

module.exports = function (app) {
    'use strict';

    app.get('/player/list', playerController.list);
    
};