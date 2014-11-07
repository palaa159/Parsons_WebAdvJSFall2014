console.log('this is!');
var myCanvas = document.getElementById('mycanvas');
var ctx = myCanvas.getContext('2d');

var w = myCanvas.width = window.innerWidth;
var h = myCanvas.height = window.innerHeight;

var mouse = {};

var myParticle = function(xPos,yPos,size,color,radius,currentMosueX,currentMouseY){
	this.x = xPos;
	this.y = yPos;
	this.size = size;
	this.color = color;
	this.radius = randomFloat(3,6);

	this.velX = randomFloat(-1,1);
	this.velY = randomFloat(-1,1);
	this.decay = randomFloat(0.99,0.9999);

	this.currentMouseX=0;
	this.currentMouseY=0;
	this.distance=0;

	this.update = function(){
		this.size *= this.decay;
		this.x += this.velX;
		this.y += this.velY;
		// this.velX *= 0.999;
		// this.velY *= 0.999;
	};

	this.render =function(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		return this;	
	};

	this.updateMousePos=function(mouseX, mouseY){
		this.currentMouseX=mouseX;
		this.currentMouseY=mouseY;
		this.distance=parseInt(lineDistance(mouseX,mouseY,this.x, this.y));
		

		var rColor;
		rColor=parseInt(((this.distance/1000)*256)-50);
		if(rColor){
			this.color='rgba('+rColor+','+150+','+150+','+0.8+')';
		};
		
	};

	var lineDistance = function(_x,_y,_x0,_y0){
		return Math.sqrt((_x -= _x0) * _x + (_y -= _y0) * _y);
	};

	return this;

};

var particleArray = [];
var particleDistance = [];

var random = function(min, max) {
	return Math.floor((Math.random()*max) + min);
};

var randomFloat = function(min,max){
	return Math.random() * (max - min) + min;
};

var setUp = function(){
	for(var i=0; i<350; i++){
		var x = random(0,w);
		var y = random(0,h);

		var r = random(0, 256);
		var g = random(0, 256);
		var b = random(0, 256);

		particleArray.push(new myParticle(x,y,10,'rgba('+r+','+g+','+b+','+0.5+')').render());
	}
};

var draw = function(){
	ctx.clearRect(0,0,w,h);
	for(var i=1; i<particleArray.length; i++){
		particleArray[i].updateMousePos(mouse.x, mouse.y);
		particleArray[i].update();
		particleArray[i].render();
	};
};

var fps =40;
setInterval(draw,1000/fps);
setUp();

myCanvas.addEventListener('mousemove',function(e){
	// console.log('x:'+e.pageX,'y:'+e.pageY);
    mouse.x = e.pageX;
	mouse.y = e.pageY;

},false);

var lineDistance = function(_x,_y,_x0,_y0){
	return Math.sqrt((_x -= _x0) * _x + (_y -= _y0) * _y);
};



