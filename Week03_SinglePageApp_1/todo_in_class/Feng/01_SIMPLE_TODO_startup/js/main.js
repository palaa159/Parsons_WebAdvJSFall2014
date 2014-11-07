/* Your code starts here */
var app = app||{};

app.main = (function(){
	var items =[];

	var init = function(){
		console.log('here is');
		controller();

	};

	var controller = function() {
		$('#itemAddBtn').on('click', addNewItem);
		$('.itemDelete').on('click',deleteItem);
	};

	var deleteItem = function(){
		var parent = $(this).parent();
		console.log(parent);
		
		items.forEach(function(item, index) {
            // console.log(item);
            // console.log(item.view.itemToRender[0]);
            // console.log(parent[0]);
            if (item.view.itemToRender[0] == parent[0]) {
                console.log('I found you!', index);
            }
        });	
	};

	var addNewItem = function(){
		var message = $('#intemInput').val();
		console.log('adding new');

		new Model(message).create();
		controller();

	};

	var Model = function(title, like){
		this.title = title;
		this.like = like||false;

		this.create = function(){
			items.unshift({
			model:this

			});

			new View(this).create();
			this.render();

		};
		this.render = function(){
			items[0].view.render();
		};

		this.update = function(){

		};

		this.remove = function(){
			
		};

	};

	var View = function(model){
		this.model = model;
		this.create = function(){
			var itemContainer = $('<div></div>').addClass('item');
			var itemFav = $('<span>&#10084;</span>').addClass('itemFavorate');
			var itemTitle = $('<span></span>').addClass('itemTitle').html(this.model.title);
			var itemDelete = $('<span>&#10006;</span>').addClass('itemDelete');

			itemFav.appendTo(itemContainer);
			itemTitle.appendTo(itemContainer);
			itemDelete.appendTo(itemContainer);

				// $('#itemsContainer').append(itemContainer);
			// items[0].view = this;
			// this.render();
			this.itemToRender = itemContainer;
			items[0].view = this;


		};
		this.render = function(){
            $('#itemsContainer').prepend(this.itemToRender);
            controller();


		};
		this.update = function(){

		};
		this.remove = function(){

		};
	};

	return{
		init:init,
		items:items
	};

})();

$(document).on('ready',app.main.init);
