
console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');

var ctx=  myCanvas.getContext('2d');

//create a simple rect
// ctx.fillStyle = 'red';
// ctx.fillStyle = 'rgba(255,0,0,1)';
// ctx.fillRect(100, 100, 100, 100);

var Particle = function(x, y, size, color) {
	this.x = x;
	this.y =y;
	this.size = size;
	this.color = color;
	this.render = function (){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);

	};
};

var firstParticle = new Particle(100, 100,  30, 'green');
firstParticle.render();
var secondParticle = new Particle(200, 100, 50, 'blue');
secondParticle.render();

var particleArray = [];

for (var i = 0; i < 100; i++) {
	particleArray.push( new Particle(i, i, i, 'red').render());
}

var random = function(min, max){
	return ~~((Math.random()*max) + min);
};

for (var i =0; i <100; i++) {
	particleArray.push(new Particle(random(0,500), random(0,500),10, 'green').render());

}
