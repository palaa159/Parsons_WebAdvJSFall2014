/*
    Hello WebJSAdv students
    Let's recap on JS Design Pattern
    ***MVC***
    Model-View-Controller

    This excerise is part of Single Page Application (SPA)
    SPA is a way we write web application that is self-contained
    and you might have noticed that whenever we react to controllers
    (ie., buttons), the app DOES NOT REFRESH.

    This makes user experience more fluid. And we can also add
    transitions between pages or app states.

    In this app, I am going to cover what we did in the last class
    but in a more elaborate way.

    Let's get started!
    Process:
    1. Structure the app
    2. Create controllers (event listeners)
    3. Create Model and View Constructor (class)
    4. Connect to localStorage in order to store and retrieve data
*/

// 1.
var app = app || {};
app.main = (function() {
    var items = [];
    // this array will contain todos we retrieve from
    // localStorage and also is where we will store new items

    // let's create a temporary variable that keeps our newly created todo
    var itemToAdd = {};

    var init = function() {
        console.log('app init');
        // don't forget to call attachEvents
        // load data from storage
        storage.load();
        render();
        attachEvents();
    };

    // 4. let's connect to localStorage
    // it's good to clear localStorage in your browser first.
    var storage = {
        load: function() {
            // load data when refresh browser
            var jsonData = JSON.parse(localStorage.getItem('todo'));
            console.log(jsonData);
            if (jsonData === null) {
                // meaning we never init localStorage for this app before
                // create a blank array
                localStorage.setItem('todo', '[]');
                // ** REMEMBER, localStorage only accept string
                // so directly setting array or obj data type won't work
            } else {
                // meaning we previously had data stored already
                jsonData.forEach(function(item, index) {
                    new Model(item.title, item.fav).create();
                });
            }
        },
        save: function() {
            // save data to localStorage everytime we change anything in model
            var itemToSave = [];
            items.forEach(function(item, index) {
                itemToSave.unshift({
                    title: item.model.item.title,
                    fav: item.model.item.fav
                });
            });
            // stringify and store in localStorage
            localStorage.setItem('todo', JSON.stringify(itemToSave));
        }
    };

    // 2. I will refer "Controller" to "attachEvents"
    var attachEvents = function() {
        // 2.1 let's create a listener of Add Btn
        $('#itemAddBtn').off('click').on('click', addNewItem);
        // add a listener for deletions
        $('.itemDelete').off('click').on('click', deleteItem);
        // also add listener for fav
        $('.itemFavorite').off('click').on('click', favItem);
    };

    var deleteItem = function() {
        // perform deletion
        var viewToDelete = $(this).parent();
        // console.log(viewToDelete);
        // search for the right view in items
        items.forEach(function(item, index) {
            // if you're curious, console.log these things below
            console.log(item.view[0], viewToDelete[0]);
            if (item.view.item[0] === viewToDelete[0]) { // <--- oops
                // perform model delete
                items[index].model.delete(index);
            }
        });
    };

    var favItem = function() {
        // perform fav / unfav item
        var viewToFav = $(this).parent();
        // follow deleteItem
        items.forEach(function(item, index) {
            if (item.view.item[0] === viewToFav[0]) {
                items[index].model.update(index);
            }
        });
    };

    var addNewItem = function() {
        // 2.2 grab input field value and instantiate new model
        var value = $('#itemInput').val();
        // let's say we need more than 2 characters as a valid title for todo
        if (value.length > 2) {
            // we will perform something here
            // console.log('OK!');
            // let's INSTANTIATE a new model for this new TODO
            new Model(value, false).create(); // false is to no-like as default
            // and we also have to render
            render();
            // also re-attach event
            attachEvents();
            // and clear input field
            $('#itemInput').val('');
        } else {
            alert('Title invalid'); // because you only put 2- chars
        }
    };

    var render = function() {
        // iterate items array
        // remember for loop?
        // below is the same
        items.forEach(function(value, index) {
            // render model so that model will render view
            value.model.render(index);
        });
    };

    // 3. create Model and View Constructor
    var Model = function(title, fav) {
        this.item = {
            title: title,
            fav: fav || false
        };
        // Model contains pure data and some logic to manipulate data
        // Remember CRUD?
        this.create = function() {
            // add model property to itemToAdd
            itemToAdd.model = this;
            // chain it to View
            new View(this).create();
            // save to storage
            storage.save();
        };
        this.render = function(index) {
            items[index].view.render();
        };
        this.update = function(index) {
            // toggle true/false on this.item.fav
            this.item.fav = !this.item.fav;
            // chain to View
            items[index].view.update();
            // save to storage
            storage.save();
        };
        this.delete = function(index) {
            // chain to View
            console.log('deleting');
            items[index].view.delete();
            // remove index
            items.splice(index, 1);
            // save to storage
            storage.save();
        };
        // C R U D :)
        // it's good to return this everytime
        return this;
    };

    var View = function(model) {
        // View is the dumbest Class in our app. it only waits for Model to
        // tell what to do. And it does not perform anything except 
        // changing the DOM.
        // As well, View class also perform CRUD
        this.item = null; // <--- this is for view, not the same as Model's item

        this.create = function() {
            // create a DOM for this model (refer to the template in html document)
            var item = $('<div></div>').addClass('item').hide(); // let's hide it for now

            if (model.item.fav) {
                var itemFavorite = $('<span>&#10084;</span>').addClass('itemFavorite fav');
            } else {
                var itemFavorite = $('<span>&#10084;</span>').addClass('itemFavorite');
            }

            var itemDelete = $('<span>&times;</span>').addClass('itemDelete');
            var itemTitle = $('<span></span>').addClass('itemTitle');
            // add new todo value to itemTitle
            itemTitle.html(model.item.title);
            // sequnetially add elements to item
            item.append(itemFavorite);
            item.append(itemTitle);
            item.append(itemDelete);

            this.item = item; // <-- we just finished creating item
            itemToAdd.view = this;
            // add itemToAdd to items
            items.unshift(itemToAdd);
            // clear itemToAdd
            itemToAdd = {};
        };
        this.render = function() {
            // add item to itemsContainer div
            $('#itemsContainer').append(this.item);
            // remember why we hide() it? 
            // so now we can fadeIn the element
            this.item.fadeIn();
        };
        this.update = function() {
            // toggle fav class
            this.item.children('.itemFavorite').toggleClass('fav');
            // toggleClass will add class if it doesn't exist, and vice versa
        };
        this.delete = function() {
            // remove element from html document
            this.item.fadeOut(); // <--- jQuery handy fade-out magic

        };
        // here too.
        return this;
    };

    return {
        init: init,
        items: items
    };
})(); // <-- we create a function and call it immediately.
// as a result, this is a immediately-invoked function

$(document).ready(app.main.init);