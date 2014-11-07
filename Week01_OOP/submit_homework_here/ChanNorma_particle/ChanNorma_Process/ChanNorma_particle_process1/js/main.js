//adapted and learnt from http://thecodeplayer.com/walkthrough/make-a-particle-system-in-html5-canvas

//Initializing the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = 500; var H = 500;

//cavas bg black
ctx.fillStyle = "black";
ctx.fillRect(0,0,W,H);

var x = 100; var y = 100;

//anime particle
function draw()
{

//draw a make-a-particle-system-in-html5-canvas
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x, y, 40, Math.PI*2, false);
  ctx.fill();

  x++;
  y++;
}

setInterval(draw, 33);