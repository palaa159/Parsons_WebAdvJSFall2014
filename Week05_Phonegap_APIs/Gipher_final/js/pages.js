var app = app || {};

app.pages = (function() {

    // a temp container for a page
    var pageToRender;

    // here is to render pages differently.
    var render = {
        feed: function() {
            console.log('rendering page: Feed');
            // update pageToRender
            var transition = 'appear static';
            app.pages.pageToRender = _.template($('#tpl-feed').html(), {
                transition: transition
            });
            // get trending
            app.api.getTrending();
            // when ajax call succeeded
            $(window)
                .off('ajaxSuccess')
                .on('ajaxSuccess', function() {
                    console.warn('Rendering gifs');
                    var gifsToRender = _.template($('#tpl-feed-container').html(), {
                        data: app.main.giphy.trending
                    });
                    $('#p-feed').html(gifsToRender);
                    // attach Events
                    app.main.attachEvents();
                });
        },
        favorite: function() {
            console.log('rendering page: Favorite');
            var transition = 'appear static';
            app.pages.pageToRender = _.template($('#tpl-favorite').html(), {
                transition: transition
            });
        }
    };

    return {
        render: render,
        pageToRender: pageToRender
    };
})();