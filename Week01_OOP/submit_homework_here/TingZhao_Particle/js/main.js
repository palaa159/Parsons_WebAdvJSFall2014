// Created on Sep 1, 2014 by Ting Zhao
console.log('main.js loaded');
var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
//Fullscreen
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

// Create an constructor
var Particle = function(_x, _y, _size, _color, _speed, _radius) {
	this.x = Math.random()*myCanvas.width;
	this.y = _y;
	this.size = _size;
	this.color = _color;
	this.speed = Math.random(-1, 0)*1;
	this.radius = 1+Math.random()*3;

    //update rounds
	this.update = function() {
	for(var i = 0; i < 100; i++) {
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
		for(var i = 0; i < 100; i++) {
			var part = particleArray[i];
			if(part.y > myCanvas.height) {
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
	// return Math.random() * (max - min) + min;
};


for(var i = 0; i < 100; i++) {
	var x = random(0, window.innerWidth);
	var y = random(0, window.innerHeight);
	// random rgb color
	var r = Math.round(Math.random() * 255 | 0);
	var g = random(100, 255);
	var b = random(100, 255);
	particleArray.push(new Particle(x, y, 10, 'rgba(' + r + ',' + g + ',' + b + ',1)'));
}

//run
var draw = function() {
	//refresh background
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	for(var i = 0; i < particleArray.length; i++) {
		particleArray[i].render();
		particleArray[i].update();
		particleArray[i].remove();
	}
};

setInterval(draw, 30);
