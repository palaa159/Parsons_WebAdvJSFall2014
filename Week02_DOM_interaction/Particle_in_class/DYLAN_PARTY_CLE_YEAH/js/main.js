// Created Aug 27, 2014 by Apon Palanuwech
console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// or in jQuery -> var myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');
var w = window.innerWidth,
	h = window.innerHeight;

myCanvas.width = w;
myCanvas.height = h;

// Create an constructor for our Particles!
var Particle = function(_x, _y, _size, _color) {
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;

	// we need a force in order to move a particle
	this.velX = randomFloat(-1, 1);
	this.velY = randomFloat(-1, 1);
	this.decay = randomFloat(0.9888, 0.99);

	//remove this particle
	this.remove = function() {
		var thatParticle = particleArray.indexOf(this);
		particleArray.splice(thatParticle, 1);
	};

	this.update = function() {
		this.size *= this.decay;
		this.x += this.velX;
		this.y += this.velY;

		this.velX *= 0.999;
		this.velY *= 0.999;
	};


	// a function to render to screen
	this.render = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);

		// always return this after finish writing a function
		// so that you can chain the method over and over.
		return this;
	};
	return this;
};

// Instantiating Particle with "new Particle"
// var firstParticle = new Particle(100, 100, 30, 'green');
// firstParticle.render();

// var secondParticle = new Particle(400, 250, 50, 'rgba(240, 10, 135, 1)');
// secondParticle.render();

// when we instantiate "Particle", "this" refers to that Particle so each Particles have
// its own property value we defined.
// That's why we can differentiate 

// Create an empty array that will store our Particle
var particleArray = [];
// create a function that gives us a random integer between min-max input
var random = function(min, max) {
	return Math.floor(Math.random()*max) + min;
};

var randomFloat = function(min, max) {
	return Math.random() * (max - min) + min;
};


var setup = function() {
		// Instantiate 100 Particles using for loop and method chaining.
	// Notice we are able to put .render() right after we create new Particle
	for(var i = 0; i < 100; i++) {
		var x = w/2;
		var y = h/2;
		// random rgb color
		var r = random(0, 256);
		var g = random(0, 256);
		var b = random(0, 256);
		particleArray.push(new Particle(x, y, 20, 'rgba(' + r + ',' + g + ',' + b + ',1)').render());
	}
};

var draw = function() {
	ctx.clearRect(0, 0, w, h); // clear the screen
	// console.log('It is looping!');

	for (var i = 0; i < particleArray.length; i++){
		particleArray[i].update();
		particleArray[i].render();

		if(particleArray[i].size < 1) {
			particleArray[i].remove();
		}
	}
};

// call setup function
setup();
// loop draw function
var fps = 60;
setInterval(draw, 1000/fps);

// // Whenver I click, you fall
// myCanvas.addEventListener('click', function() {
// 	console.log('I just clicked')
// 	for(var i = 0; particleArray.length; i++) {
// 		particleArray[i].velY = 10;
// 	}
// });
var mouse = {};

myCanvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;

	if(particleArray.length < 200) {
		var x = mouse.x;
		var y = mouse.y;
		// random rgb color
		var r = random(0, 256);
		var g = random(0, 256);
		var b = random(0, 256);
		particleArray.push(new Particle(x, y, 20, 'rgba(' + r + ',' + g + ',' + b + ',1)').render());
	}
});










