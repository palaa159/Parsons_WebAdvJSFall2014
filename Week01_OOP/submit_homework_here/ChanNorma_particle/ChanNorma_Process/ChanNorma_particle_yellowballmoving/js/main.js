console.log('main.js loaded');

//draw a circle 
/*
ctx.beginPath();
ctx.arc(75, 75, 10, 0, Math.PI*2, true);
ctx.fillStyle = "rgba(255, 255, 0, .5)";
ctx.closePath();
ctx.fill();*/

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var ctx;
 
function init() {
  ctx = canvas.getContext('2d');
  return setInterval(draw, 10);
}
 
function draw() {
  ctx.clearRect(0,0,600,600);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2, true);
  ctx.fillStyle = "rgba(255, 255, 0, .5)";
  ctx.closePath();
  ctx.fill();
  x += dx;
  y += dy;
}
 
init();