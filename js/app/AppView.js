define(function(require) {

	var AppView = Backbone.View.extend({

		render: function() {
			this.el.appendChild(document.createTextNode("TODO"));
			return this.el;
		}

	});

	return AppView;

});
