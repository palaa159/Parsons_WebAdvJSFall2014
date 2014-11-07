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

 app.main = (function() {
     var container = document.getElementById('container');

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
     var done = function(data) {
         console.log(data);
         dataContainer = data;
         display();
     };

     var fail = function(err) {
         console.log(err);
     };

     var display = function() {
         // 
         // (Greetings!), my thesis is (medium) for (user) who (has a problem)
         var greeting = dataContainer.message[random(0, dataContainer.message.length - 1)];
         var medium = dataContainer.medium[random(0, dataContainer.medium.length - 1)];
         var user = dataContainer.user[random(0, dataContainer.user.length - 1)];
         var problem = dataContainer.problem[random(0, dataContainer.problem.length - 1)];


         var displayText = greeting + ' my thesis is ' + medium + ' for ' + user + ' who ' + problem;

         container.innerHTML = displayText;
     };

     var init = function() {
         // Calling our ajax call
         getJSON('data/wtf.json', done, fail);
     };

     return {
         init: init
     };

 })();

 // app.main.init();
 window.addEventListener('DOMContentLoaded', app.main.init());

 // $(document).ready(function() {

 // });

 var random = function(min, max) {
     return Math.floor(Math.random() * max) + min;
 };