'use strict';

module.exports = function(app) {
	var userController = require('../controllers/userController');
	// todoList Routes
	app.route('/auth/register')
		.post(userController.register);
	app.route('/auth/sign_in')
	.post(userController.sign_in);
};
