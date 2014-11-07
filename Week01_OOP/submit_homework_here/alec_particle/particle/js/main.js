console.log("main.js loaded");

var canvas = document.getElementById("myCanvas");


var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height= window.innerHeight;


// create a simple rect
//ctx.fillStyle = "rgba( 255, 0, 0, .5)";
//ctx.fillRect(50, 50, 100, 100);

var Particle = function(x, y, size, color, down) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.down = down;
	this.render = function(){
		ctx.fillStyle = this.color;
		if (this.down==false){
			ctx.fillRect(this.x, this.y, this.size, this.size);
		}
		if (this.down==true){
			this.y += 10;
			ctx.fillRect(this.x, this.y, this.size, this.size);
			// var getEmDown = setInterval(function(){pushSquaresDown()}, 1000/60);
			// function pushSquaresDown(){
			// 	ctx.fillRect(this.x, this.y + 20, this.size, this.size);
			// 	console.log(this.y);
			// }

		}
		console.log(this.down);
	};

};

function clearRect(){
	var ctx = canvas.getContext('2d');
        ctx.fillStyle="rgba(253,245,232, .15)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
}

var particleArray = [];

// ~~ means Math.floor()

var random = function(min, max) {
	return ~~((Math.random()*max) + min);
};


function getMousePos(canvas, evt){
	var rect = canvas.getBoundingClientRect();
	return{
		x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
	};
}

function startDrop(){
	setInterval(function() {
		for (var i=0; i<10; i++){
			particleArray.push(new Particle(mousePos.x + random(0,250) - random(0,250), mousePos.y + random(0,250) - random(0,250), i, "rgb(60,60,60)", true).render());
		}
	}, 1000/60);
}

  canvas.addEventListener('mousemove', function(evt) { 
        var mousePos = getMousePos(canvas, evt);
        clearRect();
		for(var i=0; i<10; i++){
			particleArray.push(new Particle(mousePos.x + random(0,250) - random(0,250), mousePos.y + random(0,250) - random(0,250), i, "rgb(60,60,60)", false).render());
	}
 }, false);

  canvas.addEventListener('click', function(evt){
  	var mousePos = getMousePos(canvas, evt);
  		for (var i=0; i<10; i++){
  			particleArray.push(new Particle(mousePos.x + random(0,250) - random(0,250), mousePos.y + random(0,250) - random(0,250), i, "rgb(60,60,60)", true).render());
  		}
  	}, false);










