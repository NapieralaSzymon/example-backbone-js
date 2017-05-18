define(function(require) {

	var User = require("app/model/User");
	var Users = require("app/model/Users");
	var UsersView = require("app/view/UsersView");
	var UserFormView = require("app/view/form/UserFormView");

	var AppView = Backbone.View.extend({

		render: function() {
			while (this.el.firstChild) {
				this.el.removeChild(this.el.firstChild);
			}
			var usersView = new UsersView({
				collection: new Users()
			});
			var userFormView = new UserFormView({
				model: new User()
			});
			usersView.on("change", function(user) {
				userFormView.model = user;
				userFormView.render();
			});
			userFormView.on("saved", function() {
				userFormView.model = new User();
				userFormView.render();
				usersView.load();
			});
			userFormView.on("deleted", function() {
				usersView.load();
			});
			this.el.appendChild(usersView.render());
			this.el.appendChild(userFormView.render());
			return this.el;
		}

	});

	return AppView;

});
