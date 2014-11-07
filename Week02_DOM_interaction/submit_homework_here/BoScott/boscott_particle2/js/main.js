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





	window.requestAnimFrame = (function () {
		return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	Math.randMinMax = function(min, max, round) {
		var val = min + (Math.random() * (max - min));
		
		if( round ) val = Math.round( val );
		
		return val;
	};
	Math.TO_RAD = Math.PI/180;
	Math.getAngle = function( x1, y1, x2, y2 ) {
		
		var	dx = x1 - x2,
			dy = y1 - y2;
		
		return Math.atan2(dy,dx);
	};
	Math.getDistance = function( x1, y1, x2, y2 ) {
		
		var 	xs = x2 - x1,
			ys = y2 - y1;		
		
		xs *= xs;
		ys *= ys;
		 
		return Math.sqrt( xs + ys );
	};

	var 	FX = {};

	(function() {
		
		var	canvas = document.getElementById('myCanvas'),
			ctx = canvas.getContext('2d'),
			lastUpdate = new Date(),
			mouseUpdate = new Date(),
			lastMouse = [],
			width, height;

		FX.particles = [];

		setFullscreen();
		document.getElementById('button').addEventListener('mousedown', buttonEffect);

		function buttonEffect() {

			var button = document.getElementById('button'),
				height = e.pageY,
				left = e.pageX-250,
				top = e.pageY-180,
				width = e.pageX,
				x, y, degree;

			for(var i=0;i<40;i=i+1) {

				if( Math.random() < 0.5 ) {

					y = Math.randMinMax(top, top+height);

					if( Math.random() < 0.5 ) {
						x = left;
						degree = Math.randMinMax(-45,45);
					} else {
						x = left + width;
						degree = Math.randMinMax(135,225);
					}
          
				} else {

					x = Math.randMinMax(left, left+width);

					if( Math.random() < 0.5 ) {
						y = top;
						degree = Math.randMinMax(45,135);
					} else {
						y = top + height;
						degree = Math.randMinMax(-135, -45);
					}
					
				}
				createParticle({
					x: x,
					y: y,
					degree: degree,
					speed: Math.randMinMax(100, 150),
					vs: Math.randMinMax(-4,-1)
				});
			}
		}
		window.setTimeout(buttonEffect, 100); 

		loop();

		window.addEventListener('resize', setFullscreen );

		function createParticle( args ) {

			var options = {
				x: e.pageX,
				y: e.pageY,
				color: 'hsla('+ Math.randMinMax(160, 290) +', 100%, 50%, '+(Math.random().toFixed(2))+')',
				degree: Math.randMinMax(0, 360),
				speed: Math.randMinMax(300, 350),
				vd: Math.randMinMax(-90,90),
				vs: Math.randMinMax(-8,-5)
			};

			for (key in args) {
			  options[key] = args[key];
			}

			FX.particles.push( options );
		}

		function loop() {

			var 	thisUpdate = new Date(),
				delta = (lastUpdate - thisUpdate) / 1000,
				amount = FX.particles.length,
				size = 2,
				i = 0,
				p;

			ctx.fillStyle = 'rgba(15,15,15,0.25)';
			ctx.fillRect(0,0,width,height);

			ctx.globalCompositeStyle = 'lighter';

			for(;i<amount;i=i+1) {

				p = FX.particles[ i ];

				p.degree += (p.vd * delta);
				p.speed += (p.vs);// * delta);
				if( p.speed < 0 ) continue;

				p.x += Math.cos(p.degree * Math.TO_RAD) * (p.speed * delta);
				p.y += Math.sin(p.degree * Math.TO_RAD) * (p.speed * delta);

				ctx.save();
			
				ctx.translate( p.x, p.y );
				ctx.rotate( p.degree * Math.TO_RAD );

				ctx.fillStyle = p.color;
				ctx.fillRect( -size, -size, size*2, size*2 );

				ctx.restore();
			}

			lastUpdate = thisUpdate;

			requestAnimFrame( loop );
		}

		function setFullscreen() {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};
	})();
});










