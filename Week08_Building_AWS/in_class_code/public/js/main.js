/* Your code starts here */

var app = app || {};

app.main = (function() {
	var init = function() {
		// app starts running here

		var food = document.getElementById('food');
		var topping = document.getElementById('topping');
		var protein = document.getElementById('protein');
		var sides = document.getElementById('sides');

		document.getElementById('submit').addEventListener('click', function() {
			console.log('SUBMITTING');
			var dataToSend = {
				food: food.value,
				topping: topping.value,
				protein: protein.value,
				sides: sides.value
			}


			$.ajax({
				url: '/crystal',
				method: 'GET',
				dataType: 'json',
				data: dataToSend,
				success: function() {
					console.log('DATA SUBMITTED');
				},
				error: function() {
					console.log('some error happened');
				}
			});

		});
	};

	return {
		init: init
	};
})();

app.main.init();