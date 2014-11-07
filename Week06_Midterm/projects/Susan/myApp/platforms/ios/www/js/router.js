var app = app || {};

app.router = (function() {
    var route = function() {
        var hash = window.location.hash,
            page = hash.substring(2, hash.length);
        // check if page exists in pages object
        // console.log(page);
        
        if (typeof app.pages.render[page] === 'function') {
            // good you just navigate to something that exists
             // console.log('let\'s route');
             app.pages.render[page]();
        // } else if(typeof app.main.view[page] === 'function'){
        //        console.log('heyyyyyyyyyyyy');
        //        window.location.hash = '#/[page]';
        //     //app.pages.render[page]();
        }else{
            // if page doesn't exist, change hash so that 'hashchange' will do the trick.
            window.location.hash = '#/myGardan';
        }
        // add to app #view
        $('#view').html(app.pages.pageToRender);
    };
    return {
        route: route
    };
})();