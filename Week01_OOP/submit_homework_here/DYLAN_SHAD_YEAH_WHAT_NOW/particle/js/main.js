console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// or in jQuery -> var myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');

var Snake = function() {

	this.easing = 0.23;
	this.easing1 = 0.0575;
	this.size = 20;

	this.xPos = [];
	this.yPos = [];
	this.targetX = 250;
	this.targetY = 250;

	this.speed = 30;

	for(var i = 0; i < 20; i++) {
		this.xPos.push(250);
		this.yPos.push(250);
	}

	this.update = function() {
		// move the snake
		// starting with targetXY and the head
		this.targetX += this.speed * (Math.random(1) - 0.5);
 		this.targetY += this.speed * (Math.random(1) - 0.5);

		this.xPos[0] += (this.targetX - this.xPos[0]) * this.easing1;
		this.yPos[0] += (this.targetY - this.yPos[0]) * this.easing1;
		// this.yPos[0] += 10;
		//and then moving on to the tail
		for(var i = 19; i > 0; i--) {
			this.xPos[i] += (this.xPos[i-1] - this.xPos[i]) * this.easing;
			this.yPos[i] += (this.yPos[i-1] - this.yPos[i]) * this.easing;
		}
	};

	this.draw = function() {
		ctx.fillStyle = "lime";
		for(var i = 0; i < 20; i++) {
			ctx.beginPath();
			ctx.arc(this.xPos[i],this.yPos[i],this.size*(1-(0.04*i)),0*Math.PI,2*Math.PI);
			ctx.closePath();
			ctx.fill();
		}

	};
};

var snakeArray = [];
for(var i = 0; i < 10; i++) {
	snakeArray.push(new Snake());
}

function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,500, 500);

	for(var i = 0; i < snakeArray.length; i++) {
		snakeArray[i].update();
		snakeArray[i].draw();
	}

}

setInterval(draw, 33);


