/* Your code starts here */
var app = app || {};
app.main = (function() {
    var init = function() {
     // app starts running here
/*  pull out */
    $('.icon-menu').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "150px"
    }, 500);
  });

  /*  push back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-150px"
    }, 500);

    $('body').animate({
      left: "0px"
    }, 300);
  });



 var greeting = function(){

      console.log('Hello');
   };

   $('button')
   .off('click')
   .on('click', greeting);

  

  localStorage.setItem('user-name', 'sophie');
  console.log(localStorage.getItem('user-name'));

    };

   return {
        init: init
    };
})();



$(document).ready(app.main.init);