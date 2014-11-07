console.log('main.js loaded');

var myCanvas = document.getElementById ('myCanvas');
//or in jquery -> var mycanvas = $('#myCanvas');

var ctx = myCanvas.getContext('2d');

//create a simple rectangle

// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(100, 100, 100, 100);

var Particle = function (x, y, size, color) {
	this.x= x;
	this.y=y;
	this.size = size;
	this.color = color;
	this.render = function() {
		ctx.fillStyle = this.color;
		ctx. fillRect(this.x, this.y, this.size, this.size);

	};
};

var firstParticle = new Particle(100, 100, 30, 'green');
firstParticle.render();

var secondParticle = new Particle (500, 250, 50, 'rgba(240, 10, 135,1)');
secondParticle.render();

var particleArray = [];


var random = function( min, max) {
	return ~~((Math.random()*max) + min);
};

for(var i =0; i <100; i++) {
	particleArray.push(new Particle(random(0,500), random(0,500), 10, 'red').render());
}







