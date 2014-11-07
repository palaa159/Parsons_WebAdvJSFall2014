// Created Aug 27, 2014 by Apon Palanuwech
// TAKE A LOOK AT THIS MAYBE
// http://creativejs.com/tutorials/creating-fireworks/


console.log('main.js loaded');

var myCanvas = document.getElementById('myCanvas');
// or in jQuery -> var myCanvas = $('#myCanvas');
var ctx = myCanvas.getContext('2d');
var g = 1;
var mouse = {};
// Make canvas full screen
// Create an constructor for our Particles!
var Particle = function(_x, _y, _size, _color) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.color = _color;
    // extra
    // velocity
    // this.velX = randomFloat(-5, 5);
    // this.velY = randomFloat(-5, 5);
    // circular
    this.velX = Math.cos(random(0, 360))*randomFloat(-5, 5);
    this.velY = Math.sin(random(0, 360))*randomFloat(-5, 5);
    
    this.update = function() {
        this.x += this.velX + randomFloat(-10, 10)/this.size;
        this.y += this.velY + randomFloat(-10, 10)/this.size;
        this.y *= g;
        // make it stop
        this.velX *= 0.995;
        this.velY *= 0.995;
        // shrink it!
        this.size *= 0.98;
        return this;
    };
    this.remove = function() {
        particleArray.splice(particleArray.indexOf(this), 1);
        return this;
    };
    // a function to render to screen
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        // always return this after finish writing a function
        // so that you can chain the method over and over.
        return this;
    };
    return this;
};

// Instantiating Particle with "new Particle"
// var firstParticle = new Particle(100, 100, 30, 'green');
// firstParticle.render();

// var secondParticle = new Particle(400, 250, 50, 'rgba(240, 10, 135, 1)');
// secondParticle.render();

// when we instantiate "Particle", "this" refers to that Particle so each Particles have
// its own property value we defined.
// That's why we can differentiate 

// Create an empty array that will store our Particle
var particleArray = [];
// create a function that gives us a random integer between min-max input
var random = function(min, max) {
    return Math.floor(Math.random() * max) + min;
};
var randomFloat = function(min, max) {
    return Math.random() * (max - min) + min;
};

// Instantiate 100 Particles using for loop and method chaining.
// Notice we are able to put .render() right after we create new Particle

// init
var init = (function() {
    // Make canvas full screen
    var w = window.innerWidth,
        h = window.innerHeight;
    mouse.x = w/2;
    mouse.y = h/2;

    myCanvas.style.position = 'absolute';
    myCanvas.width = w;
    myCanvas.height = h;

    var setup = function() {
        for (var i = 0; i < 250; i++) {
            // var x = random(0, w);
            // var y = random(0, h);
            var s = random(10, 20);
            // random rgb color
            var r = random(0, 256);
            var g = random(0, 256);
            var b = random(0, 256);
            particleArray.push(new Particle(mouse.x - s / 2, mouse.y - s / 2, s, 'rgba(' + r + ',' + g + ',' + b + ',1)'));
        }
    };

    var draw = function() {
        // refresh background
        // ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        for (var i = 0; i < particleArray.length; i++) {
            // if size < 0 then delete it and create a new one
            if (particleArray[i].size <= 1) {
                // remove this index
                particleArray[i].remove();
                // console.log('deleted', i);
                // create a new one
                var s = random(10, 20);
                // random rgb color
                var r = random(0, 256);
                var g = random(0, 256);
                var b = random(0, 256);
                particleArray.push(new Particle(mouse.x - s / 2, mouse.y - s / 2, s, 'rgba(' + r + ',' + g + ',' + b + ',1)'));
            } else { // or just update each nodes and render them normally
                particleArray[i].update().render();
            }
        }
    };

    // finally, run
    setup();
    setInterval(draw, 1000 / 60); // running at 60 frames per sec



    // event listener
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });
    document.addEventListener('click', function() {
        // turn all the particle into white
        for(var i = 0; i < particleArray.length; i++) {
            particleArray[i].size = 20;
            particleArray[i].color = '#fff';
        }
    });
})();