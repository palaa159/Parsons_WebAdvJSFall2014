var app=function(){

    //animation
    window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
    	};


    //get canvas
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
            canvas.width  = window.innerWidth/2;
            canvas.height = window.innerHeight/2;


    //mouse
    var mouse={
    	doubleclick:false,
    	down:false,
    	x:canvas.width/2,
    	y:canvas.height/2
    	};


    canvas.onmousemove = function(e) {
    	var rect = canvas.getBoundingClientRect();
    	mouse.x = e.clientX - rect.left;
    	mouse.y = e.clientY - rect.top;
    	return false;
    	};
    	  
    	  
    canvas.ondblclick = function(e){
    	mouse.doubleclick=true;
    	return false;

    };


    canvas.onmousedown = function(e) {
    	mouse.down = true;
    	return false;
    };
                
    canvas.onmouseup = function(e) {
    	mouse.down = false;
    	return false;
    	
    };



    //particle class
    var Particle = function(x, y, angle, speed, life, size,color) {

        /* the particle's position */

        this.pos = {
            x: x || mouse.x,
            y: y || mouse.y
        };

        /* set specified or default values */

        this.speed = speed;

        this.life = life;

        this.size = size;

        this.lived = 0;

        this.dead=false;

    	this.color=color;


        /* the particle's velocity */

        var radians = angle * Math.PI / 180;

        this.vel = {
            x: Math.cos(radians) * speed,
            y: -Math.sin(radians) * speed
        };

        this.force={
        	x:0,
        	y:-0.2
        };




        this.update=function(duration,damp,R,G,B){



            /* add the seconds passed to the particle's life */

            this.lived += duration;
     

            /* check if the particle should be dead */

            if (this.lived >= this.life || this.size<2) {
                this.dead = true;
            }

            /*add gravity */
            this.vel.y+=this.force.y;
            this.vel.x+=this.force.x;

            /* calculate the particle's new position */

            this.pos.x += this.vel.x ;
            this.pos.y += this.vel.y ;
            
            /*damping the size */
            this.size=this.size-damp;
            
            /*damping the alpha */
            var step =6 ;
            if(this.color.r>R ){
                this.color.r-=step;
            }
            else{
                this.color.r+=step;
            }
            if(this.color.g>G ){
                this.color.g-=step;
            }
            else{
                this.color.g+=step;
            }
            if(this.color.b>B ){
                this.color.b-=step;
            }
            else{
                this.color.b+=step;
            }
        };



        this.draw=function(){

            var x = this.pos.x;
            var y = this.pos.y;
            var r = this.size;
            
            var grad = ctx.createRadialGradient(
                x,
                y,
                1,
                x,
                y,
                r
                );
            grad.addColorStop(0, 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',1)');
            grad.addColorStop(1, 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',0)');
            ctx.fillStyle = grad;
            //ctx.fillStyle = 'rgba('+particle.r+','+particle.g+','+particle.b+','+particle.a+')';
            ctx.beginPath();
            ctx.arc(x, y,r, 0, Math.PI * 2);
            ctx.closePath();

            ctx.fill();
        };

    };





    var Emitter = function() {


        /* set specified values */

        this.settings = {
    	    'emission_rate': 50,
    	    'min_life': 0.4,
    	    'life_range': 0.3,
         	'min_angle': 0,
    	    'angle_range': 360,
    	    'min_speed': 0.4,
    	    'speed_range': 1,
    	    'min_size': 35,
    	    'size_range': 10,
    		'damping':0.5,
            'colora':{
                r:20,
                g:20,
                b:150
            },
            'colorb':{
                r:54,
                g:255,
                b:117
            }
    	};

        /* How often the emitter needs to create a particle in milliseconds */

    	
        this.emission_delay = 1000 / this.settings.emission_rate;

        /* we'll get to these later */

        this.last_update = 0;

        this.last_emission = 0;

        /* the emitter's particle objects */

        this.particles = [];
    };



    Emitter.prototype.update=function(){

         /* set the last_update variable to now if it's the first update */

        if (!this.last_update) {

            this.last_update = Date.now();

        }

        /* get the current time */

        var time = Date.now();

        /* work out the milliseconds since the last update */

        var dt = time - this.last_update;

        /* add them to the milliseconds since the last particle emission */

        this.last_emission += dt;

        /* set last_update to now */

        this.last_update = time;

    	
    	/* emit faster when mouse down */
    	if(mouse.down){
    		this.emission_delay=15;
    	}
    	else{
    		this.emission_delay=30;
    	}
    	
    	
    	/* change colour when double click */

    	if(mouse.doubleclick){
    		this.settings.colorb.r=Math.floor(Math.random()*255);
    		this.settings.colorb.g=Math.floor(Math.random()*255);
    		this.settings.colorb.b=Math.floor(Math.random()*255);

    		mouse.doubleclick=false;
    	}
    	
    	
        /* check if we need to emit a new particle */

        if (this.last_emission > this.emission_delay) {

            /* find out how many particles we need to emit */

            var i = Math.floor(this.last_emission / this.emission_delay);

            /* subtract the appropriate amount of milliseconds from last_emission */

            this.last_emission -= i * this.emission_delay;

            while (i--) {

                /* calculate the particle's properties based on the emitter's settings */

                this.particles.push(
                    new Particle(
                        mouse.x,
                        mouse.y,
                        this.settings.min_angle + Math.random() * this.settings.angle_range,
                        this.settings.min_speed + Math.random() * this.settings.speed_range,
                        this.settings.min_life + Math.random() * this.settings.life_range,
                        this.settings.min_size + Math.random() * this.settings.size_range,
                        {r:this.settings.colora.r,g:this.settings.colora.g,b:this.settings.colora.b}
                    )
                );
            }
        }

        /* convert dt to seconds */

        dt /= 1000;

        /* loop through the existing particles */

        var i = this.particles.length;

        while (i--) {

            var particle = this.particles[i];

            /* skip if the particle is dead */
            if (particle.dead) {
                /* remove the particle from the array */
                this.particles.splice(i, 1);
            }



            particle.update(dt,this.settings.damping,this.settings.colorb.r,this.settings.colorb.g,this.settings.colorb.b);
    			
    		
    		
            /* draw the particle */


            particle.draw();

        }
    	

    	/* meatball fx  */
    		var imageData = ctx.getImageData(0, 0,canvas.width, canvas.height),
            pix = imageData.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                (pix[i + 3] < 220) && (pix[i + 3] /= 6);
            }
            ctx.putImageData(imageData, 0, 0);
    	/*	
    		ctx.fillStyle = 'rgba(20,20,20,1)';
    		ctx.beginPath();
            ctx.arc(mouse.x,mouse.y,99, 0, Math.PI * 2);
    		ctx.closePath();
    		ctx.fill();
    	*/

    };


    var emitter = new Emitter();

    var loop = function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        emitter.update();

        requestAnimFrame(loop);
    };

    loop();
    

}();

