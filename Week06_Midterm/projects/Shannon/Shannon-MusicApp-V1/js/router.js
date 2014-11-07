var app = app || {};

app.router = (function() {
    var route = function() {
        var hash = window.location.hash,
            page = hash.substring(2, hash.length);
        // check if page exists in pages object
        // console.log(typeof app.pages.render[page]);
        if (typeof app.pages.render[page] === 'function') {
            // good you just navigate to something that exists
            // console.log('let\'s route');
            app.pages.render[page]();
            $('.static').remove();
            $('#view').append(app.pages.pageToRender);
            transition();
        } else {
            // if page doesn't exist, change hash so that 'hashchange' will do the trick.
            window.location.hash = '#/feed';
        }

        // check hash with menu
        $('footer > div').removeClass('selected');
        if(_.contains(['feed', 'favorite', 'about'], page)) {
            $('#tab-' + page).addClass('selected');
        }
    };
    // transition
    var transition = function() {
        // go advanced -> page transitioning
        // console.log($(app.pages.pageToRender))
        setTimeout(function() {
            $('.page').removeClass('slideIn');
            $('.end').addClass('slideOut');
        }, 100);
    };

    return {
        route: route
    };
})();