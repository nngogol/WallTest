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

var img
var world;
var engine;
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
	img = loadImage('logo.jpg')
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

// make a html button
function mkBtn(label, classes, styles=[['display', 'flex']], clicked){
	let btn = createButton(label)
	btn.mouseClicked(() => {
		clicked(btn)
	})
	// apply each style
	styles.map( stl => {
		btn.style(stl[0], stl[1])
	})
	// apply each class
	classes.map( cls => {
		btn.addClass(cls)
	})

	return btn
}


function setup(){
	createCanvas(600, 600)
	// clear all objects btn
	mkBtn("clear all objects", ['btn', 'rounded', 'btn-primary'], [['display', 'flex'], ['margin', '10px']], () => {
		boxes.forEach(x => x.die())
		boxes = []
	})
	
	// move all objects randomly (just apply force)
	mkBtn("Random Punch", ['btn', 'rounded', 'btn-primary'], [['display', 'flex'], ['margin', '10px']], () => {
		boxes.forEach(x => x.RandomPunch())
	})

	// Start to swan objects
	enable_rain_button = mkBtn("Rain: On", ['btn', 'rounded', 'btn-warning'], [['display', 'flex'], ['margin', '10px']], enableRain)


	// setup gui
	// gui = createGui('p5.gui',700,30);
	// gui.addGlobals('Mass', 'WallWidth', 'WallDensity', 'ForceBall');
	

	// setup physics
	engine = Engine.create();
	world = engine.world;

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
			spawnRandom(random(20,width*.8), -random([20,40, 60, 80, 10]), 70, 20)
			spawnRandom(random(20,width*.8), -random([20,40, 60, 80, 10]), 70, 20)
		}
	},500)

}

function TimeBottle() {
	
}

function keyPressed(event){	// if key  is pressed
	switch (event.key) {
		
		// punch all objects in random direction
		case 'q':	boxes.forEach(x => x.RandomPunch());	break;
		case 'w':	boxes.forEach(x => x.RandomPunch());	break;
		case 'e':	boxes.forEach(x => x.RandomPunch());	break;
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

function mouseClicked(){
	// spawn box where mouse is
	spawnRandom(mouseX+ random(4, 5),
							mouseY+ random(4, 5),
							random(30, 60),
							random(50, 60));
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

