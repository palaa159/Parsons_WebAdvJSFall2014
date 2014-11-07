/* Your code starts here */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var r = 25;
var num = 50;
//create a full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//fill the canvas with gradient
var grd = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);
grd.addColorStop(0, '#FC5B3F');
grd.addColorStop(1, '#FCB03C');


//draw a ball with glow
var x=100, y=100;

var particles=[];

for(var i=0;i<num;i++){

particles.push(new createParticle()); 

}

function createParticle(){
this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.r=Math.random()*20+5;


this.vx = Math.random()*20-10;
this.vy = Math.random()*20-10;

}

function draw(){
//put background inside draw() can help to remove trail
ctx.fillStyle = grd;
ctx.fillRect(0,0,canvas.width, canvas.height);

for(var j=0;j<num;j++){

var p=particles[j];

ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
ctx.shadowColor = 'white';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
ctx.fillStyle = 'white';
ctx.fill();

p.x+=p.vx;
p.y+=p.vy;

//prevent they go out of the canvas
if(p.x<-50)p.x = canvas.width+50;
if(p.y<-50)p.y = canvas.height+50;
if(p.x>canvas.width+50)p.x = -50;
if(p.y>canvas.height+50)p.y = -50;

}

  }


setInterval(draw,33);










