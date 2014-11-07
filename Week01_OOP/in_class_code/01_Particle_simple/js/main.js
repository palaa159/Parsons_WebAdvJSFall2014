// Created Aug 27, 2014 by Apon Palanuwech
console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// or in jQuery -> var myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');

var w = window.innerWidth,
	h = window.innerHeight;

// Create an constructor for our Particles!
var Particle = function(_x, _y, _size, _color) {
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;
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
	return Math.floor((Math.random()*max) + min);
};

// Instantiate 100 Particles using for loop and method chaining.
// Notice we are able to put .render() right after we create new Particle
for(var i = 0; i < 100; i++) {
	var x = random(0, w);
	var y = random(0, h);
	// random rgb color
	var r = random(0, 256);
	var g = random(0, 256);
	var b = random(0, 256);
	particleArray.push(new Particle(x, y, 10, 'rgba(' + r + ',' + g + ',' + b + ',1)').render());
}