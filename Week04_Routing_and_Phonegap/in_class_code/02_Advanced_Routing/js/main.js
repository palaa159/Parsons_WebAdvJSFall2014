/* Your code starts here */

var app = app || {};

app.main = (function() {
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

    return {
        init: init
    };
})();

$(window).on('load', app.main.init);