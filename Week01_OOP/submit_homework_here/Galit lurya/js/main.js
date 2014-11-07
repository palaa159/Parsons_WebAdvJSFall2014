console.log('mainjs loaded');

var myCanvas=document.getElementById('myCanvas');
//this is the same as using jquery myCanvas= $('#myCanvas');

var ctx=myCanvas.getContext('2d');


//creating a particle object
var ParticleReds = function(x, y, size){
	this.x=x;
	this.y=y;
	this.size=size;
	// this.color=color;
	this.render=function(){
		//Circle pink
		ctx.beginPath();
		//set the circle x pos, y pos, radius, start point, end point and draw direction
		ctx.arc(this.x, this.y, this.y/10, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgba(240, 10, 135, 0.2)';
		ctx.fill();
		ctx.closePath();
	};
};

var ParticleBlues = function(x, y, size){
	this.x=x;
	this.y=y;
	this.size=size;
	// this.color=color;
	this.render=function(){
		//Circle blue
		ctx.beginPath();
		//set the circle x pos, y pos, radius, start poit, end point and draw direction
		ctx.arc(this.x*1.3, this.y*1.3, this.y/10, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgba(0, 150, 135, 0.2)';
		ctx.fill();
		ctx.closePath();
	};
};

var ParticleYellows = function(x, y, size){
	this.x=x;
	this.y=y;
	this.size=size;
	// this.color=color;
	this.render=function(){
		//Circle yellow
		ctx.beginPath();
		//set the circle x pos, y pos, radius, start point, end point and draw direction
		ctx.arc(this.x*1.5, this.y*1.5, this.y/10, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'rgba(150, 200, 0, 0.2)';
		ctx.fill();
		ctx.closePath();
	};
};


//creating a particle array and then running it in a for loop
var particleArrayRed=[], particleArrayBlue=[], particleArrayYellow=[];

var random = function(min, max) {
	//randomize the range from 0 to the max
	//~~ is the same thing as Math.floor
	return ~~((Math.random()*max) + min);
};


for(var i = 0; i < 150; i++) {
	particleArrayRed.push(new ParticleReds(random(0,1000), random(0,1000), random(90,800)).render());
	particleArrayBlue.push(new ParticleBlues(random(0,1000), random(0,1000), random(90,800)).render());
	particleArrayYellow.push(new ParticleYellows(random(0,1000), random(0,1000), random(90,800)).render());

}