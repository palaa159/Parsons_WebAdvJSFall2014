console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// jQuery -> wat myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');

var w =window.innerWidth,
	h = window.innerHeight;

	myCanvas.width = w;
	myCanvas.height = h;


// Creating a particle object
var Particle = function(x, y, size, color) {
	this.x = x || random(-100,2000);
	this.y = y || random(-100,2000);
	this.size = size || 4;
	this.color = color || 'rgba(' + r + ',' + g + ',' + b + ',0.3)';

	var r = random(0, 170);
	var g = random(0, 50);
	var b = random(0, 250);
	//this.bgcolor = bgcolor || "hsla(" +parseInt(Math.random()*360,10)+ ",100%,50%, 0.2)";
	this.vx = randomFloat(-1, 1);
    this.vy = randomFloat(-1, 1);
    this.gravity = randomFloat(0.9988, 0.99);

    this.update = function() {

		this.size *= this.gravity;
		this.x += this.vx;
		this.y += this.vy;

		this.vx += 0.001;
		this.vy += 0.001;

	};

	// a function to render to screen
	this.render = function() {

		ctx.fillStyle = this.color;
        ctx.beginPath();
        // pos, pos, size, 0 = the whole circle, make the arc complete,
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
        // always return this after finish writing a function
		// so that you can chain the method over and over.
        return this;
      };

      //removing this particle

	this.remove = function() { // remove from the canvas
		var index = particleArray.indexOf(this);
	};

	return this;

	};

// Create an empty array that will store our Particle
var particleArray = [];
// create a function that gives us a random integer between min-max input
var random = function(min, max) {
	//random the range from 0 to max
	//~~ is the same thing as Math.
	return ~~((Math.random()*max) + min);
};

var randomFloat = function(min, max){
	return Math.random() * (max - min) +min;
}; 

var setup = function() {

for(var i = 0; i< 500; i++) {
	particleArray[i] = new Particle();
	// var x = w/2;
	// var y = h/2;
	// // random rgb color
	// var r = random(0, 170);
	// var g = random(0, 50);
	// var b = random(0, 250);
	// particleArray.push(new Particle(x, y, 3, 'rgba(' + r + ',' + g + ',' + b + ',0.3)').render());
}
};


var draw = function() {
		
		ctx.clearRect(0 ,0, w,h);
		ctx.fillStyle = 'rgb(5, 155, 255)';
		ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);					
		ctx.globalCompositeOperation = "source-over";
		ctx.globalCompositeOperation = "lighter";

		for(var i = 0; i < particleArray.length; i++) {

			particleArray[i].update();
			particleArray[i].render();
		}

	// 	if(particleArray[i].size < 1) {
	// 	//remove particles
	// 	particleArray[i].remove();

	// }

	
};

setup();

var fps = 30;
setInterval(draw, 1000/fps);

var mouse = {};

myCanvas.addEventListener('mousemove', function(e){
	//console.log('x:' + e.pageX, ' y:' + e.pageY);
	 mouse.x = e.pageX;
	 mouse.y = e.pageY;

	 if(particleArray.length < 1000){
	 	
		var x = mouse.x;
		var y = mouse.y;
		// random rgb color
		var r = random(0, 170);
		var g = random(0, 50);
		var b = random(0, 250);
		particleArray.push(new Particle(x, y, randomFloat(10,30), 'rgba(' + r + ',' + g + ',' + b + ',0.3)').render());
	 }

	 });


// myCanvas.addEventListener('click', function(e){
// 	//console.log('x:' + e.pageX, ' y:' + e.pageY);
// 	 mouse.x = e.pageX;
// 	 mouse.y = e.pageY;

// 	 if(particleArray.length < 1000){
	 	
// 		var x = randomFloat(-1, 1);
// 		var y = randomFloat(-1, 1);
// 		// random rgb color
// 		var r = random(0, 170);
// 		var g = random(0, 50);
// 		var b = random(0, 250);
// 		particleArray.push(new Particle(x, y, randomFloat(10,30), 'rgba(' + r + ',' + g + ',' + b + ',0.3)').render());
// 	 }

// });

