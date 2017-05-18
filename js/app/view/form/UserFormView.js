define(function(require) {

	var UserFormView = Backbone.View.extend({

		tagName: "form",

		render: function() {
			while (this.el.firstChild) {
				this.el.removeChild(this.el.firstChild);
			}
			var context = this;
			var input = document.createElement("input");
			input.name = "name";
			if (this.model.has("name")) {
				input.value = this.model.get("name");
			}
			this.el.appendChild(input);
			var button = document.createElement("button");
			button.type = "button";
			button.appendChild(document.createTextNode("Zapisz"));
			button.addEventListener("click", function() {
				context.model.set("name", document.getElementsByName("name")[0].value);
				context.model.save(null, {
					success: function(model, response, options) {
						context.trigger("saved", model);
					}
				});
			}, false);
			this.el.appendChild(button);
			return this.el;
		}

	});

	return UserFormView;

});
