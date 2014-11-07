// Created Sep 6, 2014 by Yu-Chien Kao
console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');

var gridSize = 10;
var orgSize = gridSize - 5; // lines(Distance) between blocks 
var innerLayerNum = 1; // mousemove block: How many layers are black
var layerNum = 5; // mousemove block: 5 layers : the size of the black block
var layerSizeInterval = 1; // mousemove block:small blocks --> big blocks
var maxResetNum = 400; // Reset how many grids each time
var particleNum = -1; // Initialize
var particleArray = [];
var colorBackground = 'rgba(' + 0 + ',' + 0 + ',' + 0 + ',1)';

var random = function(min, max) { return Math.floor((Math.random()*(max-min)) + min); }; // jjkao



var Particle = function(_x, _y, _size, _color) {
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;
	this.sizeOrg = _size;
	this.colorOrg = _color;
	this.changed = false;

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

	this.changeColor = function(_color){
		this.color = _color;
		this.render();
	};

	this.reset = function(){
		this.size = this.sizeOrg;
		this.color = this.colorOrg;
		this.render();
	};

	this.detectArea = function(_mouseX,_mouseY) {
		var xLayerNum = Math.floor(Math.abs(_mouseX-this.x)/gridSize);
		var yLayerNum = Math.floor(Math.abs(_mouseY-this.y)/gridSize);
		
		if(xLayerNum <= layerNum && yLayerNum <= layerNum){ //touched
			this.color = colorBackground;
			this.render();
			
			var theLayerNum = Math.max(xLayerNum,yLayerNum); // which layer
			
			if(theLayerNum <= innerLayerNum){
				this.size =0;
			} else {
				this.size = (theLayerNum - innerLayerNum) * layerSizeInterval; 
			}

			this.render();
			this.changed = true;

		} else {
			if(this.changed){
			this.reset();  
			this.changed =false;
			}
		}
	}
	return this;
};

 

// Create Particles
var createParticle = function (){
	var i = 0;
	for(var x = 0; x < window.innerWidth; x = x + gridSize){
		for(var y = 0; y < window.innerHeight; y = y + gridSize){
		var r = random(0, 256);
		var g = random(0, 256);
		var b = random(0, 256);
		var color = 'rgba(' + r + ',' + g + ',' + b + ',1)';
		particleArray[i] = new Particle(x, y, orgSize, color).update().render();
		i++;
		}
	}
	particleNum = i;
};

// Reset Particles
var resetParticle = function () {
   var resetNum = particleNum;
   if(resetNum > maxResetNum) resetNum = maxResetNum;
   for(j = 0; j < resetNum; j++) {
      var which = random(0,particleNum);
      var r = random(0, 256);
      var g = random(0, 256);
      var b = random(0, 256);
      var color = 'rgba(' + r + ',' + g + ',' + b + ',1)';
      particleArray[which].changeColor(color);
	}
};

// Interact with mouse
myCanvas.addEventListener('mousemove', function(e){
	for(var i = 0; i < particleNum; i++){
		particleArray[i].detectArea(e.pageX, e.pageY);
	}
});

// FrameRate
var fps = 30;

// Add background: black
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

// Add Particles		
createParticle();


var draw = function (){
		setTimeout(function(){
			// Animate
			requestAnimationFrame(draw);

			// reset particles
			resetParticle();

		}, 2000/fps);
};



var init = function(){
	myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

	draw();

}();
