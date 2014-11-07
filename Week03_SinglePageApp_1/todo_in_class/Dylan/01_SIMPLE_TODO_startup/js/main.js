/* Your code starts here */
var app = app || {};

app.main = (function() {

	var items = [];
	/* contains all of our items, like such:
		items = [
			{
				model: blah blah,
				view: blah blah
			},
			{
				model: foo,
				view: bar
			}
		]


	*/

	var init = function() {
		console.log('app init');
		controller();
	};

	var controller = function() {
		$('#itemAddBtn').on('click', addNewItem);
	};

	var addNewItem = function() {
		var message = $('#itemInput').val();
		// var message = document.getElementById('itemInput').value;
		console.log('adding new item ' + message);
		new Model(message).create();
	};

	var Model = function(title, like) {
		this.title = title;
		this.like = like || false;

		this.create = function() {
			items.unshift({ // adds an item into the first slot of an index
				model: {
					title: this.title,
					like: this.like
				}
			});
		};
		// skip read
		this.update = function() {

		};
		this.remove = function() {

		};

	}

	return {
		init: init,
		item: items
	}
})();

$(document).on('ready', app.main.init);