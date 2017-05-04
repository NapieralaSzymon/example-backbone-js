define(function(require) {

	var AppView = require("app/AppView");

	var appView = new AppView();
	$(function() {
		document.body.appendChild(appView.render());
	});

});
