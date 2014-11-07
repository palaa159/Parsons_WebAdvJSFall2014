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
        drink: document.querySelector('.drink'),
        status: document.querySelector('.status'),
        alcohol: document.querySelector('.alcohol')
    };

    /**
     * success and error are two callback functions.
     * About callback functions in Javascript: http://recurial.com/programming/understanding-callback-functions-in-javascript/
     */
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
        getJSON('data/LaCoctelera.json',
            // success
            render,
            // error
            function(status) {
                console.log('error', status);
            });
    };

    var render = function(data) {
        console.log(data);
        var drink, status, alcohol, message;
        message = data.message[random(data.message.length, 0)];
        drink = data.drink[random(data.drink.length, 0)];
        alcohol = data.alcohol[random(data.alcohol.length, 0)];
        status = data.status[random(data.status.length, 0)];

        // render
        elem.message.innerHTML = message;
        elem.drink.innerHTML = drink;
        elem.alcohol.innerHTML = alcohol;
        elem.status.innerHTML = status;
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