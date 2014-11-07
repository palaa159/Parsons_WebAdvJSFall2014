// Created Aug 27, 2014 by Apon Palanuwech
console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// or in jQuery -> var myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');
var w=window.innerWidth;
	h=window.innerHeight;
myCanvas.width=window.innerWidth;
myCanvas.height=window.innerHeight;
// Create an constructor for our Particles!
var Particle = function(_x, _y, _size, _color) {
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;
	this.decay=random(0.988,0.999);

	this.velX=random(-1,1);
	this.velY=random(-1,1);
	this.update=function(){
		this.x+=this.velX;
		this.y+=this.velY;
		this.size=this.size*this.decay;
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
	return ((Math.random()*(max-min) )+ min);
};



var setUp=function(){

};

var remove=function(p){
	var theP=particleArray.indexOf(p);
	if (theP > -1) {
		particleArray.slice(theP);
	}
};

var draw=function(){
	ctx.clearRect(0,0,w,h);
	for(var i=0;i<particleArray.length;i++){


		particleArray[i].update();
		particleArray[i].render();

		if(particleArray[i].size<0.01){
			remove(particleArray[i]);
		}
	}
};


setUp();
var fps=60;
setInterval(draw,100/fps);

// Instantiate 100 Particles using for loop and method chaining.
// Notice we are able to put .render() right after we create new Particle



// myCanvas.addEventListner('click',function(){
// 	for(var i=0;i<particleArray.length;i++){
// 		particleArray[i].velY+=1;
// 	}
// });
var mouse={
	x:0,
	y:0
};

myCanvas.addEventListener('mousemove',function(e){
mouse.x=e.pageX;
mouse.y=e.pageY;

	for(var i = 0; i < 50; i++) {
		var x = w/2;
		var y = h/2;
		// random rgb color
		var r = Math.floor( random(0, 256));
		var g = Math.floor( random(0, 256));
		var b = Math.floor( random(0, 256));
		particleArray.push(new Particle(mouse.x, mouse.y, 20, 'rgba(' + r + ',' + g + ',' + b + ',1)').render());
	}

});


















