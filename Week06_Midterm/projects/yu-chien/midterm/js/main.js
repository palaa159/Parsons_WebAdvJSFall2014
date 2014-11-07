/* Your code starts here */

var app = app || {};

app.main = (function() {
    var giphy = {};

    var init = function() {
        FastClick.attach(document.body);
        app.todo.storage.load();
        app.router.route();
        hashChange();
        attachEvents();
        
    };

    var hashChange = function() {
        $(window).on('hashchange', function() {
            app.router.route();
            attachEvents();
        });
    };

    var attachEvents = function() {
        //console.log('attaching events');
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
        
        app.todo.render();
    };

    return {
        init: init,
        attachEvents: attachEvents,
        giphy: giphy
    };
})();

$(window).on('load', app.main.init);
