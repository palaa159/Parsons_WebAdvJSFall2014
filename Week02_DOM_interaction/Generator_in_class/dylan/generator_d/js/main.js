/*

TO DO:
1. create DOM elements that will display the data
2. access a json file, read it, extract it, and
save it as an object inside a variable.
3. Iterate through that variable, concatenate
and display it.

*/

var app = app || {}; // it is empty by default

app.main = (function() {

	var container = document.getElementById('container');

	// container.innerText = 'Hello World';
	// container.innerHTML = 'Hello World';

	// $.ajax -> based on HTTP protocol where you can access an address and make use of the data that lives on that document and return it back into your browser.
	// javascript version, though:
	var getJSON = function(url, success, error) {
		console.log('loading JSON');
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true); // true = make it async
		xhr.onreadystatechange = function() {
			var status, data;
			if (xhr. readyState == 4) { // 4 means done
				status = xhr.status;
				if (status == 200) {

					data = JSON.parse(xhr.responseText);
					success(data);
				} else {
					error(status);
				}
			}
		};
		xhr.send();
	};

	var dataContainer = {};
	var done = function(data) {
		// console.log(data);
		dataContainer = data;
		display();
	};
	var fail = function(err) {
		console.log('error');
	};

	var display = function() {
		//
		// (Greeting), my thesis is (medium) for (user) who (has problem)
		var greeting = dataContainer.message[random(0, dataContainer.message.length-1)];
		var medium = dataContainer.medium[random(0, dataContainer.medium.length-1)];
		var user = dataContainer.user[random(0, dataContainer.user.length-1)];
		var problem = dataContainer.problem[random(0, dataContainer.problem.length-1)];

		var displayText = greeting + ' my thesis is ' + medium + ' for ' + user + ' who ' + problem;

		container.innerHTML = displayText;
	};

	var init = function() {
		// placing our ajax call
		getJSON('data/wtf.json', done, fail);
	};

	return {
		init: init
	};

})();

var random = function (min, max) {
	return Math.floor(Math.random() * max) + min;
};






