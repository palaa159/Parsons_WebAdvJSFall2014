var app = app || {};

app.api = (function(){

    var getTrending = function(){
        $.ajax({
            url:'http://api.giphy.com/v1/gifs/search?q=kitten&api_key=dc6zaTOxFJmzC&limit=20',
            success: function(data){
                console.log('data received');
                //app.main.giphy.trending = data.data;
                app.main.giphy.trending = _.shuffle(data.data).slice(0, 12);
            }
        });
    };
    return{
        getTrending: getTrending
    };
})();

