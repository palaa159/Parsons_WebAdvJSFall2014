/* Your code starts here */

/* TODO
	1. load an external json file using XMLHttpRequest (xhr)
	2. extract and parse the data into DOM (html document)
	3. Add some nice css effects
	4. no jQuery 
*/
// create our app scope
// we don't want to pollute global namespace
var app = app || {};

app.main = (function() {
    //
    console.log('app is running');
    var elem = {
        container: document.getElementById('container'),
        message: document.querySelector('.msg'),
        medium: document.querySelector('.medium'),
        user: document.querySelector('.user'),
        problem: document.querySelector('.problem')
    };

    var getJSON = function(url, success, error) {
        console.log('loading JSON');
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

    var init = function() {
        console.log('DOM loaded');
        // load json
        getJSON('data/wtf.json',
            // success
            render,
            // error
            function(status) {
                console.log('error', status);
            });
    };

    var render = function(data) {
        console.log(data);
        var user, medium, problem, message;
        message = data.message[random(data.message.length, 0)];
        user = data.user[random(data.user.length, 0)];
        problem = data.problem[random(data.problem.length, 0)];
        medium = data.medium[random(data.medium.length, 0)];

        // render
        elem.message.innerHTML = message;
        elem.medium.innerHTML = medium;
        elem.problem.innerHTML = problem;
        elem.user.innerHTML = user;
    };

    return {
        init: init
    };
})();

// when DOM finished loading run init
window.addEventListener('DOMContentLoaded', app.main.init);

// util
var random = function(max, min) {
    return~~ (Math.random() * max) + min;
};