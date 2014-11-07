console.log('main.js is loaded');

var myCanvas = document.getElementById('myCanvas');

//or in jQuery -> var myCanvas = $('#myCanvas');

var ctx = myCanvas.getContext('2d');
var mouse = {};

//create a simple rectange

//ctx.fillStyle = 'rgba(255,0,0,0.5)';
//ctx.fillRect(100, 100, 10, 10);

var Particle = function(_x, _y, _size, _color){
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.color = _color;
	//this.angle = angle;


	

	//this.r = r;
	//this.g = g;
	//this.b = b;
	//this.life = life;

	//this.color = 'rgba(this.r, this.g, this.b, this.life)';
	this.velx = Math.cos(random(0, 360))*randomFloat(-5, 5);
	this.vely = Math.sin(random(0, 360))*randomFloat(-5, 5);
	
	this.update = function() {
        this.x += this.velx + randomFloat(-10, 10)/this.size;
        this.y += this.vely + randomFloat(-10, 10)/this.size;
        //this.y *= g;
        // make it stop
        this.velx *= 0.995;
        this.vely *= 0.995;
        // shrink it!
        this.size *= 0.98;
        return this;
    };

	this.remove = function() {
        particleArray.splice(particleArray.indexOf(this), 1);
        return this;
    };


	this.render = function(){

		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);

	//};

	//this.clicky = function(){
		

		//var radians = angle * Math.PI / 180;

		
		/*
		this.vel = {

			x:  Math.cos(radians) * speed,
			y: -Math.sin(radians) * speed
		};
		*/

		//this.x *= this.velx;
		//this.y *= this.vely;

		return this;

		
	};

	return this;
};

//var firstParticle = new Particle(100,100,30, 'green');

//firstParticle.render();

//var secondParticle = new Particle(400,250,50,'rgba(240,25,145,1)');

//secondParticle.render();

//make an empty array that can be pushed

var particleArray = [];




//make a for loop to push the particles into the array
/*
for(var i = 0; i < 100; i++){

	particleArray.push(new Particle(i, i, i, 'red').render());

}
*/

// double ~~ is equal to Math.floor

var random = function(min, max){

	//return ~~(Math.random() * max) + min;
	return Math.floor(Math.random() * max) + min;
	
};

var randomFloat = function(min, max) {

    return Math.random() * (max - min) + min;
};

//var mouseDown = function(){

/*
	function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

*/



var init = (function() {

	var w = window.innerWidth,
        h = window.innerHeight;

    mouse.x = w/2;
    mouse.y = h/2;

    myCanvas.style.position = 'absolute';
    myCanvas.width = w;
    myCanvas.height = h;

    var draw = function() {
		
		


					
			

    
	

	document.addEventListener('click', function() {
		

			// for(var i = 0; i < particleArray.length; i++) {
			//particleArray[i].size = 20;
			//particleArray[i].color = '#fff';
			//}

			for(var i = 0; i < 100; i++){

			

			
					
		// or just update each nodes and render them normally
                //particleArray[i].update().render();
                var s = random(10, 20);
                // random rgb color
                var r = random(0, 256);
                var g = random(0, 256);
                var b = random(0, 256);

                particleArray.push(new Particle(mouse.x - s / 2, mouse.y - s / 2, s, 'rgba(' + r + ',' + g + ',' + b + ',1)'));
                //particleArray.push(new Particle(random(0,500), random(0,500), 8, 'rgba(30, 160, 155, .75)', 5).render());
				particleArray[i].update().render();

				

				

				
				

				
			}


			
		//particleArray[i].remove();



	});



	};

    setInterval(draw, 1000 / 60);

    
	

	
	//for (var q = 0; q < particleArray.length; q++) {

		//particleArray[q].render();
		//particleArray[q].Particle.clicky();
	//}
	


//};

/*
function clickDraw() {
		//clear canvas
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
		for (var q = 0; q < particleArray.length; q++) {
			particleArray[q].render();
			particleArray[q].clicky();
		}
}
*/

//mouseDown.clickDraw();

})();

