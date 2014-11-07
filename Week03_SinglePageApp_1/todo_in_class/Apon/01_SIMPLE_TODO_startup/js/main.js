/* Your code starts here */

var app = app || {};

app.main = (function() {

    var items = [];
    /*
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
    /*––––––––––– CONTROLLER THAT LISTENS TO USER ––––––––––*/
    var controller = function() {
        // always refresh listeners with .off()
        $('#itemAddBtn').off('click').on('click', addNewItem);
        $('.itemDelete').off('click').on('click', deleteItem);
    };

    var deleteItem = function() {
        var parent = $(this).parent();
        // console.log(parent);
        // for(var i = 0; i < items.length; i++) {
        // 	console.log(items[i]);
        // }

        items.forEach(function(item, index) {
            // console.log(item);
            // console.log(item.view.itemToRender[0]);
            // console.log(parent[0]);
            if (item.view.itemToRender[0] == parent[0]) {
                console.log('I found you!', index);
                // Performing a Model Remove method
                items[index].model.remove(index);
            }
        });
    };

    var addNewItem = function() {
        var message = $('#itemInput').val();
        // var message = document.getElementById('itemInput').value;
        console.log('adding new item: ' + message);
        // Create new model
        new Model(message).create();
    };
    /*––––––––––– MODEL CONSTRUCTOR ––––––––––*/
    var Model = function(title, like) {
        this.title = title;
        this.like = like || false;

        this.create = function() {
            items.unshift({
                model: this
            });
            // push goes last
            // unshift goes first (index) and pushes the rest back
            new View(this).create();
            this.render();
        };
        this.render = function() {
            items[0].view.render();
        };
        // skip read
        this.update = function() {

        };
        this.remove = function(index) {
            items[index].view.remove();
        };
    };
    /*––––––––––– VIEW CONSTRUCTOR ––––––––––*/
    var View = function(model) {
        this.model = model;
        this.create = function() {
            console.log('creating view');
            // create the representation of our data
            // <div class=>
            // creating div, spans elem as variables
            var itemContainer = $('<div></div>').addClass('item');
            // var itemContainer = document.createElement('div');
            var itemFav = $('<span>&#9825;</span>').addClass('itemFavorite');
            var itemTitle = $('<span></span>').addClass('itemTitle').html(this.model.title);
            var itemDelete = $('<span>&#10006;</span>').addClass('itemDelete');

            // appending each of them into <div class="item"></div>
            itemFav.appendTo(itemContainer);
            itemTitle.appendTo(itemContainer);
            itemDelete.appendTo(itemContainer);

            this.itemToRender = itemContainer;
            // appending itemContainer to <div id="itemsContainer"></div>

            items[0].view = this;
        };
        this.render = function() {
            $('#itemsContainer').prepend(this.itemToRender);
            // View providing a controller
            controller();
        };
        this.update = function() {

        };
        this.remove = function(index) {
            $(this.itemToRender).remove();
            items.splice(index, 1);
        };
        return this;
    };

    return {
        init: init,
        items: items
    };
})();

$(document).on('ready', app.main.init);