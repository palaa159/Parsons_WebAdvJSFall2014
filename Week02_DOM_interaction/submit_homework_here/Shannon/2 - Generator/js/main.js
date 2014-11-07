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


//generic functions from online
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
	
	// always -1
	// Thesis Idea Generator
	//"Make a __________ within the domains of __________, __________ and __________, targeting __________. It should have the constraint of __________ and address issues related to __________"

		var greeting = dataContainer.message[random(0,dataContainer.message.length-1)];
		var thing = dataContainer.thing[random(0,dataContainer.thing.length-1)];
		var domain1 = dataContainer.domain1[random(0,dataContainer.domain1.length-1)];
		var domain2 = dataContainer.domain2[random(0,dataContainer.domain2.length-1)];
		var domain3 = dataContainer.domain3[random(0,dataContainer.domain3.length-1)];
		var group = dataContainer.group[random(0,dataContainer.group.length-1)];
		var constraint = dataContainer.constraint[random(0,dataContainer.constraint.length-1)];
		var issue = dataContainer.issue[random(0,dataContainer.issue.length-1)];
		
		var displayText = greeting + " " + thing + ' targeting ' + group + ', within the domains of ' + domain1 + ", " + domain2 + ' and ' + domain3 + ". " + 'It should have the constraint of ' + constraint + ' and address issues related to ' + issue;

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




