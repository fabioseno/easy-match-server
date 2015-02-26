/*global require, module*/
module.exports = function (app) {
	'use strict';

	app.all('*', function (req, res, next) {
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
		
		if ('OPTIONS' === req.method) {
			res.status(200).send();
		} else {
			next();
		}
	});

	app.get('/home', function (req, res, next) {
		return res.send('ok');
	});

};