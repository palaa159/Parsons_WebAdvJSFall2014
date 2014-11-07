/* Your code starts here */

var app = app || {};

app.main = (function() {
    var items = [];
    var itemToAdd = {};
    var color=0;



    var init = function() {
        // app starts running here
        // attach fastClick
        FastClick.attach(document.body);
        // check hash
        // router will chain to pages.js functions and render the view
        // so we don't have to render anything here
        app.router.route();
        // bind hashchange listener
        hashChange();
        // bind user interaction event listener
        attachEvents();
        storage.load();

    };

    var hashChange = function() {
        $(window).on('hashchange', function() {
            app.router.route();
            attachEvents();
        });
    };
//////////////////////////////////////////////////////////////////
    var attachEvents = function() {
        console.log('attaching events');

       $('#itemAddBtn')
            .off('click')
            .on('click', addNewItem);

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

        $('.itemDelete')
            .off('click')
            .on('click', function() {
                var viewToDelete = $(this).parent();
                items.forEach(function(v, i) {
                    if (v.view.item[0] === viewToDelete[0]) {
                        items[i].model.remove(i);
                    }
                });
            });

        $('#red')
            .off('click')
            .on('click', function() {
                color =1;
                console.log(color);
            });

        $('#blue')
            .off('click')
            .on('click', function() {
                color =2;
                console.log(color);

            });

        $('#green')
            .off('click')
            .on('click', function() {
                color =3;
                console.log(color);
            });

        $('.page')
            .off('webkitTransitionEnd')
            .one('webkitTransitionEnd', function() {
                $(this).addClass('end');
            });
        $('.end')
            .off('webkitTransitionEnd')
            .one('webkitTransitionEnd', function() {
                $(this).remove();
            });
        // opening overlayer
        $('#btnCreate')
            .off('click')
            .on('click', function() {
                app.pages.render.create();
                // close overlayer
                $('#btnOverlayerClose')
                    .off('click')
                    .on('click', function() {
                        console.log('close overlayer');
                        $(this).parent().addClass('slideInFromBottom');
                        $('.overlayer')
                            .off('webkitTransitionEnd')
                            .on('webkitTransitionEnd', function() {
                                $(this).remove();
                            });
                    });
            });
    };
///////////////////////////////////////////////////////////////////////
var addNewItem = function() {
        var title = $('#itemInput').val();
        // add new object
        if (title.length < 200) {
            new Model(title, false, color).add();
            // clear
            $('#itemInput').val('');
            // render
            render();
            attachEvents();
        }else {
            alert('200 characters max.');
        }
    };
///////////////////////////////////////////////////////////////////////
var render = function() {
    console.info('rendering');
        // clear
    $('#itemsContainer').empty();
    items.forEach(function(item, i) { // same things to for()
            // render view
        item.model.render(i);
    });
};
///////////////////////////////////////////////////////////////////////
var Model = function(_title, _fav,_color) {
    this.item = {
        title: _title,
        fav: _fav,
        color:_color
    };
    this.add = function() {
        itemToAdd.model = this;
        new View(this).add();
        storage.save();
    };
    this.render = function(i) {
        items[i].view.render();
        storage.save();
        // console.log(items[i].view);

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
///////////////////////////////////////////////////////////////////////
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
        // console.log(model.item.color);

        var itemCol;
        if(model.item.color==1){
            itemCol = $('<div></div>').addClass('itemRed').appendTo(item);

        }else if(model.item.color ==2){
            itemCol = $('<div></div>').addClass('itemGreen').appendTo(item);


        }else if(model.item.color ==3){
            itemCol = $('<div></div>').addClass('itemBlue').appendTo(item);

        }

        this.item = item;
        itemToAdd.view = this;
        // console.log(item);
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
///////////////////////////////////////////////////////////////////////
var storage = {
    load: function() {
            // assume that user doesn't use IE8-
        if (localStorage.length === 0) {
            var blank = JSON.stringify([]);
            localStorage.setItem('app', blank);
        } else {
                // if already exist
            var lsItems = JSON.parse(localStorage.getItem('app'));
            lsItems.forEach(function(v) {
                new Model(v.title,v.fav,v.color).add();
                // render();
                console.log('----hi load'+ v.color);
            });
        }
            // new Model(title, fav);
    },
    save: function() {
        var itemsToSave = [];
        items.forEach(function(v) {
            itemsToSave.unshift({
                title: v.model.item.title,
                fav: v.model.item.fav,
                color: v.model.item.color
            });
        });
        localStorage.setItem('app', JSON.stringify(itemsToSave));////ASK
        console.log(itemsToSave);

    },


};

///////////////////////////////////////////////////////////////////////
    return {
        init: init,
        items: items,
        storage:storage

    };

})();

$(window).on('load', app.main.init);