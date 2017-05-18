define(function(require) {

	var UsersView = Backbone.View.extend({

		tagName: "ul",

		loading: false,

		initialize: function() {
			this.load();
		},

		render: function() {
			while (this.el.firstChild) {
				this.el.removeChild(this.el.firstChild);
			}
			if (this.loading) {
				this.el.appendChild(this.renderLoadingItem());
			} else {
				for (var i = 0; i < this.collection.length; ++i) {
					this.el.appendChild(this.renderUserItem(this.collection.at(i)));
				}
			}
			return this.el;
		},

		renderLoadingItem: function() {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode("Ładowanie..."));
			return li;
		},

		renderUserItem: function(user) {
			var context = this;
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(user.get("name")));
			var buttonEdit = document.createElement("button");
			buttonEdit.type = "button";
			buttonEdit.appendChild(document.createTextNode("Zmień"));
			buttonEdit.addEventListener("click", function() {
				user.fetch({
					success: function(model, response, options) {
						context.trigger("change", model);
					}
				});
			}, false);
			li.appendChild(buttonEdit);
			var buttonDelete = document.createElement("button");
			buttonDelete.type = "button";
			buttonDelete.appendChild(document.createTextNode("Usuń"));
			buttonDelete.addEventListener("click", function() {
				user.destroy({
					success: function(model, response, options) {
						context.trigger("deleted", model);
					}
				});
			}, false);
			li.appendChild(buttonDelete);
			return li;
		},

		load: function() {
			var context = this;
			this.loading = true;
			this.collection.fetch({
				success: function(model, response, options) {
					context.loading = false;
					context.render();
				}
			});
		}

	});

	return UsersView;

});
