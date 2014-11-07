/* Your code starts here */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var r = 25;
var num = 50;
//create a full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//draw a ball with glow
var x=100, y=100;

var particles=[];

for(var i=0;i<num;i++){

particles.push(new createParticle()); 

}

function createParticle(){
this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.r=Math.random()*50+10;


this.vx = Math.random()*5;
this.vy = Math.random()*5;

}

function programFill(){
	ctx.beginPath();
	ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
}

function draw(){
//put background inside draw() can help to remove trail
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(0,0,canvas.width, canvas.height);

for(var j=0;j<num;j++){

	var p=particles[j];

	ctx.beginPath();
	ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
	//make a holly circle
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'black';
	ctx.stroke();

	p.x+=p.vx;
	p.y+=p.vy;

	//prevent they go out of the canvas
	if(p.x<-100)p.x = canvas.width+50;
	if(p.y<-100)p.y = canvas.height+50;
	if(p.x>canvas.width+50)p.x = -50;
	if(p.y>canvas.height+50)p.y = -50;
	}

  }


setInterval(draw,33);

// Whenever I click, circle be filled.
/*** NOTE
	does not work yet
	reference: 
	http://threejs.org/examples/#canvas_interactive_particles
	http://threejs.org/examples/canvas_interactive_particles.html
***/
myCanvas.addEventListener('click', function() {
	console.log('I just clicked');
	programFill();
	// ctx.fillStyle = 'black';
	// ctx.fillRect(0,0,canvas.width, canvas.height);
});








