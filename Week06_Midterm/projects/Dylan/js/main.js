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
    2)  keypress "enter" adds a new item
    3)  mouse click on "itemDelete" permanently removes an item
    4)  when you double click an item, add text to the item
*/

    var attachEvents = function() { // Controllers
        // we keep all the events here

        document.addEventListener('mousemove', function(e){ 
            mouse.x = e.clientX || e.pageX; 
            mouse.y = e.clientY || e.pageY 
        }, false);

        // listening for keypress
        $(document)
            .off('keypress')
            .on('keypress', function(e) { // if the key pressed is 'enter', then addNewItem
                // the e here is the button pressed, as passed into it by the .on() event
                // autofocus does what?
/*??*/          $('#itemInput').focus(); //'gives focus to' #itemInput I guess. I still don't understand exactly what that entails.
                if (e.which == 13) { // enter
                    addNewItem();
                }
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

        // edit
        $('.item')
            .off('dblclick')
            .on('dblclick', function() { // when you double click an item with the class '.item'
                var text = $('#itemInput').val(); // copy the text from the input box to a var
                if (text.length > 0) { // if there is text that has been typed
                    $(this).append('<br>' + text); // add that text to the object
                    var viewToEdit = $(this); // create a variable with the attributes of the object clicked
                        console.log(viewToEdit);
                        console.log(this);
                        items.forEach(function(v, i) { // for each item in the 'items' array
                            if (v.view.item[0] === viewToEdit[0]) { // if the item is the same as our new variable file (ie, if it's the one we double clicked)
                                items[i].model.item.text.push(text); // add the contents of the input box to the text array in the object clicked

                            }
                        });

                    $('#itemInput').val(''); // clear the input container
                };
                // var viewToEdit = $(this); // create a variable with the attributes of that item's parent
                // // var date/time (to do)

                // items.forEach(function(v, i) { // for each item in the 'items' array
                //     if (v.view.item[0] === viewToEdit[0]) { // if the item is the same as our new variable file (ie, if it's the one we double clicked)
                //         items[i].model.item.text.push(text); // add the contents of the input box to the text array in the object we clicked
                //         console.log(items[i].model.item.text)
                //         $('#itemInput').val(''); // clear the input container
                //         view.update();
                //         render();
                //         attachEvents();
                //     }

                // });
                // $(this).append("<br>hey"); // add 'hey' to the end of this item. this can take html elements, jquery objects, or DOM elements, and could include a function
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
    3)  runs "attachEvents()" <-- why is this needed? Why does it not hear events without this?
*/

    var addNewItem = function() { // addNewItem is a function with no parameters.
        // pass what has been typed into #itemInput to the variable "title"
        var title = $('#itemInput').val();
        // add new object
        if (title.length > 0) { // if something has been typed
            // create a new model. see functions below for more.
            new Model(title, {x: mouse.x, y: mouse.y}).add();
            // clear the input container
            $('#itemInput').val('');
            // and render everything to screen
            render();
            // finally, attach the events. I do not understand the structural logic of why this last bit is.
            attachEvents();
        } else { // if nothing is typed, display this error.
            alert('Field empty');
        }
        console.log(items);
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

    var Model = function(_title, _pos, text) {
        this.item = { // the item's stored information
            title: _title, // the text that appears on screen
            pos: _pos,
            text: [],
            time: []
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
        // return this; // max says not to do this
    };

    var View = function(model) {
        this.item = null;

        this.add = function() {
            var item = $('<div></div>').addClass('item').hide().css("position", "absolute").css("left", model.item.pos.x).css("top", model.item.pos.y);
            var itemFav = $('<span>&#127919;</span>').addClass('itemFavorite').appendTo(item);
            var itemTitle = $('<span></span>').addClass('itemTitle').html(model.item.title).appendTo(item);
            var itemDelete = $('<span>&times;</span>').addClass('itemDelete').appendTo(item);
            var itemEdit = model.item.text.forEach(function(v, i) {
                $('<span><br>hello</span>').appendTo(item);
            });

            this.item = item;
            itemToAdd.view = this;
            // unshift
            items.unshift(itemToAdd);
            // clear
            itemToAdd = {};
        };
        this.update = function() {
            // toggle class
            // this.item.children('.itemFavorite').toggleClass('fav');
            // var updates = this.item.text.forEach(function(text, i) {
            //     $('<br>' + this.item.text[i]).appendTo(item);
            // });

            var update = $('<span><br>hello</span>').appendTo(this.item);
            // this.item = item
        };
        this.render = function() {
            // render to itemsContainer
            $('#itemsContainer').append(this.item);
            this.item.fadeIn();
        };
        this.remove = function() {
            this.item.fadeOut();
        };
        // return this; // max says not to do this
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
                    new Model(v.title, v.pos, v.text).add();
                });
            }
            // new Model(title, fav);
        },
        save: function() {
            var itemsToSave = [];
            items.forEach(function(v) {
                itemsToSave.unshift({
                    title: v.model.item.title,
                    pos: v.model.item.pos,
                    text: v.model.item.text
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