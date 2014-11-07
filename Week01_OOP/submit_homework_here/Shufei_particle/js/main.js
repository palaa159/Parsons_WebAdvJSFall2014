/* Your code starts here */
console.log('main.js is loaded');
var canvas = document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



var particle = function(_x,_y,_size,_color){
this.x=_x;
this.y=_y;
this.size=_size;
this.color=_color;
this.render = function(){
ctx.fillStyle=this.color;
ctx.fillRect(this.x, this.y, this.size, this.size);

return this;
};
return this;
};

var particleArray =[];

var random = function(min,max){
return Math.floor((Math.random()*max)+min);
};

for(var i=0;i<200;i++){
var x=random(0,window.innerWidth);
var y=random(0,window.innerHeight);
var r=random(100,180);
var g=random(70,90);
var b=random(60,90);

particleArray.push(new particle(x,y,10,'rgba(' + r+','+g+','+b+',1)').render());

}






