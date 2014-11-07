/* Your code starts here */
var app = app || (function(){
	var init = function(){
		console.log('app init');
	};
	return {

		init: init
	};
}) ();

$(document).on('ready', app.main.init);