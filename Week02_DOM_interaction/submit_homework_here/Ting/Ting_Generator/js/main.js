/* Your code starts here */

/*
TODO
1. create DOM elems that will display the data
2. create a json file, read it, extract it and save it as an object inside a variable
3. iterate throught that variable, concatenate and display it.
*/
var app = app || {}; //it is empty bu default

app.main = (function() {
// $('#container')

    var container = document.getElementById('container');

// container.innerText = 'Hello World';
// container.innerHTML = 'Hello World';

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
	var greeting = dataContainer.people[random(0,dataContainer.people.length-1)];
    var event01 = dataContainer.event01[random(0,dataContainer.event01.length-1)];
    var location02 = dataContainer.location02[random(0,dataContainer.location02.length-1)];
    var time03 = dataContainer.time03[random(0,dataContainer.time03.length-1)];
        
    var displayText = greeting + ' ' + event01 + ' ' + location02 + ' ' + time03;

    container.innerHTML = displayText;
};

var init = function() {
    //calling our ajax call
getJSON('data/wtf.json', done, fail);
};
return {
	init: init
};

})();

window.addEventListener('DOMContentLoaded', app.main.init());

    var random = function(min, max) {
        return Math.floor(Math.random() * max) + min;
    };




