console.log('get it');
var myCanvas = document.getElementById('mycanvas');
console.log(myCanvas);
var ctx = myCanvas.getContext("2d");

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

var myParticle = function(xPos,yPos,size,color,speed,radius){
	this.x = Math.random()*myCanvas.width;
	this.y = yPos;
	this.size = size;
	this.color = color;
	this.speed = Math.random(-3, 3)*10;
	this.radius = 1+Math.random()*8;

	this.update = function(){
   		for(var i = 0; i < 100; i++) {
			var item = particleArray[i];
			item.y += item.speed;
	}
	return this;
	};

	this.render =function(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		return this;	
	};

	this.remove = function() {
		for(var i = 0; i < 100; i++) {
			var part = particleArray[i];
			if(part.y >= 350) {
				part.y = 300;
		        
			}
		}
		return this;
	};
	return this;
};

var particleArray =[];


var random = function(min, max) {
	return Math.floor((Math.random()*max) + min);
};

for(var i = 0; i < 100; i++) {
	var x = random(0, myCanvas.width);
	var y = 100;

	var r = Math.round(Math.random() * 255 | 0);
	var g = Math.round(Math.random() * 255 | 0);
	var b = Math.round(Math.random() * 255 | 0);		
 	particleArray.push(new myParticle(x, y, 5, 'rgba(' + r + ',' + g + ',' + b + ',1)', 0.6));
}

setInterval(draw,40);

function draw(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	for(var i = 0; i < particleArray.length; i++) {
		particleArray[i].render();
		particleArray[i].update();
		particleArray[i].remove();
	}
};




