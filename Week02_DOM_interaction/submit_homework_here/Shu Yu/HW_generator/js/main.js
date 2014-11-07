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
		var people = dataContainer.people[random(0,dataContainer.people.length-1)];
		var verb = dataContainer.verb[random(0,dataContainer.verb.length-1)];
		var where = dataContainer.where[random(0,dataContainer.where.length-1)];
		var propose = dataContainer.propose[random(0,dataContainer.propose.length-1)];
		
		var displayText = people +' '+ verb +' '+ where + ' ' + propose;

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




