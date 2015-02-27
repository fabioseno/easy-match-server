var Invitation = require('../models/invitation');
var mongoose = require('mongoose');

module.exports.list = function (req, res, next) {
	'use strict';
	res.send('Listing the invitations');
};

module.exports.show = function (req, res, next) {
	'use strict';
	res.send('Showing the details of invitation %d', req.params.id);
};

module.exports.create = function (req, res, next) {
	'use strict';
	res.send('Creating an invitation');
};

module.exports.update = function (req, res, next) {
	'use strict';
	res.send('Updating the invitation %d data', req.params.id);
};

module.exports.destroy = function (req, res, next) {
	'use strict';
	res.send('Deleting the invitation %d', req.params.id);
};
