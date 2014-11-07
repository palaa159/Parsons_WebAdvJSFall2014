/* Your code starts here */
/*
    1. structure app
    2. create events (controllers)
    3. create Model/View
    4. render view
*/

var app = app || {};

app.main = (function() {
    var items = []; // an array to contain everything we add
    var itemToAdd = {}; // the object containing the current entry in the to-do list.
    var mouse = {x: 0, y: 0};

/*
    These are the events that trigger everything else:
    1)  mouse move updates the variables mouse.x and mouse.y
    2)  mouse click on the "itemAddBtn" which adds a new item
    3)  keypress "enter" adds a new item
    4)  mouse click on "itemFavorite" toggles the favorite item on and off
    5)  mouse click on "itemDelete" permanently removes an item
*/

    var attachEvents = function() { // Controllers
        // we keep all the events here

        document.addEventListener('mousemove', function(e){ 
            mouse.x = e.clientX || e.pageX; 
            mouse.y = e.clientY || e.pageY 
        }, false);

        $('#itemAddBtn')
            .off('click') // it's good to have this (why, I have no idea)
            .on('click', addNewItem); // when this button is clicked, add a new item.
        // listening for keypress
        $(document)
            .off('keypress')
            .on('keypress', function(e) { // if the key pressed is 'enter', then addNewItem
                // the e here is the button pressed, as passed into it by the .on() event
                // autofocus does what?
/*??*/          $('#itemInput').focus(); //'gives focus to' #itemInput I guess. I still don't understand exactly what that entails.
                if (e.which == 13) { // enter
                    addNewItem(); // goto line 65 (not anymore. Need to update this)
                }
            });

        // listener for fav
        $('.itemFavorite')
            .off('click')
            .on('click', function() { // when you click an item with the class '.itemfavorite'
                var viewToFav = $(this).parent(); // create a variable with the attributes of that item's parent
                items.forEach(function(v, i) { // for each item in the "items" array
                    // it should be noted - the forEach() function has variables unto itself. These are
                        // value, index, array1
                        // value (v) is the value of the array element in 'items'
                        // index (i) is the numeric index of the array element in 'items'
                        // array1 is the array object that contains the element. ie, this is the 'items' array unto itself.
                    // we don't use array1 here (or anywhere on this page), but we could. Also, I have no idea what it would shorten to
                    // or how value and index automatically seem to shorten to v and i.
                    if (v.view.item[0] === viewToFav[0]) { // if the item is the same as our new variable (ie, if it's the one we clicked)
                        items[i].model.update(i); // toggle the 'fav' boolean true and false
                    }
                });
            });

        // listener for delete
        // this works almost identical to the listener for fav
        $('.itemDelete')
            .off('click')
            .on('click', function() { // when you click an item with the class '.itemDelete'
                var viewToDelete = $(this).parent(); // create a variable with the attributes of that item's parent
                // compare
                // console.log(items[0].view.item[0]);
                // console.log(viewToDelete[0]);
                // find in items
                items.forEach(function(v, i) { // for each item in the 'items' array
                    if (v.view.item[0] === viewToDelete[0]) { // if the item is the same as our new variable (ie, if it's the one we clicked)
                        // console.log(i);
                        // remove it
                        items[i].model.remove(i); // remove it from the array.
                    }
                });
            });

        // edit todo
        $('.item')
            .off('dblclick')
            .on('dblclick', function() { // when you double click an item with the class '.item'
                $(this).append(" hey"); // add 'hey' to the end of this item. this can take html elements, jquery objects, or DOM elements, and could include a function
                    // for now, though, it's just a string.
            });
    };

/*
    addNew Item is called by an event, and calls for:
    1)  an object to be added to the model (if there is text in the 'itemInput' box) via 'Model(title).add'
    2)  everything to be rendered to the screen via 'render()'

    render is called by addNewItem, and:
    1)  empties the #itemsContainer (where all previous entries were displayed)
    2)  cycles through each entry in 'items' and performs 'item.model.render(i)' (pulls from view.render, but specifies 'this')
    3)  runs "attachEvents()" <-- why is this needed?
*/

    var addNewItem = function() { // addNewItem is a function with no parameters.
        // pass what has been typed into #itemInput to the variable "title"
        var title = $('#itemInput').val();
        // add new object
        if (title.length > 0) { // if something has been typed
            // create a new model. see functions below for more.
            new Model(title, false, mouse).add();
            // clear the input container
            $('#itemInput').val('');
            // and render everything to screen
            render();
            // finally, attach the events. I do not understand the structural logic of why this last bit is. Should ask Apon or someone who knows.
            attachEvents();
        } else { // if nothing is typed, display this error.
            alert('Field empty');
        }
    };

    var render = function() {
        console.info('rendering');
        // clear the #itemsContainer (where all previous entries were displayed)
        $('#itemsContainer').empty();
        items.forEach(function(item, i) { // for each item in 'items'
            // render view
            item.model.render(i); // call its model.render function, feeding the function the item's index
        });
    };

/*
    Model is a class of object designed to hold the info and related methods of a "to-to list" item.
        .item contains the stored information, as the text it contains, and its 'fav' status
        .add passes the item's information to 'itemToAdd' and adds the current object to the HTML
        .render adds the item to 'itemsContainer', thus causing it to fade in and render

*/

    var Model = function(_title, _fav, _pos) {
        this.item = { // the item's stored information
            title: _title, // the text that appears on screen
            fav: _fav, // whether or not the 'fav' icon is active
            pos: _pos
        };
        this.add = function() { // add a new item to the to-do list
            // passes the item's information to 'itemToAdd'
            // effectively giving the itemToAdd a title and a 'fav' state
            itemToAdd.model = this;
            // chain to view
            // adds the current object to the HTML - see 'var View' for more information
            new View(this).add();
            // save the contents of the array 'items'
            storage.save();
        };
        this.render = function(i) {
            // add this item to "itemsContainer," and cause it to fade in
            items[i].view.render();
            // save the contents of the array 'items'
            storage.save();
        };
        this.update = function(i) {
            // toggle the 'fav' boolean on and off
            this.item.fav = !this.item.fav;
            // toggle whether or not the children of '.itemFavorite' have the class 'fav'
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
            var item = $('<div></div>').addClass('item').hide().css("position", "absolute").css("left", mouse.x).css("top", mouse.y);
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