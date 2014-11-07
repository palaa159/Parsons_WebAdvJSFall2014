/* Your code starts here */
/* Giphy API by Giphy
https://github.com/giphy/GiphyAPI
public key: dc6zaTOxFJmzC (limit = 100 responses)

– Search Endpoint
http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
– Get GIF by ID Endpoint (ex. feqkVgjJpYtjy)
http://api.giphy.com/v1/gifs/feqkVgjJpYtjy?api_key=dc6zaTOxFJmzC
– Trending GIFs Endpoint
http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC
– Random Endpoint
http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=american+psycho

Options:
– limit=n, n = number

-> How to call an API?
whenever the API is url starts with "http", you can always use jQuery or Zepto ajax call.

$.ajax({
    url: '...',
    dataType: '....', // optional
    method: 'GET', // optional
    success: function(response) {
        // when success
    },
    error: function(err) {
        // when error
    }
});

*/

var app = app || {};

app.main = (function() {
    var giphy = {};

    var init = function() {
        // app starts running here

        // bind user interaction event listener
        console.log('app init');
        getTrending();
        // below is stupid
        // setTimeout(function() {
        //     console.log(giphy.trending);
        // }, 1000);

        // listen for call success
        $(window).on('ajaxSuccess', function() {
            // code resumes here
            renderGif();
            // console.log(giphy.trending);
            // looping the array using Underscore's .each
            // same thing as 
            /*
                for(var i = 0; i < giphy.trending.length; i++) {
                    console.log(giphy.trending[i].images.fixed_width.url);
                }
            */

            // if no template
            // _.each()... {
            //     var itemContainer = $('<div></div>').addClass('afas');
            //     var img = $('<img>').attr('src', item.image);
            //     var id = ....
            //     itemContainer.append(img);
            //     itemContainer.append(id);
            //     $('#view').append(itemContainer);
            // }
        });

        attachEvents();
    };

    var renderGif = function() {
        // render render render render...
        console.log('rendering images');
        // blah blah
        // bhla bhal
        // shuffle the order of giphy.trending

        giphy.trending = _.shuffle(giphy.trending);

        _.each(giphy.trending, function(item, index) {
            console.log(item.images.fixed_width.url);
            var template = $('#gif-template').html();
            var compiled = _.template(template, {
                url: item.images.fixed_width.url,
                id: item.id,
                delay: index/20 //--> index of this item
                // we exploited this to create
                // different delay periods.
            });
            $('#view').append(compiled);

            // animating the Slide-in effect
            // quick fix
            setTimeout(function() {
                $('.gif-container').removeClass('slideIn');
            }, 100);
        });
    };

    var attachEvents = function() {
        console.log('attaching events');

    };

    var getTrending = function() {
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
            method: 'GET',
            success: function(data) {
                console.log('----> data received');
                // console.log(data);
                giphy.trending = data.data;
            }
        });
    };

    return {
        getTrending: getTrending,
        init: init,
        attachEvents: attachEvents,
        giphy: giphy
    };

})();

$(window).on('load', app.main.init);