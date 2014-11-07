/* Your code starts here */

var app = app || {};

app.main = (function() {

	var items = [];

	/*
	EXAMPLE

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

	//CONTROLLER THAT LISTENS

	var controller = function(){

		//event listener
		//always refresh listeners with off
		//off('click') first turns off the original listener, and then on turns it on so it wont duplicate itself.
		$('#itemAddBtn').off('click').on('click', addNewItem);

		$('.itemDelete').off('click').on('click', deleteItem);

	};

	var deleteItem = function(){

		//"this" in this case is referring to .itemDelete because you had already chained onto it previously and attached it to deleteItem function

		var parent = $(this).parent();

		console.log(parent);

		//for(var i ; i < item.length ; i++){
			//console.log(items[1])
		

		items.forEach(function(item, index){
			//console.log(item);
			//console.log(index);

			if(item.view.itemToRender[0] == parent[0]){

				console.log('i found you', index);

				//performing a model remove method

				items[index].model.remove();
			}

		});
	};

	var addNewItem = function(){

		var message = $('#itemInput').val();

		//javascript
		//var message = document.getElementById('itemInput').value

		console.log('adding new item' + message);

		//create new model

		new Model(message).create();



	};
	//
	//
	//MODEL CONSTRUCTOR
	//
	//

	var Model = function(title, like){

		this.title = title;
		this.like = like || false;

		this.create = function(){

			//unshift pushes the item into the first index vs. push which puts it into the last index and pushes the rest back

			items.unshift({
				model: {

					title: this.title,
					like: this.like

				}
			});

			new View(this).create();


		};

		this.render = function(){
			//view providing the controller
			controller(); //so the event listener can continue to refresh itself


		};

		//skip read

		this.update = function(){


		};

		this.remove = function(){

			


		};


	};

	var View = function(model){

		this.model = model;



		this.create = function(){

			//creAte the representation of our data
			//a DOM element
			//<div class=''> and put it into our html from javascript

			var itemContainer = $('<div></div>').addClass('item');

			//var itemContainer = document.createElement('div');

				//appendTo is basically add this into that

				var itemFav = $('<span>&#9733;</span>').addClass('itemFavorite').appendTo(itemContainer);

				var itemTitle = $('<span></span>').addClass('itemTitle').appendTo(itemContainer).html(this.model.title);

				var itemDelete = $('<span>&#10006;</span>').addClass('itemDelete').appendTo(itemContainer);

				//could be item.Fav.appendTo('itemContainer');
				//OR
				//could be itemContainer.append(itemFav);

				//itemContainer.appendTo($('#itemsContainer'));

				this.itemToRender = itemContainer;

				//appending itemContainer to <div '#itemsContainer'></div>

				$('#itemsContainer').append(itemContainer);

				items[0].view = this;

				this.render();


		};

		this.render = function(){

			$('#itemsContainer').prepend(this.itemToRender);

			items[0].view = this;

		};

		this.update = function(){


		};

		this.remove = function(){


		};

	};

	return {

		// the property. can be named anything. could be initz  :  refers to the init function

		init: init,
		items: items
	};


})();

$(document).on('ready', app.main.init);