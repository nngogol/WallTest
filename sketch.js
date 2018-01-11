// p5.gui controls
var gui;
var Mass = 3;
var MassMin = 1;
var MassMax = 10;
var MassStep = .1;

var WallWidth = 25;
var WallWidthMin = 20;
var WallWidthMax = 200;
var WallWidthStep = 1;

var WallDensity = .5;
var WallDensityMin = 0;
var WallDensityMax = 1;
var WallDensityStep = .1;

var ForceBall = 5;
var ForceBallMin = 1;
var ForceBallMax = 10;
var ForceBallStep = 1;

// aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Common = Matter.Common;
var Mouse = Matter.Mouse;
var Constraint = Matter.Constraint;
var MConstraint = Matter.MouseConstraint;

var img
var world;
var engine;
var mConstraint;
var mycanvas;
// ground boundary objects

// floor
var ground;

// and two walls
var ground2;
var ground3;

// all boxes
var boxes = [];

// html button
var enable_rain_button
var IsRaining = true;

function preload(){
	// loads a image for box texture
	// img = loadImage('logo.jpg')
}


function enableRain(selfBtn) {
	IsRaining = !IsRaining;
		if (IsRaining) {
			selfBtn.addClass('btn-warning')
			selfBtn.removeClass('btn-primary')	
			selfBtn.html("Rain: On")
		}else{
			
			selfBtn.addClass('btn-primary')
			selfBtn.removeClass('btn-warning')	
			selfBtn.html("Rain: Off")
			
		}
}

function mouseWheel(e){
	spawnRandom(width/2+ random(4, 5),
							height/5+ random(4, 5),
							random(30, 40),
							random(50, 60));
}

function setup(){
	mycanvas = createCanvas(600, 600)
	mycanvas.parent("#canvasDiv")
	// clear all objects btn
	select("#clearBtn").mouseClicked(() => {
		boxes.forEach(x => x.die())
		boxes = []
	})
	select("#RandomPunch").mouseClicked(() => boxes.forEach(x => x.RandomPunch()))
	select("#enableRain").mouseClicked(enableRain)
	enable_rain_button = select("#enableRain")
	enable_rain_button.mouseClicked(() => enableRain(enable_rain_button))

	// setup gui
	// gui = createGui('p5.gui',700,30);
	// gui.addGlobals('Mass', 'WallWidth', 'WallDensity', 'ForceBall');
	

	// setup physics
	engine = Engine.create();
	world = engine.world;

	// add mouse control
	mouseConstraint = MConstraint.create(engine, {
			mouse: Mouse.create(mycanvas.elt),
			constraint: {
					stiffness: 0.2,
					render: {
							visible: false
					}
			}
	});

	World.add(world, mouseConstraint);

	// setup bodies in world
	boxes.push(new smallBox(300, 200, 22, 22))
	ground = new Ground(0, height-50, width*2, 120);
	ground2 = new Ground(0, height*.8, 50, height*.8);
	ground3 = new Ground(width-30, height*.8, 50, height*.8);
	
	// RUN
	Engine.run(engine);

	// Rain logic
	setInterval(() => {
		if (IsRaining) {
			if (boxes.length < 50) {
				
				spawnRandom(random(20,width*.8), -random([20,40, 60, 80, 10]), 40, 10)
				spawnRandom(random(20,width*.8), -random([20,40, 60, 80, 10]), 70, 20)
			}
		}
	},500)

}



var isSlowTiming = false;
function TimeBottle() {

	if (isSlowTiming){
		engine.timing.timeScale = 1
		isSlowTiming = !isSlowTiming
	}
	else{
		engine.timing.timeScale = .09
		isSlowTiming = !isSlowTiming
		
	}
}

function keyPressed(event){	// if key  is pressed
	switch (event.key) {
		// punch all objects in random direction
		case 'a': TimeBottle(); break;
		case 'q':
		case 'w':
		case 'e':	boxes.forEach(x => x.RandomPunch());	break;
		case 's':	boxes.forEach(x => x.die()); boxes = []; break;
		case 'd':	spawnRandom(mouseX+ random(4, 5),
													mouseY+ random(4, 5),
													random(30, 60),
													random(50, 60));
													break;
		// todo
		// case 'a':	TimeBottle();	break;
		
		// Toggle rain of objects
		case 'r':	enableRain(enable_rain_button); break;
		default: break;
	}
}

// spawns a random box
//     in x,y     -  position
//     with w,h   -  width and height
function spawnRandom(x,y,w,h){
	boxes.push(new smallBox(x,y,w,h));
}

function draw(){
	// draw grey background
	background(89)
	
	// show boundaries
	ground.show();
	ground2.show();
	ground3.show();
	
	// delete boxes if they are under edge -> optimization
	for (let i = boxes.length-1; i >= 0; i--) {
		if (boxes[i].isOverEdge()) {
			boxes.splice(i,1)
		}
	}

	// show all boxes
	boxes.forEach( b => b.show())

}

