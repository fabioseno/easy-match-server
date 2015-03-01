/*global require, module*/
var express = require('express')
var router 	= express.Router();
var invitationsController = require('../controllers/invitation');

module.exports = function (app) {
    'use strict';

	router.route('/')
		.get(invitationsController.list)
		.post(invitationsController.create)
		.put(invitationsController.update);

	router.route('/:id')
		.get(invitationsController.show)
		.post(invitationsController.update)
		.delete(invitationsController.destroy);

	app.use('/invitations', router);
};
