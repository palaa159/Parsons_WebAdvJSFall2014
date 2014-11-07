console.log('main.js loaded');

//the way you select the canvas
var myCanvas = document.getElementById('myCanvas');
//or in jQuery -> var myCanvas = $('#myCanvas');

var ctx = myCanvas.getContext('2d');

//create a rect
// ctx.fillStyle = 'red';
// ctx.fillRect(100,100,100,100);

var Particle = function(x, y, size, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.vx = 0;
	this.vy = 1;
	if (size < 20) {
        this.speed = 1.5;
    }
    else if(size < 30) {
		this.speed = 1;
    }
    else {
         this.speed = 0.5;
    }
	this.color = color;
	//ask the particle to draw itself on the canvas
	this.render = function() {
		ctx.fillStyle = this.color;
		// ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ctx.fill();
	};
	this.tick = function() {
		// this.y = this.y + 10;
		gravity = 0.2;
		bounce = 0.7;
		this.y += this.vy;
		this.vy += gravity;
		if (this.y + this.size > myCanvas.height) {
			this.y = myCanvas.height - this.size;
			this.vy *= -bounce;
		}
		// if(this.y > myCanvas.height) {
		//	this.y = -this.size;
		//	this.offset = new Number(100 * Math.random());
		// }
	};
};

// var firstParticle = new Particle(100, 100, 30, 'green');
// firstParticle.render();
// var secondParticle = new Particle(300, 250, 50, 'rgba(240, 10, 135, 1)');
// secondParticle.render();

var particleArray = [];

var random = function(min, max) {
	//randomize the range from 0 to the max
	//~~ is the same thing as Math.floor
	return ~~((Math.random()*max) + min);
};

var colors = ['#FF24DE', '#4ABAFF', '#AFE48A', '#FF9742', '#00FFFF'];
ctx.globalAlpha = 0.3;

for(var i = 0; i < 100; i++) {
	particleArray.push(new Particle(random(0,500), random(0,500), 10, colors[Math.floor(colors.length * Math.random())]));
}


//draws once per Bit
function reDraw() {
	//first thing they do is clearing the canvas (context.clearRect)
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (var i = 0; i < particleArray.length; i++) {
        particleArray[i].render();
        particleArray[i].tick();
    }
}



setInterval(reDraw, 50);


