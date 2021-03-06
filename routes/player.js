/*global require, module*/
var playerController = require('../controllers/player');

module.exports = function (app) {
    'use strict';

    app.get('/player/list', playerController.list);
    app.get('/player/favorites', playerController.favorites);
    app.put('/player/favorite/toggle', playerController.toggleFavorite);
    
};