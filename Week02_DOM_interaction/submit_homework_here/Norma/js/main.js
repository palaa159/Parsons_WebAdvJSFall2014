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
        potato: document.querySelector('.potato'),
        cheese: document.querySelector('.cheese'),
        gravy: document.querySelector('.gravy'),
        descript: document.querySelector('.descript'),
        topping: document.querySelector('.topping')
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
        var cheese, potato, gravy, descript, topping, message;
        message = data.message[random(data.message.length, 0)];
        cheese = data.cheese[random(data.cheese.length, 0)];
        gravy = data.gravy[random(data.gravy.length, 0)];
        potato = data.potato[random(data.potato.length, 0)];
        descript = data.descript[random(data.descript.length, 0)];
        topping = data.topping[random(data.topping.length, 0)];

        // render
        elem.message.innerHTML = message;
        elem.potato.innerHTML = potato;
        elem.gravy.innerHTML = gravy;
        elem.cheese.innerHTML = cheese;
        elem.descript.innerHTML = descript;
        elem.topping.innerHTML = topping;
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