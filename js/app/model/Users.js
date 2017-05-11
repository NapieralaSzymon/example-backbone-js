define(function(require) {

	var User = require("app/model/User");

	var Users = Backbone.Collection.extend({

		model: User,

		url: "https://jsonplaceholder.typicode.com/users"

	});

	return Users;

});
