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


 var display = function(){
   // (Greetings!), Im making a drink with liquor and mixer and garnish
    var message = dataContainer.message[random(0, dataContainer.message.length-1)];
    var liquor = dataContainer.liquor[random(0, dataContainer.liquor.length-1)];
    var mixer = dataContainer.mixer[random(0, dataContainer.mixer.length-1)];
    var garnish = dataContainer.garnish[random(0, dataContainer.garnish.length-1)];

   var displayText = message + ' ' + liquor + ' with ' + mixer + ' and ' + garnish;
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


