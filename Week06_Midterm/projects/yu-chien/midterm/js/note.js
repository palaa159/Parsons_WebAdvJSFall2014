var app = app || {};

app.todo = (function() {
    var items = [];
    var itemToAdd = {};

    var storage = {
        load: function() {
            var jsonData = JSON.parse(localStorage.getItem('todo'));
            console.log(jsonData);
            if (jsonData === null) {
                localStorage.setItem('todo', '[]');
            } else {
                jsonData.forEach(function(item, index) {
                    new Model(item.title, item.fav).add();
                });
            }
        },
        save: function() {
            var itemToSave = [];
            items.forEach(function(item, index) {
                itemToSave.unshift({
                    title: item.model.item.title,
                    fav: item.model.item.fav
                });
            });
            localStorage.setItem('todo', JSON.stringify(itemToSave));
        }
    };


    var attachEvents = function(){
        $('#itemAddBtn').off('click').on('click', addNewItem);
        $(document).off('keypress').on('keypress', function(e) {
            $('#itemInput').focus();
                if (e.which == 13) {
                    app.todo.addNewItem();
                }
        });
        $('.itemFavorite').off('click').on('click', favItem);
        $('.itemDelete').off('click').on('click', deleteItem);
    };

    var deleteItem = function(){
        console.log('delete');
        var viewToDelete = $(this).parent();
        items.forEach(function(v, i){
            if (v.view.item[0] === viewToDelete[0]){
                items[i].model.remove(i);
            }
        });
    };

    var favItem = function(){
        console.log('favToggle');
        var viewToFav = $(this).parent();
        items.forEach(function(v, i){
            if (v.view.item[0] === viewToFav[0]) {
                items[i].model.update(i);
            }
        });
    };

    var addNewItem = function() {
        console.log('adding new item');
        var title = $('#itemInput').val();
        if (title.length > 0) {
            new Model(title).add();
            $('#itemInput').val('');
            render();
        } else {
            alert('You haven\'t write anything!');
        }
    };

    var render = function() {
        console.info('rendering Note');
        $('#itemsContainer').empty();
        items.forEach(function(item, i) {
            item.model.render(i);
        });
        attachEvents(); //new add
    };

    var Model = function(_title, fav) {
        this.item = {
            title: _title,
            fav: fav || false
        };
        this.add = function() {
            itemToAdd.model = this;
            new View(this).add();
            storage.save();
        };
        this.render = function(i) {
            items[i].view.render();
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
            if (model.item.fav){
                var itemFav = $('<span>&#10084;</span>').addClass('itemFavorite fav').appendTo(item);
            } else {
                var itemFav = $('<span>&#10084;</span>').addClass('itemFavorite').appendTo(item);
            }
            var itemTitle = $('<span></span>').addClass('itemTitle').html(model.item.title).appendTo(item);
            var itemDelete = $('<span>&times;</span>').addClass('itemDelete').appendTo(item);
            this.item = item;
            itemToAdd.view = this;
            items.unshift(itemToAdd);
            itemToAdd = {};
        };
        this.update = function() {
            this.item.children('.itemFavorite').toggleClass('fav');
        };
        this.render = function() {
            $('#itemsContainer').append(this.item);
            this.item.fadeIn();
        };
        this.remove = function() {
            this.item.fadeOut();
        };
        return this;
    };

    var init = function() {
        console.info('Note init');
        render();
    };

    return {
        init: init,
        items: items,
        addNewItem: addNewItem,
        favItem: favItem,
        deleteItem: deleteItem,
        render: render,
        storage: storage
    };
})();

$(window).on('load', app.todo.init);
