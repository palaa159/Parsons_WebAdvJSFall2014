/*
** Define some global vars 
*/
var ip = window.location.href;
var ipurl = ip.slice(0, (ip.lastIndexOf('/')));
// var ipurl = "http://grmmph.com";
var socket = io.connect(ipurl);
var login, note, ani = {}, assets = [], scaleAnimal;
var playerNum=0;
var p1Uid,p2Uid;
var p1Name, p2Name;


/*
** Here we go 
*/
var PPhone = {
  init: function () {
    PPhone.isMobile();
  },
  
  /*
  ** Mobile detection 
  */
  isMobile: function () {
    if($('#ismobile').css('opacity') != 0) {
      window.location.replace("mobile.html");
    }



    assets.push('sounds/keyboard/1.mp3');
    assets.push('sounds/keyboard/2.mp3');
    

    for(var j=0; j<assets.length; j++) {
      load(assets[j])
      if(j==assets.length-1) {
        PPhone.login();
      };
    };

    function load(s) {
      $.ajax({
        url: s
      });
    };
  },

  login: function () {
    socket.on('s-msg', function (a) {
    });
    login = {};

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    
    if(typeof localStorage.sid === 'undefined') {
      login.sid = makeid();
      localStorage.sid = login.sid;
    } else {
      login.sid = localStorage.sid;
    };

    login.isMobile = false;

    socket.emit('login', login);
    PPhone.makeqr();
  },

  /*
  ** Generate QR Code 
  */
  makeqr: function () {
    var PPAddress = ipurl + "/pingphone/mobile.html?" + login.sid;

    var qrcodebig = new QRCode(document.getElementById("qrcode"), {
      text: PPAddress,
      width: 256,
      height: 256,
      colorDark : "#C06060",
      colorLight : "white",
    });

    $('#ip-address').html("Scan the code above with your phone's QR code scanner. <br>Or instead, go to <b class='code'>"+ipurl+"/pingphone</b><br> on your mobile browser and type: <b class='code'>" + login.sid+'</b> at the code box.')

    function getAddress() {
      if(ipurl.search("http://") >= 0) {
        return ipurl.slice(7, ipurl.length)
      } else {
        return ipurl
      }
    }

  },

  /*
  ** Calls when we have two players loged in
  */

  startGame: function(p){
    p2Uid=p.uid;
    $('#splash').fadeOut('fast');
    $('#stage').append("<div id='container' style='position:absolute; top:0px; left:0px; background-color: grey; width:100%; height:100vh; '></div><div id='scoreboard' style='position:absolute; top:0px; left:0px; width:100% '><h1 id='p1score'style='text-align:left';>P1:0</h1><h1 id='p2score' style='margin-top:40vh; text-align:left' >P2:0</h1></div>");
    PingPhone.mainGame.setup();

  },


  endGame: function () {
    $(".container").fadeOut(500, function (){
      $(this).remove(); 
    });
    $(".scoreboard").fadeOut(500, function (){
      $(this).remove(); 
    });
    setTimeout(function (){
      
        $('#splash').fadeIn('fast');

    },7000);
  },


}; 



socket.on('new-player',function (player) {
     playerNum++;
     if(playerNum===1){
        setTimeout(function() {
          p1Uid=player.uid;
        },500);

     }
     else if(playerNum===2){

      setTimeout(function() {
        PPhone.startGame(player);
      },500);
    }
});



socket.on('dis-player',function (player) {
  PPhone.endGame();
});


$(window).load(function () {
  PPhone.init();
});
