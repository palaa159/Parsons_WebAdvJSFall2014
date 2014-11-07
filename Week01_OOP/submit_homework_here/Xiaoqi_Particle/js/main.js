var canvas = document.getElementById("myCanvas");
var rect = canvas.getContext("2d");
var list = document.getElementById("myList");
var body = document.getElementById("content");
var message;
var counter = 0;
var counterTotal = 0;
var posX = new Array();
        var posY = new Array();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.backgroundColor = rbg(255,0,0);

// var ctx =canvas.getContext("2d");
// ctx.fillStyle = #333333;
// ctx.fill();

function rectClass(number){
    this.numberOfrects = number;
    this.rectColor = [ Math.floor(Math.random()*255) , Math.floor(Math.random()*255) , Math.floor(Math.random()*255) ];
    this.draw =function(){


    	// body.style.backgroundColor = ;
        
        body.style.backgroundColor = "lightBlue";
        for(var i = 0; i < rects.numberOfrects; i++){
            var height = Math.random()*200;
            posX[rects.numberOfrects] = Math.random()*window.innerWidth;
            posY[rects.numberOfrects] = Math.random()*window.innerHeight;
            
            rect.fillStyle = 'rgb('+rects.rectColor+')';
            rect.fillRect(posX[rects.numberOfrects], posY[rects.numberOfrects], Math.random()*100, height);
            
        }
        
        
        counter++;
       	counterTotal++;
        console.log("Counter: "+counter);
        if(counter>1){
          
            rects.rectColor=[ Math.floor(Math.random()*255) , Math.floor(Math.random()*255) , Math.floor(Math.random()*255) ];
            counter=0;
           
        }
      
        canvas.addEventListener ('click',function(mouse){
            location.reload();
        },false); 
    }
    // this.move = function(){
    //     requestAnimationFrame(move);
    //     posX[rects.numberOfrects]+=10;
    // }
}

var rects = new rectClass(1); 

rects.draw;



setInterval(rects.draw,100);
