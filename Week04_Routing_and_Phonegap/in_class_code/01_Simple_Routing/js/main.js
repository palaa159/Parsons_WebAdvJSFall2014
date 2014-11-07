/* Your code starts here 

   _____ _             _        _____                                        _ _           _   _             
  / ____(_)           | |      |  __ \                     /\               | (_)         | | (_)            
 | (___  _ _ __   __ _| | ___  | |__) |_ _  __ _  ___     /  \   _ __  _ __ | |_  ___ __ _| |_ _  ___  _ __  
  \___ \| | '_ \ / _` | |/ _ \ |  ___/ _` |/ _` |/ _ \   / /\ \ | '_ \| '_ \| | |/ __/ _` | __| |/ _ \| '_ \ 
  ____) | | | | | (_| | |  __/ | |  | (_| | (_| |  __/  / ____ \| |_) | |_) | | | (_| (_| | |_| | (_) | | | |
 |_____/|_|_| |_|\__, |_|\___| |_|   \__,_|\__, |\___| /_/    \_\ .__/| .__/|_|_|\___\__,_|\__|_|\___/|_| |_|
                  __/ |                     __/ |               | |   | |                                    
                 |___/                     |___/                |_|   |_|                                    

or SPA.

– Creating multi-pages web application with only single html file; ie. index.html
– Using JavaScript to create and insert elements in page on-the-fly
Remember that we can always do:

	var pageEl = $('<div></div>').addClass('page'),
		pageTitle = $('<h1></h1>').html('greetings SPI');
	pageEl.append(pageTitle);
	$('body').append(pageEl);

Later on we will use Template Engines (underscore, lo-dash, mustache, handlebars, etc) to handle this.

––––––––––––––
In this code document, we're going to focus on ROUTING. 

*/


var app = app || {};

app.main = (function() {
    var insertedPage;
    var init = function() {
        // app starts running here
        console.log('app init');
        route();
        // attachEvents();
    };

    // object that controls routing by looking at the URL
    var route = function() {
        var hash = window.location.hash;
        hash = hash.substring(2, hash.length);
        // Insert a page
        insertedPage = $('<div></div>').addClass('page pageSlideIn');
        //
        if (hash === '') {
            page.renderHome();
        } else if (hash === 'page02') {
            page.renderAbout();
        } else if (hash === 'page03') {
            page.renderPage03();
        } else {
            page.renderHome();
        }
        // append to app
        $('#app').append(insertedPage);

        // transition!
        setTimeout(function() {
            insertedPage.removeClass('pageSlideIn');
            // remove old page
            if ($('.page').length > 1) {
                $('.pageDone')
                    .addClass('pageSlideOut')
                    .on('webkitTransitionEnd', function() {
                        $(this).remove();
                    });
            }
            insertedPage.addClass('pageDone');
        }, 50);
    };
    // Render content
    var page = {
        renderHome: function() {
            console.log('rendering homepage');
            insertedPage.attr({
                id: 'pageHome'
            });
            insertedPage.html('<h1>In-Progress</h1>');
        },
        renderAbout: function() {
            console.log('rendering about page');
            insertedPage.attr({
                id: 'pageAbout'
            });
            insertedPage.html('<h1>Done</h1>');
        },
        renderPage03: function() {
            console.log('rendering about page');
            insertedPage.attr({
                id: 'pageSomething'
            });
            insertedPage.html('<h1>About</h1>');
        }
    };

    return {
        init: init,
        route: route
    };
})();

// if document starts to load, trigger init 
$(window).on('load', app.main.init);
// when window changes url (hash), route page
$(window).on('hashchange', app.main.route);