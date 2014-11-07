var app = app || {};

app.pages = (function() {

    // a temp container for a page
    var pageToRender;

    // here is to render pages differently.
    var render = {
        // Mashami: function() {
        //     console.log('rendering in-progress page');
        //     // update pageToRender
        //     app.pages.pageToRender = _.template($('#tpl-mashami').html(), {
        //         // dummy: 'blah blah'
        //         dummy: ['Mashami', '2014', 'Warter Color'],
        //         transition: 'slideIn'
        //     });
        //     transition();
        // },
        inProgress: function() {
            console.log('rendering in-progress page');
            // update pageToRender
            app.pages.pageToRender = _.template($('#tpl-inProgress').html(), {
                // dummy: 'blah blah'
                dummy: ['NewYork', 'May 2013', 'Warter Color'],
                transition: 'slideIn'
            });
            transition();
        },
        done: function() {
            console.log('rendering done page');
            app.pages.pageToRender = _.template($('#tpl-done').html(), {
                // dummy: 'blah blah'
                dummy: ['Rose', 'Aug 2012', 'Warter Color'],
                transition: 'slideIn'
            });
            transition();
        },
        about: function() {
            console.log('rendering about page');
            app.pages.pageToRender = _.template($('#tpl-about').html(), {
                // dummy: 'blah blah'
                dummy: ['Ting', 'Apr 2012', 'Warter Color'],
                transition: 'slideIn'
            });
            transition();
        },
        create: function() {
            console.log('rendering create');
            app.pages.pageToRender = _.template($('#tpl-create').html(), {
                // dummy: 'blah blah'
                // dummy: ['Apon', 'Dylan', 'Shufei', 'Alec']
                transition: 'slideInFromBottom'
            });
            overlay();
        }
    };

    var transition = function() {
        // go advanced -> page transitioning
        // console.log($(app.pages.pageToRender))
        $('#view').append(app.pages.pageToRender);
        setTimeout(function() {
            $('.page').removeClass('slideIn');
            $('.end').addClass('slideOut');
        }, 100);
    };

    var overlay = function() {
        $('body').append(app.pages.pageToRender);
        setTimeout(function() {
            $('.overlayer').removeClass('slideInFromBottom');
        }, 100);
    };

    return {
        render: render,
        pageToRender: pageToRender
    };
})();