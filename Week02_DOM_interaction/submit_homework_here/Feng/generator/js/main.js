/* Your code starts here */

var app = app || {};

app.main = (function(){
var container = document.getElementById('container');

// container.innerHTML = 'hello world';

var getJSON = function(url, success, error) {
    // watch closely it's super verbose and complicated
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // true = make it asnyc
    xhr.onreadystatechange = function() {
        var status, data;
        if (xhr.readyState == 4) { // 4 means DONE
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

var done = function(data){
		dataContainer = data;
		console.log(data);
		display();
	};

var fail = function(err){
		console.log(err);
		
	};
	var display = function(){
		var greeting = dataContainer.time[random(0,dataContainer.time.length-1)];
		var people = dataContainer.people[random(0,dataContainer.people.length-1)];
		var verb = dataContainer.verb[random(0,dataContainer.verb.length-1)];
		var things = dataContainer.things[random(0,dataContainer.things.length-1)];
		
		var displayText = greeting +'the '+ people + 'use this wonderful'+' '+verb +' '+things +'.';

		container.innerHTML = displayText;

	};


	var init = function(){
		getJSON('data/wtf.json',done,fail);
	};

	return{
		init:init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init());

var random = function(min,max){
	return Math.floor(Math.random()*max)+min;
};
