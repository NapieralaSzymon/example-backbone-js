define(function(require) {

	var User = Backbone.Model.extend({

		urlRoot: "https://jsonplaceholder.typicode.com/users"

	});

	return User;

});
