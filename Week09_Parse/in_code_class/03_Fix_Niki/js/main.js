/* Your code starts here */

var app = app || {};

app.main = (function() {
    var thisIsAContainerForMyApp = [];

    var init = function() {
        // app starts running here

        // initiate lcoalStorage
        // if localStorage is empty
        // I want to create a blank object named data
        if (localStorage['data'] === undefined) {
            localStorage['data'] = '[]';
            console.log('I just created blank array');
        } else {
            console.log('Hooray data array is already here');
        }

        ////////////////////////////////////////////

        thisIsAContainerForMyApp = JSON.parse(localStorage['data']);
        console.log(thisIsAContainerForMyApp);

        // console.log(quote);
        var allQuotes = quote;
        var n = Math.floor(Math.random() * allQuotes.length);
        var randomOne = allQuotes[n];
        // console.log(randomOne);
        // store randomOne
        var dataToStore = {
            image: 'adsgasdh',
            quote: randomOne,
            fav: true
        };

        thisIsAContainerForMyApp.unshift(dataToStore);
        // console.log(thisIsAContainerForMyApp);
        localStorage['data'] = JSON.stringify(thisIsAContainerForMyApp);
    };

    return {
        init: init
    };
})();

app.main.init();