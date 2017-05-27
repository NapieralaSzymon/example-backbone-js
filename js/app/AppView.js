define(function(require) {

	var AppRouter = require("app/AppRouter");
	var User = require("app/model/User");
	var Users = require("app/model/Users");
	var UsersView = require("app/view/UsersView");
	var UserFormView = require("app/view/form/UserFormView");

	var AppView = Backbone.View.extend({

		router: null,

		initialize: function() {
			this.router = new AppRouter({
				appView: this
			});
			Backbone.history.start();
		},

		render: function() {
			var context = this;
			while (this.el.firstChild) {
				this.el.removeChild(this.el.firstChild);
			}
			var h1 = document.createElement("h1");
			h1.appendChild(document.createTextNode("Widok: " + this.router.viewName));
			this.el.appendChild(h1);
			var usersView = new UsersView({
				collection: new Users()
			});
			var userFormView = new UserFormView({
				model: new User()
			});
			usersView.on("change", function(user) {
				userFormView.model = user;
				userFormView.render();
				context.router.handleView("form");
			});
			userFormView.on("saved", function() {
				userFormView.model = new User();
				userFormView.render();
				usersView.load();
				context.router.handleDefault();
			});
			userFormView.on("deleted", function() {
				usersView.load();
			});
			if (this.router.viewName === "list") {
				this.el.appendChild(usersView.render());
				var a = document.createElement("a");
				a.appendChild(document.createTextNode("Dodaj"));
				a.href = "#form";
				this.el.appendChild(a);
			}
			if (this.router.viewName === "form") {
				this.el.appendChild(userFormView.render());
			}
			return this.el;
		}

	});

	return AppView;

});
