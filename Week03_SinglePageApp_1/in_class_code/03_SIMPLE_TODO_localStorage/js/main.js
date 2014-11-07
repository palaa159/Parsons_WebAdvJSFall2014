/* Your code starts here */
/*

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
                    addNewItem(); // goto line 65
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
        // edit todo
        $('.item')
            .off('dblclick')
            .on('dblclick', function() {

                $(this).append('hey');
            });
    };

    var addNewItem = function() {
        var title = $('#itemInput').val();
        // add new object
        if (title.length > 2) {
            new Model(title, false).add();
            // clear
            $('#itemInput').val('');
            // render
            render();
            attachEvents();
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
    };

    var Model = function(_title, _fav) {
        this.item = {
            title: _title,
            fav: _fav
        };
        this.add = function() {
            itemToAdd.model = this;
            // chain to view
            new View(this).add();
            storage.save();
        };
        this.render = function(i) {
            items[i].view.render();
            storage.save();
        };
        this.update = function(i) {
            this.item.fav = !this.item.fav;
            items[i].view.update();
            storage.save();
        };
        this.remove = function(i) {
            items[i].view.remove();
            items.splice(i, 1);
            storage.save();
        };
        return this;
    };

    var View = function(model) {
        this.item = null;

        this.add = function() {
            var item = $('<div></div>').addClass('item').hide();
            var itemFav;
            if (model.item.fav) {
                itemFav = $('<span>&#10084;</span>').addClass('itemFavorite fav').appendTo(item);
            } else {
                itemFav = $('<span>&#10084;</span>').addClass('itemFavorite').appendTo(item);
            }
            var itemTitle = $('<span></span>').addClass('itemTitle').html(model.item.title).appendTo(item);
            var itemDelete = $('<span>&times;</span>').addClass('itemDelete').appendTo(item);

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

    var storage = {
        load: function() {
            // assume that user doesn't use IE8-
            if (localStorage.length === 0) {
                var blank = JSON.stringify([]);
                localStorage.setItem('app', blank);
            } else {
                // if already exist
                var lsItems = JSON.parse(localStorage.getItem('app'));
                /*
                    items = [
                        {
                            title: 'blah blah',
                            fav: false
                        }
                    ]
                */
                lsItems.forEach(function(v) {
                    new Model(v.title, v.fav).add();
                });
            }
            // new Model(title, fav);
        },
        save: function() {
            var itemsToSave = [];
            items.forEach(function(v) {
                itemsToSave.unshift({
                    title: v.model.item.title,
                    fav: v.model.item.fav
                });
            });
            localStorage.setItem('app', JSON.stringify(itemsToSave));
        }
    };

    var init = function() {
        console.info('app init');
        // init existing items in case we have them
        // finally add events
        storage.load();
        render();
        attachEvents();
    };

    return {
        init: init,
        items: items
    };
})();

$(window).on('load', app.main.init);