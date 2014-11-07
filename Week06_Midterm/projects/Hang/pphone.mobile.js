/*
** Define some global vars 
*/
var ip = window.location.href;
var ipurl = ip.slice(0, (ip.lastIndexOf('/')));
// var ipurl = "http://.com"; // Toggle this for custom url
var socket = io.connect(ipurl);
var login,
    uid,
    color,
    bars = 2, 
    looping = false, 
    $feedback = $('.loop-feedback'),
    noteInfo = {},
    distortion = false,
    rotation={};


window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

/*
** Here we go 
*/
var PPhone = {
  init: function() {
    PPhone.isMobile();
  },

  /*
  ** Mobile detection 
  */
  isMobile: function () {
    if($('#ismobile').css('opacity') == 0) {
      window.location.replace("index.html");
    } else {
      PPhone.login();
    }
  }, 

  login: function() {
    login = {};
    login.isMobile = true;
    var a = ip.slice((ip.lastIndexOf('?'))+1, ip.length), b;
    if(a.search('http')>=0 || a==''){
      // Manual login
      $('#loginform').submit(function (e) {
        e.preventDefault();
      });
      $('.submit.jamid').click(function (){
        login.sid = $('.text-input.jamid').val();
        socket.emit('login', login)
        $(this).val('Just a sec...').prop('disabled', true).width(95);
      });
    } else {
      // QR based login
      login.sid = a;
      socket.emit('login', login);
      $('.submit.jamid').val('Just a sec...').prop('disabled', true).width(95);
    }

    socket.on('s-msg', function(d){
      $('.submit').on('mousedown', function(){
        $(this).addClass('active')
      }).on('mouseup', function(){
        $(this).removeClass('active')
      });

      if(d == 'login:OK') { 
        $('#login').fadeOut(500);
        $('h1').fadeOut(500);
        setTimeout(function () {PPhone.padBoard();}, 500);
        
      } else {
        $('#login').animate({'margin-top': '-=7px'},100, function (){
          $(this).animate({'margin-top': '+=7px'},100, function (){
            $(this).animate({'margin-top': '+=0px'},100)
          })
        })
        $('.invalid').fadeIn('fast')
        $('.text-input').val('')
        $('.submit.jamid').val('JAM!').prop('disabled', false).width(50);
      }
    });

    socket.on('uid', function (p) {
      uid = p.uid;
      color = p.color;
      login.uid = uid;
      rotation.uid=login.uid;

    });
    
  },

  /*
  ** Generate pads Layout and functionality
  */
  padBoard: function() {
    setTimeout(function(){window.scrollTo(0,1)},1000);

    
    $('.cmp').fadeIn(500);

    // Layout fixes for pads
    $('#pad-holder').width($('body').width());
    $('#pad-holder').height($('body').height());
    
    $(window).resize(function () {
      $('#pad-holder').width($('body').width());
      $('#pad-holder').height($('body').height());
    });

    $('#pad-holder').css("background", color);
    if(color==="rgb(40,40,200)"){
      $('#pad-holder').append("<div style='color: white; font-size:50px ;  '>P1</div>");
    }
    else if(color==="rgb(200,40,40)"){
      $('#pad-holder').append("<div style='color: white; font-size:50px ;'>P2</div>");
    }
    // Pads events


    gyro.startTracking(function(o) {
      rotation.x=o.alpha;
      rotation.y=o.beta;
      rotation.z=o.gamma;                    
      socket.emit('rotate', rotation);
    });


  },

}

$(window).load(function () {
  PPhone.init();	
  $('body').fadeIn('fast');
})

/*
** Dirty fix: When session ends, reload the page. 
*/
socket.on('session-end',function (reason) {
  setTimeout(function () {
    location.reload();
  },Math.floor((Math.random()*4)+0)+1000);

  // console.log(reason);
})


/*
** EXTRA FIXES
*/
// Disable the taphold menu on Android
function absorbEvent_(event) {
  var e = event || window.event;
  e.preventDefault && e.preventDefault();
  e.stopPropagation && e.stopPropagation();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}
function preventLongPressMenu(node) {
  node.ontouchstart = absorbEvent_;
  node.ontouchmove = absorbEvent_;
  node.ontouchend = absorbEvent_;
  node.ontouchcancel = absorbEvent_;
}