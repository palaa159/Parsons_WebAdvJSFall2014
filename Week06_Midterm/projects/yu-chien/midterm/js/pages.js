var app = app || {};

app.pages = (function() {

    // a temp container for a page
    var pageToRender;

    // here is to render pages differently.
    var render = {
        catNote: function() {
            console.log('rendering cat-note page');
            app.pages.pageToRender = _.template($('#tpl-catNote').html(), {
                transition: 'slideIn',
                items: app.todo.items
            });
            transition();
        },
        explore: function() {
            console.log('rendering explore page');
            app.api.getTrending();

            app.pages.pageToRender = _.template($('#tpl-explore').html(), {
                transition: 'slideIn'
            });
            
            
            $(window)
            .off('ajaxSuccess')
            .on('ajaxSuccess', function(){
                console.warn('rendering gifs');
                var gifsToRender =_.template($('#tpl-giphy').html(), {
                    transition: 'slideIn',
                    data: app.main.giphy.trending
                });
                $('#p-explore').html(gifsToRender);

                setTimeout(function(){
                    $('.item-gif').removeClass('slideIn');
                }, 100);

                
            });
            transition();
        },
        create: function() {
            console.log('rendering create');
            app.pages.pageToRender = _.template($('#tpl-create').html(), {
            transition: 'slideInFromBottom'
            });
            overlay();
        }
    };

    var transition = function() {
        // console.log($(app.pages.pageToRender))
        $('#view').append(app.pages.pageToRender);
        setTimeout(function() {
            $('.page').removeClass('slideIn');
            $('.end').addClass('slideOut');
        }, 100);
    };

    var overlay = function() {
        $('body').append(app.pages.pageToRender);
        // EL comes after you created the page
        app.main.attachEvents();
        setTimeout(function() {
            $('.overlayer').removeClass('slideInFromBottom');
        }, 100);
        
    };

    return {
        render: render,
        pageToRender: pageToRender
    };
})();
