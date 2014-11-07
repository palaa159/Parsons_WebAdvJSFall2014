console.log('main.js loaded');

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };
})();

window.onload = function() {
    init();
    loop();
};

/* declar vaulables here*/
var myCanvas, context;

/* basic setup*/
function init() {
	myCanvas = document.getElementById('myCanvas');
	context = myCanvas.getContext('2d');
}

function loop() {
    requestAnimFrame(loop);
    // update();
    draw();
}

var particles = function(x, y, size, color){
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	// this.vx = 0;
	this.vy = 1;
	this.speed = 1.5;
	
	this.render = function(){
		context.fillStyle = this.color;
		context.fillRect(this.x,this.y,this.size,this.size);
	};

	this.bouncing = function(){
		gravity = 0.1;
		bounce = 0.5;
		this.y += this.vy;
		this.vy += gravity;
		if (this.y + this.size > myCanvas.height) {
			this.y = myCanvas.height - this.size;
			this.vy *= -bounce;
		}
	};

};
var random = function(min, max) {
	return Math.floor((Math.random()*max) + min);
};

var particleArray = [];

// var r, g, b, randomColor;
// r = random(0, 255);
// g = random(0, 255);
// b = random(0, 255);
// randomColor = 'rgb(' + r + ',' + g + ',' + b + ')';

for (var i = 0; i < 100; i++){
	particleArray.push(new particles(random(100, 1200), random(0, 800), random(5, 60), 'rgba(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ',' + random(0.5, 1.0) +')'));
	}

/* draw something here*/
var draw = function(){
// draw a background
context.clearRect(0,0,myCanvas.width, myCanvas.height);
// context.fillStyle = "black";
// context.fillRect(0,0,myCanvas.width, myCanvas.height);

for (var i = 0; i < particleArray.length; i++) {
        particleArray[i].render();
        particleArray[i].bouncing();
    }
};


// draw();
// setInterval(draw,30);

//debugging
var d = function(msg){
	console.log(msg);
};


document.getElementById('myCanvas').addEventListener("click", function(){
	d("finish");
	window.location.reload();
});






