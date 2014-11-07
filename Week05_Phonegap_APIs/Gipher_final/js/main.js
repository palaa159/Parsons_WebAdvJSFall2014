/* Your code starts here */

var app = app || {};

app.main = (function() {
    var giphy = {};
    var user = {
        fav: []
    };
    var init = function() {
        // app starts running here
        // load localStorage
        app.api.storage.load();
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
        // Add tap and click listener for menu tabs
        $('footer > div')
            .off('click')
            .on('click', function() {
                var that = $(this).attr('id');
                window.location.hash = '#/' + that.substring(4, that.length);
            });
        // User hit a trending gif
        $('.item-gif > img')
            .off('click')
            .on('click', function() {
                $('footer').toggleClass('slideDown');
                if ($(this).attr('data-fullscreen') === 'false') {
                    $(this).attr('data-fullscreen', 'true');
                    // if in fullscreen
                    $(this).parent().addClass('blow-parent').css({
                        'transform': 'translate(0px,' + $('.page').scrollTop() + 'px)',
                        '-webkit-transform': 'translate(0px,' + $('.page').scrollTop() + 'px)'
                    });
                } else {
                    $(this).attr('data-fullscreen', 'false');
                    $(this).parent().removeClass('blow-parent').css({
                        'transform': 'none',
                        '-webkit-transform': 'none'
                    });
                }
            });
        // User favorite a trending gif
        $('.item-fav')
            .off('click')
            .on('click', function() {
                var sib = $(this).siblings()[0];
                $(this).toggleClass('selected');
                var id = $(sib).attr('data-id');
                app.main.user.fav.unshift(id);
                // localStorage updates
                app.api.storage.update();
            });
        //
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
    };

    return {
        attachEvents: attachEvents,
        user: user,
        init: init,
        giphy: giphy
    };
})();

$(window).on('load', app.main.init);