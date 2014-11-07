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
         var people = dataContainer.people[random(0, dataContainer.people.length - 1)];
         var doaction = dataContainer.doaction[random(0, dataContainer.doaction.length - 1)];
         var inlocation = dataContainer.inlocation[random(0, dataContainer.inlocation.length - 1)];
         var intimes = dataContainer.intimes[random(0, dataContainer.intimes.length - 1)];


         var displayText = "<font color=\"#9CFFD4\">" + people + "</font>" + '   ' + "<font color=\"#FFA7EF\">"  + doaction + "</font>" + '   ' + "<font color=\"#8DDCE8\">" + inlocation + "</font>" + '   ' + "<font color=\"#FFFCAF\">" + intimes + "</font>" + '.';

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