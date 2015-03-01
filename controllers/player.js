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

module.exports.toggleFavorite = function (req, res, next) {
	'use strict';

	User.findById(req.user._id, function (err, user) {
		if (err) {
			return next(err);
		}

		if (user) {
			User.findOne({ 'favorites.playerId': req.body.playerId }, function (err, favoriteUser) {
				if (favoriteUser) {
					user.favorites.pull({ 'favorites.playerId': req.body.playerId });
				} else {
					user.favorites.push({ playerId: mongoose.Types.ObjectId(req.body.playerId), associationDate: new Date() })
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
		}
	});

//	User.findByIdAndUpdate(
//		req.user._id,
//		{
//			$push: {'favorites': { playerId: req.body.favoriteId, associationDate: new Date() }}
//
//		},
//		function (err, user) {
//			if (err) {
//				return next(err);
//			}
//
//			return res.json(user);
//		}
//	);
};