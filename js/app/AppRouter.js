define(function(require) {

	var AppRouter = Backbone.Router.extend({

		routes: {
			"": "handleDefault",
			":viewName": "handleView"
    	},

		appView: null,
		viewName: "list",

		initialize: function(options) {
			if (typeof options.appView !== "undefined") {
				this.appView = options.appView;
			}
		},

		handleDefault: function() {
			this.handleView("list");
		},

		handleView: function(viewName) {
			this.viewName = viewName;
			if (this.appView !== null) {
				this.appView.render();
			}
		}

	});

	return AppRouter;

});
