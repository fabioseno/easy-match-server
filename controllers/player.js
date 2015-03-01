/*global require, module*/
var User	 = require('../models/user'),
	mongoose = require('mongoose');

module.exports.list = function (req, res, next) {
	'use strict';

	User.find({ 'local.login': { '$ne': req.user.local.login }}, function (err, user) {
		if (err) {
			return next(err);
		}

		return res.json(user);
	});
};

module.exports.favorites = function (req, res, next) {
	'use strict';

	var favoriteIds = [], i;

	if (req.user.favorites && req.user.favorites.length > 0) {
		for (i = 0; i < req.user.favorites.length; i += 1) {
			favoriteIds.push(req.user.favorites[i].playerId);
		}
	}	

	User.find({ '_id': { '$in': favoriteIds }}, function (err, user) {
		if (err) {
			return next(err);
		}

		return res.json(user);
	});
};

module.exports.toggleFavorite = function (req, res, next) {
	'use strict';

	User.findById(req.user._id, function (err, user) {
		if (err) {
			return next(err);
		}

		var i, favorite, found = false;
		for (i = 0; i < user.favorites.length; i += 1) {
			favorite = user.favorites[i];

			if (String(favorite.playerId) === req.body.playerId) {
			
				user.favorites.splice(i, 1);
				found = true;
			}
		}

		if (!found) {
			user.favorites.push({ playerId: mongoose.Types.ObjectId(req.body.playerId), associationDate: new Date() });
		}

		user.save(function (err, user) {
			if (err) {
				return next(err);
			}

			if (user) {
				return res.json(user);
			}
		});
		
	});
};