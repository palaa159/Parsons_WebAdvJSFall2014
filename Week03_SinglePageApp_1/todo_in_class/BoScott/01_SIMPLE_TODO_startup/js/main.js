/* Your code starts here */

var app = app || {};

app.main = (function() {
	var items = [];
			/*
			items = [
			{
				model: blah
				view: bla
			},
			{
				model:
				view:
			}]
			
		*/
	var init = function() {

		console.log('app init');
		controller();
	};
	var controller = function() {
		//.off() functions the same as .empty
		$('#itemAddBtn').off('click').on('click', addNewItem);
		$('.itemDelete').off('click').on('click', deleteItem);
	};

	var deleteItem = function() {
		//has a unique id for that object
		var parent = $(this).parent();

		// for(var i = 0; i < items.length; i++) {
		// 	console.log(items[i]);
		// }
		items.forEach(function(item, index) {
			// console.log(item);
			// console.log(index);
			if (items.view.itemToRender[0] == parent[0]) {
				items[index].model.remove(index);
			}
			//dont have to put ; after if(){}
		});
	};

	var addNewItem = function() {
		var message = $('#itemInput').val();
		console.log('add new item: ' + message);
		//Create new model
		new model(message).create();
		//refreh the controller for the event listener
		// controller();
	};

	var model = function(title, like) {
		this.title = title;
		this.like = like || false;

		this.create = function() {
			//push gives item to end (index) of array, unshift puts at beginning
			items.unshift({
				model: this
				// {
				// 	title: this.title,
				// 	like: this.like
				// }
			});
			new View(this).create();
			this.render();
		};
		//replace read with render
		this.render = function() {
			items[0].view.render();
		};
		//skip read (CRUD: create, read, update, delete)
		this.update = function() {

		};
		this.remove = function(index) {
			$(this.itemToRender).remove();
			items.splice(index, 1);
		};
	};

	var View = function(model) {
		this.model = model;

		this.create = function() {
			//create the representation of our data
			// <div></div>
			var itemContainer = $('<div></div>').addClass('item');
			var itemFav = $('<span>&#10084;</span>').addClass('itemFavorite').appendTo(itemContainer);
			var itemTitle = $('<span></span>').addClass('itemTitle').appendTo(itemContainer).html(this.model.title);
			var itemDelete = $('<span>&times;</span>').addClass('itemDelete').appendTo(itemContainer);
			//itemContainer.apped(itemFav);
			// $('#itemsContainer').append(itemContainer);
			// itemContainer.appendTo($('#itemsContainer'));
		
			this.itemToRender = itemContainer;

			items[0].view = this;
// this is making it more confusing than it needs to be ...~_~;;;;;;;lets play D3 :) anytime, but u will have to come over -.- game nightssss :)))))
		};

		this.render = function(item) {
			//prepend puts it b4
			$('#itemsContainer').prepend(this.itemToRender);
			//view provides the controller
			controller();
		};

		this.update = function() {

		};

		this.remove = function() {

		};
		return this;
	};


	return {
		init: init,
		items: items
	};
})();

$(document).on('ready', app.main.init);