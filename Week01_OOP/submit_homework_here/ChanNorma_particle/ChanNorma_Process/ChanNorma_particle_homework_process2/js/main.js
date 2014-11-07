//adapted and learnt from http://thecodeplayer.com/walkthrough/make-a-particle-system-in-html5-canvas

//Initializing the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = 500; var H = 500;

//array of particles
var particles = [];
for(var i = 0; i < 50; i++)
{
//this will add 50 particles to array
	particles.push(new myParticle());
}
//create function to help create particles
function myParticle()
{
	//Random position
	this.x = Math.random()*W;
	this.y = Math.random()*H;
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
  ctx.arc(p.x, p.y, 40, Math.PI*2, false);
  ctx.fill();

  p.x++;
  p.y++;
	}
}

setInterval(draw, 33);