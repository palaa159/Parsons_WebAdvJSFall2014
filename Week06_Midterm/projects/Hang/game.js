var PingPhone =PingPhone  || {};
PingPhone.mainGame=(function(){

	// scene object variables
var exrotationX=0; var rotationX=0;
var p2exrotationX=0; var p2rotationX=0;

var Forehandl=false,Forehands=false,Backhands=false,Backhandl=false;
var p2Forehandl=false,p2Forehands=false,p2Backhands=false,p2Backhandl=false;

	var WIDTH, HEIGHT;

	var renderer, scene, pointLight, spotLight;

	// field variables
	var fieldWidth = 400, fieldHeight = 200;

	var netHeight=30;

	// paddle variables
	var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
	var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

	// ball variables
	var ball, paddle1, paddle2;
	var ballDirX = 1, ballDirY = 1, ballSpeed = 2 , baseSpeed=2;

	// game-related variables
	var score1 = 0, score2 = 0;
	// you can change this to any positive whole number
	var maxScore = 7;

	// set opponent reflexes (0 - easiest, 1 - hardest)
	var difficulty = 0.2;

	var oneCanHit=false, twoCanHit=false;
	var lastServer;
	var lostScore=false;

	var hitpointZ,hitpointX;

	var serveRound=true;


	socket.on('rotate', function(rotation){
  //alert(rotation.uid); 
  if(rotation.uid==p1Uid && oneCanHit==true){
    exrotationX=rotationX;

    if (Math.abs(rotation.y)<90){
        rotationX=rotation.x;
    }
    else if(Math.abs(rotation.y)>90){
        rotationX=180-360+rotation.x;
    }
    if(rotationX<0){
      rotationX=360+rotationX;
    }
    if(exrotationX!=0){
	    if(rotationX>270&&rotationX<=360&&exrotationX>=0&&exrotationX<90){
	      if((exrotationX+360-rotationX)>40){
	        Backhandl=true;Backhands=false;Forehandl=false;Forehands=false;
	      }
	      else if(((exrotationX+360-rotationX)<=40)&&((exrotationX+360-rotationX)>10)){
	        Backhands=true;Backhandl=false;Forehandl=false;Forehands=false;
	      }
	    }
	    else if(exrotationX>270&&exrotationX<=360&&rotationX>=0&&rotationX<90){
	      if((rotationX+360-exrotationX)>40){
	        Forehandl=true;Backhands=false;Backhandl=false;Forehands=false;
	      }
	      else if(((rotationX+360-exrotationX)<=40)&&((rotationX+360-exrotationX)>10)){
	        Forehands=true;Backhands=false;Backhandl=false;Forehandl=false;
	      }
	    }

	    if((rotationX>90&&rotationX<270)||(exrotationX>90&&exrotationX<270)||(rotationX>=0&&rotationX<90&&exrotationX>=0&&exrotationX<180)||(exrotationX>=0&&exrotationX<90&&rotationX>=0&&rotationX<180)||(rotationX>270&&rotationX<=360&&exrotationX<=360&&exrotationX>180)||(exrotationX>270&&exrotationX<=360&&rotationX<=360&&rotationX>180)){
	      if((exrotationX-rotationX)>40){
	        Backhandl=true;Backhands=false;Forehandl=false;Forehands=false;
	      }
	      else if(((exrotationX-rotationX)<=40)&&((exrotationX-rotationX)>10)){
	        Backhands=true;Backhandl=false;Forehandl=false;Forehands=false;
	      }
	      else if((rotationX-exrotationX)>40){
	        Forehandl=true;Backhands=false;Backhandl=false;Forehands=false;
	      }
	      else if(((rotationX-exrotationX)<=40)&&((rotationX-exrotationX)>10)){
	        Forehands=true;Backhands=false;Backhandl=false;Forehandl=false;
	      }
	    }
	}
  }
  else if(rotation.uid==p2Uid&&twoCanHit==true){
    p2exrotationX=p2rotationX;

    if (Math.abs(rotation.y)<90){
        p2rotationX=rotation.x;
    }
    else if(Math.abs(rotation.y)>90){
        p2rotationX=180-360+rotation.x;
    }
    if(p2rotationX<0){
      p2rotationX=360+p2rotationX;
    }

    if(p2exrotationX!=0){
	    if(p2rotationX>270&&p2rotationX<=360&&p2exrotationX>=0&&p2exrotationX<90){
	      if((p2exrotationX+360-p2rotationX)>40){
	        p2Backhandl=true;p2Backhands=false;p2Forehandl=false;p2Forehands=false;
	      }
	      else if(((p2exrotationX+360-p2rotationX)<=40)&&((p2exrotationX+360-p2rotationX)>10)){
	        p2Backhands=true;p2Backhandl=false;p2Forehandl=false;p2Forehands=false;
	      }
	    }
	    else if(p2exrotationX>270&&p2exrotationX<=360&&p2rotationX>=0&&p2rotationX<90){
	      if((p2rotationX+360-p2exrotationX)>40){
	        p2Forehandl=true;p2Backhands=false;p2Backhandl=false;p2Forehands=false;
	      }
	      else if(((p2rotationX+360-p2exrotationX)<=40)&&((p2rotationX+360-p2exrotationX)>10)){
	        p2Forehands=true;p2Backhands=false;p2Backhandl=false;p2Forehandl=false;
	      }
	    }

	    if((p2rotationX>90&&p2rotationX<270)||(p2exrotationX>90&&p2exrotationX<270)||(p2rotationX>=0&&p2rotationX<90&&p2exrotationX>=0&&p2exrotationX<180)||(p2exrotationX>=0&&p2exrotationX<90&&p2rotationX>=0&&p2rotationX<180)||(p2rotationX>270&&p2rotationX<=360&&p2exrotationX<=360&&p2exrotationX>180)||(p2exrotationX>270&&p2exrotationX<=360&&p2rotationX<=360&&p2rotationX>180)){
	      if((p2exrotationX-p2rotationX)>40){
	        p2Backhandl=true;p2Backhands=false;p2Forehandl=false;p2Forehands=false;
	      }
	      else if(((p2exrotationX-p2rotationX)<=40)&&((p2exrotationX-p2rotationX)>10)){
	        p2Backhands=true;p2Backhandl=false;p2Forehandl=false;p2Forehands=false;
	      }
	      else if((p2rotationX-p2exrotationX)>40){
	        p2Forehandl=true;p2Backhands=false;p2Backhandl=false;p2Forehands=false;
	      }
	      else if(((p2rotationX-p2exrotationX)<=40)&&((p2rotationX-p2exrotationX)>10)){
	        p2Forehands=true;p2Backhands=false;p2Backhandl=false;p2Forehandl=false;
	      }
	    }
	}
  }

});




	// ------------------------------------- //
	// ------- GAME FUNCTIONS -------------- //
	// ------------------------------------- //
	var views = [
					{ 
						left: 0,
						bottom: 0.5,
						width: 1,
						height: 0.5,
						eye: [ 0, 1800, 0 ],
						up: [ 0, 1, 0 ],
						fov: 45,
						updateCamera: function ( camera, scene ) {

							// move to behind the player's paddle
							camera.position.x = paddle1.position.x - 100;
							camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
							camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
							
							// rotate to face towards the opponent
							camera.rotation.x = -0.01 * (ball.position.y) * Math.PI/180;
							camera.rotation.y = -60 * Math.PI/180;
							camera.rotation.z = -90 * Math.PI/180;
						}
					},
					{ 
						left:0,
						bottom: 0,
						width: 1,
						height: 0.5,
						eye: [ 0, 1800, 0 ],
						up: [ 0, 1, 0 ],
						fov: 45,
						updateCamera: function ( camera, scene ) {
						  // move to behind the player's paddle
							camera.position.x = paddle2.position.x + 100;
							camera.position.y += (paddle2.position.y - camera.position.y) * 0.05;
							camera.position.z = paddle2.position.z + 100 + 0.04 * (ball.position.x - paddle2.position.x);
							
							// rotate to face towards the opponent
							camera.rotation.x = 0.01 * (ball.position.y) * Math.PI/180;
							camera.rotation.y = 60 * Math.PI/180;
							camera.rotation.z = 90 * Math.PI/180;
						}
					}
				];



	var createScene=function()
	{
		// set the scene size


		// set some camera attributes
		// var VIEW_ANGLE = 50,
		//   ASPECT = WIDTH / HEIGHT,
		//   NEAR = 0.1,
		//   FAR = 10000;

		var c = document.getElementById("container");

		WIDTH=c.clientWidth;
		HEIGHT=c.clientHeight;
		
		// create a WebGL renderer, camera
		// and a scene
		renderer = new THREE.WebGLRenderer({ alpha: true });
		// camera =
		//   new THREE.PerspectiveCamera(
		// 	VIEW_ANGLE,
		// 	ASPECT,
		// 	NEAR,
		// 	FAR);

		for (var ii =  0; ii < views.length; ++ii ) {

			var view = views[ii];
			camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 10000 );
			camera.position.x = view.eye[ 0 ];
			camera.position.y = view.eye[ 1 ];
			camera.position.z = view.eye[ 2 ];
			camera.up.x = view.up[ 0 ];
			camera.up.y = view.up[ 1 ];
			camera.up.z = view.up[ 2 ];
			view.camera = camera;
		}


		scene = new THREE.Scene();

		// add the camera to the scene
		//scene.add(camera);
		
		// set a default position for the camera
		// not doing this somehow messes up shadow rendering
		//camera.position.z = 320;
		
		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);
		renderer.setClearColor('#6bc7be', 0);

		// attach the render-supplied DOM element
		c.appendChild(renderer.domElement);

		// set up the playing surface plane 
		var planeWidth = fieldWidth,
			planeHeight = fieldHeight,
			planeQuality = 10;
			
		// create the paddle1's material
		var paddle1Material =
		  new THREE.MeshLambertMaterial(
			{
			  color: "rgb(40,40,200)"
			});
		// create the paddle2's material
		var paddle2Material =
		  new THREE.MeshLambertMaterial(
			{
			  color: "rgb(200,40,40)"
			});
		// create the plane's material	
		var planeMaterial =
		  new THREE.MeshLambertMaterial(
			{
			  color: 0x4BD121
			});
		// create the table's material
		var tableMaterial =
		  new THREE.MeshLambertMaterial(
			{
			  color: "rgb(200,200,200)"
			});
		// create the pillar's material
		var pillarMaterial =
		  new THREE.MeshLambertMaterial(
			{
			  color: 0x534d0d
			});
		// create the ground's material
		var groundMaterial =
		  new THREE.MeshLambertMaterial(
			{
			  color: 0x888888
			});
			
			
		// create the playing surface plane
		var plane = new THREE.Mesh(

		  new THREE.PlaneGeometry(
			planeWidth * 0.96,	// 95% of table width, since we want to show where the ball goes out-of-bounds
			planeHeight,
			planeQuality,
			planeQuality),

		  planeMaterial);
		  
		scene.add(plane);
		plane.receiveShadow = true;	
		
		var table = new THREE.Mesh(

		  new THREE.CubeGeometry(
			planeWidth ,	// this creates the feel of a billiards table, with a lining
			planeHeight * 1.03,
			100,				// an arbitrary depth, the camera can't see much of it anyway
			planeQuality,
			planeQuality,
			1),

		  tableMaterial);
		table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
		scene.add(table);
		table.receiveShadow = true;	
			
		// // set up the sphere vars
		// lower 'segment' and 'ring' values will increase performance
		var radius = 5,
			segments = 6,
			rings = 6;
			
		// // create the sphere's material
		var sphereMaterial =
		  new THREE.MeshLambertMaterial(
			{
			  color: "rgb(255,255,255)"
			});
			
		// Create a ball with sphere geometry
		ball = new THREE.Mesh(

		  new THREE.SphereGeometry(
			radius,
			segments,
			rings),

		  sphereMaterial);

		// // add the sphere to the scene
		scene.add(ball);
		
		ball.position.x = 0;
		ball.position.y = 0;
		// set ball above the table surface
		ball.position.z = 30;
		ball.receiveShadow = true;
	    ball.castShadow = true;
		
		// // set up the paddle vars
		paddleWidth = 10;
		paddleHeight = 30;
		paddleDepth = 10;
		paddleQuality = 1;
			
		paddle1 = new THREE.Mesh(

		  new THREE.CubeGeometry(
			paddleWidth,
			paddleHeight,
			paddleDepth,
			paddleQuality,
			paddleQuality,
			paddleQuality),

		  paddle1Material);

		// // add the sphere to the scene
		scene.add(paddle1);
		paddle1.receiveShadow = true;
	    paddle1.castShadow = true;
		
		paddle2 = new THREE.Mesh(

		  new THREE.CubeGeometry(
			paddleWidth,
			paddleHeight,
			paddleDepth,
			paddleQuality,
			paddleQuality,
			paddleQuality),

		  paddle2Material);
		  
		// // add the sphere to the scene
		scene.add(paddle2);
		paddle2.receiveShadow = true;
	    paddle2.castShadow = true;	
		
		// set paddles on each side of the table
		paddle1.position.x = -fieldWidth/2 + paddleWidth;
		paddle2.position.x = fieldWidth/2 - paddleWidth;
		
		// lift paddles over playing surface
		paddle1.position.z = paddleDepth;
		paddle2.position.z = paddleDepth;

			
		// // // create a point light
		// pointLight =
		//   new THREE.PointLight(0xF8D898);

		// // set its position
		// pointLight.position.x = -1000;
		// pointLight.position.y = 0;
		// pointLight.position.z = 1000;
		// pointLight.intensity = 2.9;
		// pointLight.distance = 10000;
		// // add to the scene
		// scene.add(pointLight);
			
		// add a spot light
		// this is important for casting shadows
	    spotLight = new THREE.SpotLight(0xF8D898);
	    spotLight.position.set(0, 0, 460);
	    spotLight.intensity = 2;
	    spotLight.castShadow = true;
	    scene.add(spotLight);
		
		// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
		renderer.shadowMapEnabled = true;		
	};


	var  setup=function()
	{
		// update the board to reflect the max score for match win
		//document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
		
		// now reset player and opponent scores
		score1 = 0;
		score2 = 0;
		lostScore==true;
		// set up all the 3D objects in the scene	
		createScene();
		var serve=Math.floor((Math.random()*2) + 1);
		resetBall(serve);

		//ballHit("1l");
		// and let's get cracking!
		draw();
	};

	var draw=function()
	{	
		// draw THREE.JS scene
		//renderer.render(scene, camera);

		for ( var ii = 0; ii < views.length; ++ii ) {

						view = views[ii];
						camera = view.camera;

						view.updateCamera( camera, scene );

						var left   = Math.floor( WIDTH  * view.left );
						var bottom = Math.floor( HEIGHT * view.bottom );
						var width  = Math.floor( WIDTH  * view.width );
						var height = Math.floor( HEIGHT * view.height );
						renderer.setViewport( left, bottom, width, height );
						renderer.setScissor( left, bottom, width, height );
						renderer.enableScissorTest ( true );
						renderer.setClearColor( view.background );

						camera.aspect = width / height;
						camera.updateProjectionMatrix();

						renderer.render( scene, camera );
					}
		// loop draw function call
		requestAnimationFrame(draw);
		
		whoCanHit();
		//console.log(oneCanHit);
		ballPhysics();
		paddlePhysics();
		cameraPhysics();
		playerPaddleMovement();
		opponentPaddleMovement();
		//console.log(lostScore);

	};

	var whoCanHit=function(){
		if((ball.position.x>-fieldWidth/2 &&ball.position.x<-fieldWidth/2+85) ||(ball.position.x<fieldWidth/2&&ball.position.x>fieldWidth/2-85)&&lostScore==false){
			if(ball.position.x>-fieldWidth/2 &&ball.position.x<-fieldWidth/2+85){
				oneCanHit=true;
				twoCanHit=false;
			}
			else if(ball.position.x<fieldWidth/2&&ball.position.x>fieldWidth/2-85){
				oneCanHit=false;
				twoCanHit=true;
			}
		}
		else{
			oneCanHit=false;
			twoCanHit=false;
		}



		if(lostScore==true){
			oneCanHit=false;
			twoCanHit=false;

			setTimeout(function() {lostScore=false;}, 2000);
			//console.log(oneCanHit);
		}

	};

	function ballPhysics()
	{
		// if ball goes off the 'left' side (Player's side)
		if (ball.position.x <= -fieldWidth/2)
		{	
			lostScore=true;
			// CPU scores
			score2++;
			// update scoreboard HTML
			document.getElementById("p1score").innerHTML ="P1:"+score1;
			document.getElementById("p2score").innerHTML ="P2:"+score2;
			// reset ball 
			if(lastServer===1){
				resetBall(2);
			}
			else{
				resetBall(1);
			}
			matchScoreCheck();	
		}
		
		// if ball goes off the 'right' side (CPU's side)
		if (ball.position.x >= fieldWidth/2)
		{	
			lostScore=true;
			// Player scores
			score1++;
			// update scoreboard HTML
			document.getElementById("p1score").innerHTML ="P1:"+score1;
			document.getElementById("p2score").innerHTML ="P2:"+score2;			// reset ball to center
			if(lastServer===1){
				resetBall(2);
			}
			else{
				resetBall(1);
			}
			matchScoreCheck();	
		}
		

		
		// update ball position over time
		ball.position.x += ballDirX * ballSpeed;
		ball.position.y += ballDirY * ballSpeed;
		
		ballBounce();


	}

	// Handles CPU paddle movement and logic
	function opponentPaddleMovement()
	{

		// if(twoCanHit){
		// 	if(p2Forehands){
		// 		p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
		// 		ballHit("1r");
		// 		hitpointX=ball.position.x;
		// 		hitpointZ=ball.position.z;

		// 		//ballSpeed=ballSpeed*1.02;
		// 		if(serveRound===true&&lastServer===1){
		// 			serveRound=false;
		// 			ballSpeed=2;
		// 		}
		// 		else{
		// 			ballSpeed=baseSpeed*((ball.position.x-115)/20+1);
		// 		}

		// 		baseSpeed+=0.1;
		// 		lastServer=2;
		// 	}
		// }


	if(twoCanHit==true){
		exrotationX=0;
		rotationX=0;
		if (p2Forehands==true && ball.position.y<0){
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;
				ballHit('1l');
				//ballSpeed=ballSpeed*1.02;
				if(serveRound===true&&lastServer===1){
					serveRound=false;
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;

				baseSpeed+=0.1;
				lastServer=2;
			}	
			// move right
			else if (p2Forehandl==true&& ball.position.y<0){
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;

				ballHit('1r');

				if(serveRound===true&&lastServer===1){
					serveRound=false;				
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;
				//ballSpeed=ballSpeed*1.02;

				baseSpeed+=0.1;
				lastServer=2;

			}
			// else don't move paddle
			else if (p2Backhandl==true&& ball.position.y>=0)
			{
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;

				ballHit('1l');

				if(serveRound===true&&lastServer===1){
					serveRound=false;
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;
				//ballSpeed=ballSpeed*1.02;

				baseSpeed+=0.1;
				lastServer=2;


			}
			else if (p2Backhands==true&& ball.position.y>=0)
			{
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;

				ballHit('1r');

				if(serveRound===true&&lastServer===1){
					serveRound=false;
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;
				//ballSpeed=ballSpeed*1.02;

				baseSpeed+=0.1;
				lastServer=2;

			}
		//paddle2.position.y += paddle1DirY;
		}
		else{p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
				}
	}


	// Handles player's paddle movement
	function playerPaddleMovement(){
  		//console.log("BL:"+Backhandl+";FL:"+Forehandl+";BS:"+Backhands+";FS:"+Forehands);
  		//console.log("p2BL:"+p2Backhandl+";p2FL:"+p2Forehandl+";p2BS:"+p2Backhands+";p2FS:"+p2Forehands);
  		//console.log(oneCanHit+"Aa"+twoCanHit);
		if(oneCanHit==true){
			p2exrotationX=0;
			p2rotationX=0;
			if (Forehands==true && ball.position.y>=0){
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;
				ballHit('2l');
				//ballSpeed=ballSpeed*1.02;
				if(serveRound===true&&lastServer===2){
					serveRound=false;
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((-ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;

				baseSpeed+=0.1;
				lastServer=1;
			}	
			// move right
			else if (Forehandl==true&& ball.position.y>=0){
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;

				ballHit('2r');

				if(serveRound===true&&lastServer===2){
					serveRound=false;				
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((-ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;
				//ballSpeed=ballSpeed*1.02;

				baseSpeed+=0.1;
				lastServer=1;

			}
			// else don't move paddle
			else if (Backhandl==true&& ball.position.y<=0)
			{
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;

				ballHit('2l');

				if(serveRound===true&&lastServer===2){
					serveRound=false;
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((-ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;
				//ballSpeed=ballSpeed*1.02;

				baseSpeed+=0.1;
				lastServer=1;


			}
			else if (Backhands==true&& ball.position.y<=0)
			{
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;
				p2Forehands=false;p2Forehandl=false;p2Backhands=false;p2Backhandl=false;

				ballHit('2r');

				if(serveRound===true&&lastServer===2){
					serveRound=false;
					ballSpeed=1;
				}
				else{
					ballSpeed=baseSpeed*((-ball.position.x-115)/20+1);
				}

				hitpointX=ball.position.x;
				hitpointZ=ball.position.z;
				//ballSpeed=ballSpeed*1.02;

				baseSpeed+=0.1;
				lastServer=1;

			}
		}
		else{
				Forehands=false;Forehandl=false;Backhands=false;Backhandl=false;}

		//paddle1.position.y += paddle1DirY;
	}

	// Handles camera and lighting logic
	function cameraPhysics()
	{
		// we can easily notice shadows if we dynamically move lights during the game
		spotLight.position.x = ball.position.x * 2;
		spotLight.position.y = ball.position.y * 2;
		
		// move to behind the player's paddle
		camera.position.x = paddle1.position.x - 100;
		camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
		camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
		
		// rotate to face towards the opponent
		camera.rotation.x = -0.01 * (ball.position.y) * Math.PI/180;
		camera.rotation.y = -60 * Math.PI/180;
		camera.rotation.z = -90 * Math.PI/180;
	}

	// Handles paddle collision logic
	function paddlePhysics()
	{
		
	}


	var ballHit=function(where){

		if(where=="1l"){
			ballDirX=(-fieldWidth/2-ball.position.x)/(Math.sqrt(((fieldWidth+2*ball.position.x)*(fieldWidth+2*ball.position.x)+(fieldHeight-2*ball.position.y)*(fieldHeight-2*ball.position.y))/4));
			ballDirY=(fieldHeight/2-ball.position.y)/(Math.sqrt(((fieldWidth+2*ball.position.x)*(fieldWidth+2*ball.position.x)+(fieldHeight-2*ball.position.y)*(fieldHeight-2*ball.position.y))/4));
		}
		else if(where=="1r"){
			ballDirX=(-fieldWidth/2-ball.position.x)/(Math.sqrt(((fieldWidth+2*ball.position.x)*(fieldWidth+2*ball.position.x)+(fieldHeight-2*ball.position.y)*(fieldHeight-2*ball.position.y))/4));
			ballDirY=(-fieldHeight/2-ball.position.y)/(Math.sqrt(((fieldWidth+2*ball.position.x)*(fieldWidth+2*ball.position.x)+(fieldHeight-2*ball.position.y)*(fieldHeight-2*ball.position.y))/4));
		}
		else if(where=="2l"){
			ballDirX=(fieldWidth/2-ball.position.x)/(Math.sqrt(((fieldWidth-2*ball.position.x)*(fieldWidth-2*ball.position.x)+(fieldHeight-2*ball.position.y)*(fieldHeight-2*ball.position.y))/4));
			ballDirY=(fieldHeight/2-ball.position.y)/(Math.sqrt(((fieldWidth-2*ball.position.x)*(fieldWidth-2*ball.position.x)+(fieldHeight-2*ball.position.y)*(fieldHeight-2*ball.position.y))/4));
		}
		else if(where=="2r"){
			ballDirX=(fieldWidth/2-ball.position.x)/(Math.sqrt(((fieldWidth-2*ball.position.x)*(fieldWidth-2*ball.position.x)+(fieldHeight+2*ball.position.y)*(fieldHeight+2*ball.position.y))/4));
			ballDirY=(-fieldHeight/2-ball.position.y)/(Math.sqrt(((fieldWidth-2*ball.position.x)*(fieldWidth-2*ball.position.x)+(fieldHeight+2*ball.position.y)*(fieldHeight+2*ball.position.y))/4));
		}

	};

	var ballBounce=function(){
		if (serveRound){
			ball.position.z=Math.abs(Math.cos(ball.position.x*(2*Math.PI/fieldWidth)))*35+5;
		}
		else{

			//ball.position.z=Math.abs(Math.cos(ball.position.x*(2*Math.PI/fieldWidth)))*35+5;//serve
			if(lastServer===2){
				if(ball.position.x<=0){
					ball.position.z=Math.abs(Math.cos(ball.position.x*(2*Math.PI/fieldWidth)))*35+5;
				}
				else if(ball.position.x>0){
					ball.position.z=hitpointZ+Math.abs(Math.cos(ball.position.x*(Math.PI/(hitpointX*2))))*(40-hitpointZ);
				}

			}
			else if(lastServer===1){
				if(ball.position.x>=0){
					ball.position.z=Math.abs(Math.cos(ball.position.x*(2*Math.PI/fieldWidth)))*35+5;
				}
				else if(ball.position.x<0){
					ball.position.z=hitpointZ+Math.abs(Math.cos(ball.position.x*(Math.PI/(hitpointX*2))))*(40-hitpointZ);
				}
			}
		}
	};


	var resetBall=function(server)
	{
		// position the ball in the center of the table
		
		ballSpeed=1;
		baseSpeed=1;
		// if player lost the last point, we send the ball to opponent
		if (server == 1)
		{
			ball.position.x = -fieldWidth/2+15;
			ball.position.y = 0;
			lastServer=1;
		}
		// else if opponent lost, we send ball to player
		else
		{
			ball.position.x = fieldWidth/2-15;
			ball.position.y = 0;
			lastServer=2;

		}
		
		// set the ball to move +ve in y plane (towards left from the camera)
		ballDirX = 0;
		ballDirY = 0;
		serveRound=true;
	}

	// var bounceTime = 0;
	// checks if either player or opponent has reached 7 points
	function matchScoreCheck()
	{
		// if player has 7 points
		if (score1 >= maxScore)
		{
			// stop the ball
			ballSpeed = 0;
			// write to the banner
			document.getElementById("p1score").innerHTML = "Player1 wins!";		
			document.getElementById("p2score").innerHTML = "Refresh to play again";
			// // make paddle bounce up and down
			// bounceTime++;
			// paddle1.position.z = Math.sin(bounceTime * 0.1) * 10;
			// // enlarge and squish paddle to emulate joy
			// paddle1.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
			// paddle1.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
		}
		// else if opponent has 7 points
		else if (score2 >= maxScore)
		{
			// stop the ball
			ballSpeed = 0;
			// write to the banner
			document.getElementById("p1score").innerHTML = "Player2 wins!";
			document.getElementById("p2score").innerHTML = "Refresh to play again";
			// // make paddle bounce up and down
			// bounceTime++;
			// paddle2.position.z = Math.sin(bounceTime * 0.1) * 10;
			// // enlarge and squish paddle to emulate joy
			// paddle2.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
			// paddle2.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
		}
	}

    return {
        setup: setup,
        
    };
})()