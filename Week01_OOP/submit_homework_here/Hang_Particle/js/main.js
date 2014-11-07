var app=(function(){

	var dotArray=[];
	var mouse = {x: 0, y: 0};

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");


	var dot= function(x,y,size,color){
		this.x=x;
		this.y=y;
		var degree=Math.random()*360;
		var l=Math.random()*2.5;
		this.velX=Math.sin(degree/180*Math.PI)*l;
		this.velY=Math.cos(degree/180*Math.PI)*l;
		//get a square firework with code blow
		// this.velX=5*(Math.random()-0.5);
		// this.velY=5*(Math.random()-0.5);
		this.size=size;
		this.color=color;
		this.render=function(){
			ctx.fillStyle=this.color;
			ctx.fillRect(this.x,this.y,this.size,this.size);
		};
		this.update=function(){
			this.x+=this.velX;
			this.y+=this.velY;
			this.size=this.size*0.99;
			this.velX=this.velX*0.99;
			this.velY=this.velY*0.99;
		};
	};



	var draw=function(){
		requestAnimationFrame(draw);
		ctx.fillStyle = "rgba(0,0,0,0.2)";
		ctx.fillRect(0,0,c.width,c.height);
		
		for(var i=0;i<dotArray.length;i++){
			dotArray[i].update();
			dotArray[i].render();
				
			if(dotArray[i].size<0.1){
				var index = dotArray.indexOf(dotArray[i]);
				if (index > -1) {
					dotArray.splice(index, 1);
				}
				
				countParticles();
				//console.log(dotArray.length);
			}
		}
	};
		


	var creatDots=function(){
		var co="rgb("+parseInt(Math.random()*100+155)+","+parseInt(Math.random()*100+155)+","+parseInt(Math.random()*100+155)+")";
		for(var i=0;i<510;i++){
			dotArray.push(new dot(mouse.x,mouse.y,10,co));
		}
	};


	var getClickPosition=function(e,callback) {
		 mouse.x = e.clientX;
		 mouse.y = e.clientY;
		 //alert(mouse.y);
		 if(callback){
			callback();
		 }
	};


	var countParticles=function(){
		document.getElementById("count").innerHTML = "Current Particles: "+dotArray.length;
	};

	
	var init=function(callback){
		c.width=window.innerWidth;
		c.height=window.innerHeight;
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0,0,c.width,c.height);

		
			
		c.addEventListener("click", function(){getClickPosition(event,
		function(){
			creatDots();				
			countParticles();
		});}, false);
		
		if(callback){
			callback();
		}
	}(draw);
	

})();