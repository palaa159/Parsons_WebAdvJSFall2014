/* Your code starts here */
/*
    1. structure app
    2. create events (controllers)
    3. create Model/View
    4. render view
*/


var app = app || {};

app.main = (function() {
    var items = [];
    var itemToAdd = {};

    var attachEvents = function() { // Controllers
        // we keep all the events here
        $('#itemAddBtn')
            .off('click') // it's good to have this
        .on('click', addNewItem);
        // listening for keypress
        $(document)
            .off('keypress')
            .on('keypress', function(e) {
                // autofocus
                $('#itemInput').focus();
                if (e.which == 13) { // enter
                    addNewItem();
                }
            });
        // listener for fav
        $('.itemFavorite')
            .off('click')
            .on('click', function() {
                var viewToFav = $(this).parent();
                items.forEach(function(v, i) {
                    if (v.view.item[0] === viewToFav[0]) {
                        items[i].model.update(i);
                    }
                });
            });
        // listener for delete
        $('.itemDelete')
            .off('click')
            .on('click', function() {
                var viewToDelete = $(this).parent();
                // compare
                // console.log(items[0].view.item[0]);
                // console.log(viewToDelete[0]);
                // find in items
                items.forEach(function(v, i) {
                    if (v.view.item[0] === viewToDelete[0]) {
                        // console.log(i);
                        // remove it
                        items[i].model.remove(i);
                    }
                });
            });
    };

    var addNewItem = function() {
        var title = $('#itemInput').val();
        // add new object
        if (title.length > 2) {
            new Model(title).add();
            // clear
            $('#itemInput').val('');
            // render
            render();
        } else {
            alert('3 characters up pls.');
        }
    };

    var render = function() {
        console.info('rendering');
        // clear
        $('#itemsContainer').empty();
        items.forEach(function(item, i) { // same things to for()
            // render view
            item.model.render(i);
        });
        attachEvents();
    };

    var Model = function(_title) {
        this.item = {
            title: _title,
            fav: false
        };
        this.add = function() {
            itemToAdd.model = this;
            // chain to view
            new View(this).add();
        };
        this.render = function(i) {
            items[i].view.render();
        };
        this.update = function(i) {
            this.item.fav = !this.item.fav;
            items[i].view.update();
        };
        this.remove = function(i) {
            items[i].view.remove();
            items.splice(i, 1);
        };
        return this;
    };

    var View = function(model) {
        this.item = null;

        this.add = function() {
            var item = $('<div></div>').addClass('item').hide(),
                itemFav = $('<span>&#10084;</span>').addClass('itemFavorite').appendTo(item),
                itemTitle = $('<span></span>').addClass('itemTitle').html(model.item.title).appendTo(item),
                itemDelete = $('<span>&times;</span>').addClass('itemDelete').appendTo(item);
            this.item = item;
            itemToAdd.view = this;
            // unshift
            items.unshift(itemToAdd);
            // clear
            itemToAdd = {};
        };
        this.update = function() {
            // toggle class
            this.item.children('.itemFavorite').toggleClass('fav');
        };
        this.render = function() {
            // render to itemsContainer
            $('#itemsContainer').append(this.item);
            this.item.fadeIn();
        };
        this.remove = function() {
            this.item.fadeOut();
        };
        return this;
    };

    var init = function() {
        console.info('app init');
        // init existing items in case we have them
        // finally add events
        render();
    };

    return {
        init: init,
        items: items
    };
})();

$(window).on('load', app.main.init);