/* Your code starts here */

var canvas = document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



var particle = function(_x,_y,_size,_color,_speed, _radius){
this.x=_x;
this.y=_y;
this.size=_size;
this.color=_color;
this.speed = Math.random(-1, 0)*5;
this.radius = 2+Math.random()*8;

this.render = function(){
ctx.fillStyle=this.color;
ctx.arc(this.x, this.y, this.radius, 4, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();

return this;
};

return this;
};


var particle2 = function(_x2,_y2,_size2,_color2,_speed, _radius){
this.x=_x2;
this.y=_y2;
this.size=_size2;
this.color=_color2;
this.speed = Math.random(-1, 0)*1;
this.radius = 2+Math.random()*5;
this.render = function(){
// ctx.fillStyle=this.color;
ctx.arc(this.x, this.y, this.radius, 6, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();


return this;
};

return this;
};


var particleArray =[];
var particleArray2 =[];

var random = function(min,max){
//return Math.floor((Math.random()*max)+min);
return ~~((Math.random()*max) + min);
};

for(var i=0;i<100;i++){
var x=random(0,window.innerWidth);
var y=random(0,window.innerHeight);
var r=random(100,280);
var g=random(70,90);
var b=random(60,90);


particleArray.push(new particle(x,y,2,'rgba(' + r+','+g+','+b+',1)').render());

}

for(var i=0;i<100;i++){
var x2=random(0,window.innerWidth);
var y2=random(0,window.innerHeight);
var r2=random(100,180);
var g2=random(70,100);
var b2=random(10,90);
particleArray2.push(new particle2(x2,y2,4,'rgba(' + r2+','+g2+','+b2+',1)').render());


}


