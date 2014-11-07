/* Your code starts here */
/*

*/

var app = app || {};

app.main = (function() {

    var container = document.getElementById('container');

    //container.innerHTML = 'Hello World';


    var getJSON = function(url, success, error){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true); //true = make it async
        xhr.onreadystatechange = function(){

            var status, data;
            if(xhr.readyState == 4){

                status = xhr.status;
                if(status == 200){

                    data = JSON.parse(xhr.responseText);
                    success(data);
                }else{
                    error(status);
                }
            }

        };

        xhr.send();

    };





    var dataContainer = {};


    //conditions for the call to the ajax file

    var done = function(data){
        dataContainer = data;
        console.log(data);
        display();

    };

    var fail = function(err){
        console.log(err);

    };

    var display = function(){
        //(Greetings), my thesis is (medium), for (user) who (has this problem)
        var greeting = dataContainer.message[random(0,dataContainer.message.length - 1)]; // - 1 because the length of the array includes 0. for example (0,24) would be an array of 25
        var medium = dataContainer.medium[random(0,dataContainer.medium.length - 1)];
        var user = dataContainer.user[random(0,dataContainer.user.length - 1)];
        var problem = dataContainer.problem[random(0,dataContainer.problem.length - 1)];

        var displayText = greeting + ' my thesis is ' + medium + ' for ' + user + ' who ' + problem;

        //var displayText = function(){

            
        //};

        $(document).ready(function () {
            for (var i = 0; i < 12; i++) {
                //var divTag = document.createElement("div");
                //divTag.id = "div" + i;
                //divTag.innerHTML = Date();
                //$('#container').append('<div id="div' + i + '"'+dataContainer.message[random(0,dataContainer.message.length - 1)]+'</div>');

                container.innerHTML = container.innerHTML + '<div class="keywordz" id="div' + i + '">'+dataContainer.message[random(0,dataContainer.message.length - 1)]+'</div>';
                

            }
        });
    
        //container.innerHTML = displayText;
    };






    // var floatWords = function(){

    //     $(document).ready(function () {
    //         for (var i = 1; i < 10; i++) {
    //             $('#container').append('TESTING');
    //         }
    //     });
    // };




    var items = [];
    var itemToAdd = {};

    var attachEvents = function() { // Controllers
        // we keep all the events here
        $(this.container)
        .off('click') // it's good to have this
        .on('click', addNewKeyword);

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


    var addNewKeyword = function() {
        var keytitle = $('#div0').text();

        //var which = $(this).index();

        console.log(this);


        new Model(keytitle, false).add();

        render();
        attachEvents();

        

        console.log('it happened');

        //var blurb = $('').val();
        // add new object
        
    };


    var addNewItem = function() {
        var title = $('#itemInput').val();

        //var blurb = $('').val();
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

            //var itemTitle = $('<a href=""></a>').addClass('itemTitle');

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

       getJSON('data/wtf.json', done, fail);
    
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

var random = function(min, max){

    return Math.floor((Math.random() * max ) + min);
};