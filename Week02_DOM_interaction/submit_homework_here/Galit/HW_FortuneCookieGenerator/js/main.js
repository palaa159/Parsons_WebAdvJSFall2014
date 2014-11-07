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
        noun: document.querySelector('.noun'),
        adjective: document.querySelector('.adjective'),
        AbstractNoun: document.querySelector('.AbstractNoun'),
        bkgColor: document.querySelector('.bkgColor')
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
        getJSON('data/fortune.json',
            // success
            render,
            // error
            function(status) {
                console.log('error', status);
            });
    };

    var render = function(data) {
        console.log(data);
        var adjective, noun, AbstractNoun, color;
        noun = data.noun[random(data.noun.length, 0)];
        adjective = data.adjective[random(data.adjective.length, 0)];
        AbstractNoun= data.AbstractNoun[random(data.AbstractNoun.length, 0)];
        bkgColor=data.bkgColor[random(data.bkgColor.length,0)];

        document.body.style.backgroundColor=bkgColor;
        // render
        elem.noun.innerHTML = noun;
        // elem.medium.innerHTML = adjective;
        elem.adjective.innerHTML = adjective;
        // elem.user.innerHTML = AbstractNoun;
        elem.AbstractNoun.innerHTML = AbstractNoun;
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