//adapted and learnt from http://thecodeplayer.com/walkthrough/make-a-particle-system-in-html5-canvas
//more interesting and useful website: http://bost.ocks.org/mike/

//Initializing the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = 1000; var H = 1000;

//array of particles
var particles = [];
for(var i = 0; i < 2000; i++)
{
//this will add 50 particles to array ... 2000 in this case
	particles.push(new myParticle());
}
//create function to help create particles
function myParticle()
{
	//Random position
	this.x = Math.random()*W;
	this.y = Math.random()*H;

	//add random velocity
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
}

var x = 100; var y = 100;

//anime particle
function draw()
{
//moving BG paint code inside draw() help remove trail
//cavas bg black
ctx.fillStyle = "black";
ctx.fillRect(0,0,W,H);

//draw a particles from array**
	for(var t = 0; t < particles.length; t++)
	{
		var p = particles[t];
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(p.x, p.y, Math.random(), Math.PI*2, false);
  ctx.fill();

  p.x += p.vx;
  p.y += p.vy;

//keep ball from moving out of canvas
if(p.x < -50) p.x = W+50;
if(p.y < -50) p.y = H+50;
if(p.x > W+50) p.x = -50;
if(p.y > H+50) p.y = -50;
	
	}
}

setInterval(draw, 33);