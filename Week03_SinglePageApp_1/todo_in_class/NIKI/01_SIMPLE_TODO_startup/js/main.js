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

    var controller = function() {
        $('#itemAddBtn').on('click', addNewItem);
    };

    var addNewItem = function() {
        var message = $('#itemInput').val();
        // var message = document.getElementById('itemInput').value;
        console.log('adding new item: ' + message);
        // Create new model
        new Model(message).create();
    };

    var Model = function(title, like) {
        this.title = title;
        this.like = like || false;

        this.create = function() {
            items.unshift({
                model: {
                    title: this.title,
                    like: this.like
                }
            });
            // push goes last
            // unshift goes first (index) and pushes the rest back
            new View(this).create();
        };
        this.render = function() {

        };
        // skip read
        this.update = function() {

        };
        this.remove = function() {

        };
    };

    var View = function(model) {
        this.model = model;

        this.create = function() {
        	console.log('creating view');
            // create the representation of our data
            // <div class=>
            var itemContainer = $('<div></div>').addClass('item');
            // var itemContainer = document.createElement('div');
            var itemFav = $('<span>&#9825;</span>').addClass('itemFavorite');
            var itemTitle = $('<span></span>').addClass('itemTitle').html(this.model.title);
            var itemDelete = $('<span>&#10006;</span>').addClass('itemDelete');

            itemFav.appendTo(itemContainer);
            itemTitle.appendTo(itemContainer);
            itemDelete.appendTo(itemContainer);

            // itemContainer.appendTo('$')
            $('#itemsContainer').append(itemContainer);
        };
        this.render = function() {

        };
        this.update = function() {

        };
        this.remove = function() {

        };
    };

    return {
        init: init,
        items: items
    };
})();

$(document).on('ready', app.main.init);