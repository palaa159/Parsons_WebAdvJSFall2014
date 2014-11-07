/* Your code starts here */

var app = app || {};

app.main = (function() {
    var items = [];
    var itemToAdd = {};

    var init = function() {

        app.router.route();
        // bind hashchange listener
        hashChange();

        storage.load();
        render();
        
        // bind user interaction event listener
        attachEvents();        
    };

   // it's good to clear localStorage in your browser first.
    var storage = {
        load: function() {
            // load data when refresh browser
            var jsonData = JSON.parse(localStorage.getItem('todo'));
            // console.log(jsonData);
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

    var hashChange = function() {
        $(window).on('hashchange', function() {
            app.router.route();
            attachEvents();
        });
    };
    
    var attachEvents = function() {
        console.log('attaching events');

        // off().on() every time REMEMBER?
        $('.page')
            .off('webkitTransitionEnd')
            .on('webkitTransitionEnd', function() {
                $(this).addClass('end');
            });
        $('.end')
            .off('webkitTransitionEnd')
            .on('webkitTransitionEnd', function() {
                $(this).remove();
            });
        // opening overlayer
        $('#btnAddPlant')
            .off('click')
            .on('click', function() {
                app.pages.render.newPlant();
                // close overlayer
                $('#btnOverlayerClose')
                    .off('click')
                    .on('click', function() {
                        console.log('close overlayer');
                        // $(this).parent().addClass('slideInFromBottom');
                        $('.overlayer').addClass('slideInFromBottom');
                        $('.overlayer')
                            .off('webkitTransitionEnd')
                            .on('webkitTransitionEnd', function() {
                                $(this).remove();
                                // console.log(this);
                            });
                    });

        $('#itemAddBtn')
            .off('click')
            .on('click', function(){
                console.log("hiiiiiii");
                addNewItem();

                $('.overlayer').addClass('slideInFromBottom');
                $('.overlayer')
                    .off('webkitTransitionEnd')
                    .on('webkitTransitionEnd', function() {
                        $(this).remove();
                        // console.log(this);
                    });
            });            

         });

        $('.itemDelete').off('click').on('click', deleteItem);

        $('.testClick')
            .off('click')
            .on('click', function() {
                console.log('clicked');
        });

    };
    var deleteItem = function() {
        // perform deletion
        var viewToDelete = $(this).parent();
        // console.log(viewToDelete);
        // search for the right view in items
        items.forEach(function(item, index) {
            // if you're curious, console.log these things below
            // console.log(item.view[0], viewToDelete[0]);
            if (item.view.item[0] === viewToDelete[0]) { // <--- oops
                // perform model delete
                items[index].model.delete(index);
            }
        });
    };
    var addNewItem = function() {

        var smallImage = document.getElementById('smallImage');

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
            // console.log(item);

            var itemDelete = $('<span>&times;</span>').addClass('itemDelete');
            // var itemTitle = $('<a href="#/"></a>').addClass('itemTitle');
            var itemDelete = $('<span>&times;</span>').addClass('itemDelete');
            var itemTitle = $('<span></span>').addClass('itemTitle');
            console.log(model.item.title);
            // add new todo value to itemTitle
            
            itemTitle.html(model.item.title);

            // sequnetially add elements to item
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
                // console.log(items[i]);
                // add item to itemsContainer div
                $('#itemsContainer').append(this.item);
                // remember why we hide() it? 
                // so now we can fadeIn the element
                this.item.fadeIn();
            // }
        };

        this.update = function() {
            // toggle fav class
            this.item.children('.itemFavorite').toggleClass('fav');
            // toggleClass will add class if it doesn't exist, and vice versa
        };
        // this.named = function(){
        //     for(i=0;i<items.length;i++){
        //         this.item
        //     }
        // };
        // here too.
        return this;
    };
    this.delete = function() {
            // remove element from html document
            this.item.fadeOut(); // <--- jQuery handy fade-out magic

        };
    return {
        init: init,
        itmes: items
    };
})();

$(window).on('load', app.main.init);
// $(window).on('load', app.router);