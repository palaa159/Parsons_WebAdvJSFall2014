// Always do npm init

// Let's do some saving, then some twitter

var fs = require('fs'); // http://nodejs.org/api/fs.html
var http = require('http'); // http://nodejs.org/api/http.html
var https = require('https')
var util = require('util');

var app = app || {};

app.main = (function() {
    var init = function() {
        // util.log('hello');
        getData('http://graph.facebook.com/517267862/?fields=picture&type=large');
    };

    var getData = function(url) {
        http.get(url, function(res) {
            // console.log(res.statusCode);
            res.setEncoding('binary');
            res.on('data', function(data) {
                var asJSON = JSON.parse(data);
                var realUrl = asJSON.picture.data.url;
                // console.log(realUrl);
                loadImg(realUrl);
                // console.log(asJSON.picture.data.url);
                // save
            });
        });
    };

    var loadImg = function(url) {
        console.log(url);
        var imageData;
        https.get(url, function(res) {
            res.setEncoding('binary');
            res.on('data', function(chunk) {
                // console.log(chunk);
                imageData += chunk;
            });
            res.on('end', function() {
                // remove undefined
                imageData.replace(undefined, '');
                console.log(imageData);
                fs.writeFile('test.jpg', imageData, function() {
                    console.log('saved');
                });
            });
        });
    };

    return {
        // begin: init
        init: init
    };
})();

app.main.init();