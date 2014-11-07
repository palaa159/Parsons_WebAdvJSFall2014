/* Your code starts here */

var app = app || {};

app.main = (function() {
    var init = function() {
        // app starts running here
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
    };

    var attachEvents = function() {
        console.log('attaching events');
        // off().on() every time REMEMBER?
    };

    return {
        init: init
    };
})();

$(window).on('load', app.main.init);