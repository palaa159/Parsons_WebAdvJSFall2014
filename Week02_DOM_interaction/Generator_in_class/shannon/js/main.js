/* Your code starts here */

/*

    TODO
    1. create DOM elems that will display the data
    2. access a json file, read it, extract it
    and save it as an object inside a variable
    3. iterate through that variable, concatenate
    and display it.

*/

var app = app || {}; // it's empty by default

// $('#container')

var container = document.getElementById('container');

// container.innerHTML = 'Hello World';

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

