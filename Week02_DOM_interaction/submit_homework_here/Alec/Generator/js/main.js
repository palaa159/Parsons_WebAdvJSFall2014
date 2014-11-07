/* Your code starts here */


	// TO DO
	// 1. Create DOM elements that will display the data
	// 2. Access a json file, read it, extract it and save it as an object inside variable
	// 3. Iterate though that variable, concatenate and display it.

var app = app || {}; // its empty by default


app.main = (function() {
//container.innerHTML = "Hello World";

	var container = document.getElementById("container");

	var getJSON = function(url, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true); // true = make it async
		xhr.onreadystatechange = function(){
			var status, data;
			if (xhr.readyState == 4){ // 4 means done
				status = xhr.status;
				if (status == 200){
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

	var display = function(){
			// GREETINGS, my thesis is (medium) for (user) who (has a problem)
			var greeting = dataContainer.message[random(0, dataContainer.message.length-1)];
			var medium = dataContainer.medium[random(0, dataContainer.medium.length-1)];
			var user = dataContainer.user[random(0, dataContainer.user.length-1)];
			var problem = dataContainer.problem[random(0, dataContainer.problem.length-1)];
			
			var displayText = " My favorite pokemon is a " + greeting + " " + medium + " that " + user;
		
			container.innerHTML = displayText;

	};

	var init = function() {
		// calling our ajax call
		getJSON('data/wtf.json', done, fail);
	};

	return {
		init: init
	};

	//container.innerHTML = "Hello World";
})();

//app.main.init();

window.addEventListener("DOMContentLoaded", app.main.init());
//same as doc.ready in jquery

var random = function (min, max) {
	return Math.floor(Math.random() * max) + min;
};












