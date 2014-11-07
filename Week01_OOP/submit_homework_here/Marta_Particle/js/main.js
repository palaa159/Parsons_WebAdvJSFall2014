console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// jQuery -> wat myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');


// Creating a particle object
var Particle = function(x, y, size, color) {
	this.x = x || random(-100,2000);
	this.y = y || random(-100,2000);
	this.size = size || 4;
	this.color = color || "rgba(100%,100%,100%, 0.6)";
	//this.bgcolor = bgcolor || "hsla(" +parseInt(Math.random()*360,10)+ ",100%,50%, 0.2)";
	this.vx = Math.random() * - 3;
    this.gravity = 0.3;
    this.vy = Math.random() * 3;

	this.render = function() {

		ctx.fillStyle = this.color;
        ctx.beginPath();
        // pos, pos, size, 0 = the whole circle, make the arc complete,
        ctx.arc(this.x,this.y,this.size-1,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
        return this;
      };


    this.update = function() {

		this.x += this.vx;
		this.y += this.vy;

		this.vx += 0.001;
		this.vy += 0.001;	

 //    document.addEventListener("mousemove", function(e){

 //    	var mouseX = e.pageX;
	// 	var mouseY = e.pageY;

	// // if (mouseX < this.x){

	// // 	this.vx = -this.vx;
	// // }

	// });

	this.remove = function() { // remove from the canvas
		var index = particleArray.indexOf(this);
	};

	return this;
	};

};

//particle array and running it inside for loop
var particleArray = [];

  

var init = function() {
for(var i = 0; i< 2000; i++) {
	particleArray[i] = new Particle();
	//particleArray.push(new Particle(random(0,2000), random(0,2000), 5, 'white').render());
}
	loop();
};


var loop = function() {
	setInterval(function() {
		
		ctx.clearRect(0 ,0, myCanvas.width, myCanvas.height);
		ctx.fillStyle = 'rgb(5, 155, 255)';
		ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);					
		ctx.globalCompositeOperation = "source-over";
		ctx.globalCompositeOperation = "lighter";
		for(var i = 0; i < particleArray.length; i++) {

			particleArray[i].update();
			particleArray[i].render();
		}

	}, 1000/60);
};



var random = function(min, max) {
	//random the range from 0 to max
	//~~ is the same thing as Math.
	return ~~((Math.random()*max) + min);
};

init();