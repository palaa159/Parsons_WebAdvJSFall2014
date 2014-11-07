// Created Aug 31, 2014 by Yu-Chien Kao
console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');

var Particle = function(_x, _y, _size, _color) {
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;

	this.render = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
		return this;
	};

	this.update = function(){
		this.x = _x;
		this.y = _y;
		this.size = _size;
		this.color = _color;
		return this;
	};

	return this;
};

var particleArray = [];


//random positions
/*
var createParticle = function (){
	var random = function(min, max) {
		return Math.floor((Math.random()*max) + min);
	};
	for(var i = 0; i < 400; i++){
		var x = random(0, window.innerWidth);
		var y = random(0, window.innerHeight);
		var r = random(0, 256);
		var g = random(0, 256);
		var b = random(0, 256);
		var color = 'rgba(' + r + ',' + g + ',' + b + ',1)';
		particleArray.push(new Particle(x, y, 4, color).update().render());
	}
};
*/

//in grid positions
var createParticle = function (){
	var random = function(min, max) {
		return Math.floor((Math.random()*max) + min);
	};
	var gridSize=30; //to set both x & y, use grdiSizeX & gridSizeY
	
	for(var i = 0; i < 400; i++){
		var x = Math.floor(random(0, window.innerWidth)/gridSize)*gridSize; 
		var y = Math.floor(random(0, window.innerHeight)/gridSize)*gridSize; 
		var r = random(0, 256);
		var g = random(0, 256);
		var b = random(0, 256);
		var color = 'rgba(' + r + ',' + g + ',' + b + ',1)';
		particleArray.push(new Particle(x, y, 4, color).update().render());
	}
};

//FrameRate
var fps = 30;

var draw = function (){
		setTimeout(function(){

			//Animate
			requestAnimationFrame(draw);

			//Drawing
			//Add background: black
			myCanvas.width=window.innerWidth;
			myCanvas.height=window.innerHeight;
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

			//Add particles
			createParticle();

		}, 2000/fps);
};

var init= function(){
	myCanvas.width=window.innerWidth;
	myCanvas.height=window.innerHeight;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

	draw();

}();