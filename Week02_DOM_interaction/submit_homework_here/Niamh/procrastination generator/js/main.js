/*

	TODO
	1. Create DOM elements that will display the data
	2. Access a JSON file, read it, extract it, 
	   and save it as an object inside a variable
	3. Iterate through that variable, concatinate it
	   and display it. 

*/

// || means by default it will be empty
var app = app || {};

//+ before the function and the double parenthesis after allows the function to call itself
app.main = (function() {
	// $('#container')
	var container = document.getElementById('container');

	// container.HTML = 'Hello World';

	var getJSON = function(url, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true); //true = makes it asyncronous
		xhr.onreadystatechange = function() {
			var status, data;
			if (xhr.readyState == 4) { //4 means DONE
				status = xhr.status;
				if(status == 200) {
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
		console.log(data);
		dataContainer = data;
		display();
	};

	var fail = function(err) {
		console.log(err);
	};

	var display = function() {
		//stat with (greeting), my thesis is (why) for (company) who (has a problem)
		var greeting = dataContainer.message[random(0,dataContainer.message.length-1)];
		var why = dataContainer.why[random(0,dataContainer.why.length-1)];
		var company = dataContainer.company[random(0,dataContainer.company.length-1)];
		var activity = dataContainer.activity[random(0,dataContainer.activity.length-1)];
		
		var displayText = greeting + ' I was ' + activity + ' with ' + company + ' and we ' + why;

		container.innerHTML = displayText;
	};

	var init = function() {
		//Calling our ajax call
	getJSON('data/wtf.json', done, fail);
	};

	//app.main.init() calls init function within app.main
	//window.addEventListener('DOMContentLoaded', app.main.init());
	return {
		//returning init outside of the app.main scope
		init: init
	};
})();

//app.main.init();
window.addEventListener('DOMContentLoaded', app.main.init());

	var random = function(min, max) {
		return Math.floor(Math.random() *max) + min;
	};




