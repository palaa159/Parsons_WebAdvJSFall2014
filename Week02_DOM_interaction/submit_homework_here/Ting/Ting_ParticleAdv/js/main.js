// Created on Sep 10, 2014 by Ting Zhao
console.log('main.js loaded');
var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
//Fullscreen
var w = window.innerWidth,
    h = window.innerHeight;

myCanvas.width = w;
myCanvas.height = h;

// Create an constructor
var Particle = function(_x, _y, _size, _color, _speed, _radius) {
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;
	this.speed = Math.random(-1, 1)*1;
	this.radius = 1+Math.random()*5;

	//move particle
	this.velX = randomFloat(-3, 3);
	this.velY = randomFloat(-3, 3);
	// this.decay = randomFloat(0.988, 0.98);

    //update rounds
	this.update = function() {
		this.x += this.velX;
		this.y += this.velY;
		this.velX *= 0.99;
		this.velY *= 0.99;
	for(var i = 0; i < particleArray.length; i++) {
		var part = particleArray[i];
		part.y += part.speed;
	}
	return this;
	};
    //render to screen
	this.render = function() {
		ctx.fillStyle = this.color;
		ctx.globalAlpha = 0.8;
		// ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		return this;
	};
	//remove rounds
	this.remove = function() {
		// particleArray.splice(particleArray.indexOf(this), 1);
		for(var i = 0; i < particleArray.length; i++) {
			var part = particleArray[i];
			if(part.y > h) {
				part.y = 0;
			}
		}
		return this;
	};
	return this;
};

//creae an array to store particles
var particleArray = [];


var random = function(min, max) {
	return Math.floor((Math.random()*max) + min);
};
var randomFloat = function(min, max) {
	return Math.random() * (max - min) + min;
};

var setup = function() {
for(var i = 0; i < particleArray.length; i++) {
	var x = w/2;
	var y = h/2;
	// random rgb color
	var r = Math.round(Math.random() * 255 | 0);
	var g = random(100, 255);
	var b = random(100, 255);
	particleArray.push(new Particle(x, y, 10, 'rgba(' + r + ',' + g + ',' + b + ',1)').render());
}
};

//run
var draw = function() {
	//refresh background
	ctx.clearRect(0, 0, w, h);
	for(var i = 0; particleArray.length; i++) {
		particleArray[i].render();
		particleArray[i].update();
		particleArray[i].remove();
	}
};
var fps = 60;
setInterval(draw, 30 / fps);

var mouse = {};

myCanvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;

		var x = mouse.x;
		var y = mouse.y;
		var r = Math.round(Math.random() * 255 | 0);
		var g = random(100, 255);
		var b = random(100, 255);
		particleArray.push(new Particle(x, y, 10, 'rgba(' + r + ',' +g + ',' +b +',1)').render());

});

myCanvas.addEventListener('click', function() {
	ctx.clearRect(0, 0, w, h);
	for(var i = 0; i < particleArray.length; i++) {
		particleArray[i].radius = 0;
	}
});






