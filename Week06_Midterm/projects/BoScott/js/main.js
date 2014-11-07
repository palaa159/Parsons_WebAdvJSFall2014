/* Your code starts here */

var app = app || {};

app.main = (function() {
    var init = function() {
        // app starts running here
        // attach fastClick
        FastClick.attach(document.body);
        // app.pages.render.topArtists();
        storage.load();
        // var storeName = JSON.parse(localStorage.getItem('storeName'));

        var storeName = $('#name').html();
        localStorage.setItem('storeNamee', storeName);
        localStorage.setItem('storeNamee', $('#name').html());
        localStorage.first = storeName;

        $('.favContainer').html = localStorage.first;
        $('.favContainer').html = localStorage.getItem('storeNamee');

        $('.favContainer').append(storeName);
$('#liked').on('click', function() {
                        console.log('liked');
                        $('.favContainer').append($('#artist').html());
var storeName = $('#name').html();
        localStorage.setItem('storeNamee', storeName);
        localStorage.setItem('storeNamee', $('#name').html());
        localStorage.first = storeName;

        $('.favContainer').html = localStorage.first;
        $('.favContainer').html = localStorage.getItem('storeNamee');

        $('.favContainer').append(storeName);
                        // var storeName = $('#name').html();
                        // localStorage.first = storeName;

                        // $('.favContainer').html = localStorage.first;
                        localStorage.setItem('storeName', $('#name').html());

                        var storeName = JSON.parse(localStorage.getItem('storeName'));
                        $('.favContainer').append(storeName);
                    });
        // app.pages.render($('.favContainer').html = localStorage.first;);
        // check hash
        // router will chain to pages.js functions and render the view
        // so we don't have to render anything here
        app.router.route();
        // bind hashchange listener
        hashChange();
        // bind user interaction event listener
        attachEvents();
        // app.main.init.preventDefault();

    };

var storage = {
        load: function() {
            // assume that user doesn't use IE8-
            $('#liked').on('click', function() {
                        console.log('liked');
                        $('.favContainer').append($('#artist').html());
            if (localStorage.length === 0) {
                var storeName = $('#name').html();
        localStorage.setItem('app', storeName);
                var blank = JSON.stringify(storeName);
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
                // lsItems.forEach(function(v) {
                    // new Model(v.title, v.fav).add();
                // });
            }
        });
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
            $('#liked').on('click', function() {
                        console.log('likedC');
                        $('.favContainer').append($('#artist').html());
            localStorage.setItem('app', JSON.stringify(storeName));
        });
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
            .one('webkitTransitionEnd', function() {
                $(this).addClass('end');
            });
        $('.end')
            .off('webkitTransitionEnd')
            .one('webkitTransitionEnd', function() {
                $(this).remove();
            });
        // opening overlayer
        // $('#btnCreate')
        //     .off('click')
        //     .on('click', function() {
        //         app.pages.render.create();
        //         // close overlayer
        //         $('#btnOverlayerClose')
        //             .off('click')
        //             .on('click', function() {
        //                 console.log('close overlayer');
        //                 $(this).parent().addClass('slideInFromBottom');
        //                 $('.overlayer')
        //                     .off('webkitTransitionEnd')
        //                     .on('webkitTransitionEnd', function() {
        //                         $(this).remove();
        //                     });
                    // });
            };
    // };

    
    return {
        init: init
    };


    

})();

$(window).on('load', app.main.init);