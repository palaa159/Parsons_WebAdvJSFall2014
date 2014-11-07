var app = app || {};
/*
For storing our Giphy API
Read Documentation below:
https://github.com/giphy/GiphyAPI

Query for trending gifs, limited to 5 items:
http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=5
*/

app.api = (function() {
	var storage = {
		load: function() {
			if(localStorage['giffig'] === undefined) {
				localStorage['giffig'] = '[]';
			}
			app.main.user.fav = JSON.parse(localStorage.getItem('giffig'));
		},
		update: function() {
			localStorage['giffig'] = JSON.stringify(app.main.user.fav);
		}
	};

	var getTrending = function() {
		$.ajax({
			url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=20',
			// dataType: 'jsonp',
			success: function(data) {
				// console.log(data);
				app.main.giphy.trending = _.shuffle(data.data).slice(0, 12);
			}
		});
	};

	return {
		storage: storage,
		getTrending: getTrending
	};
})();