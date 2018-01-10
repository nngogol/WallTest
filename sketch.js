
var gui;
// var myAngle = 30;
// var myMass = '#eeee00';


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

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;

var world;
var engine;

var box1;
var ground;
var boxes = [];

function setup(){
	createCanvas(600, 600)

	// setup gui
	// gui = createGui('p5.gui');
	// gui.addGlobals('Mass', 'WallWidth', 'WallDensity', 'ForceBall');
	

	// setup physics
	engine = Engine.create();
	world = engine.world;

	// setup bodies in world
	boxes.push(new smallBox(300, 200, 22, 22))
	ground = new Ground(0, height-50, width*2, 120);
	
	// RUN
	Engine.run(engine);
	console.log(box1)
	background(51)
	setInterval(() => {
		// console.log(boxes.length)
		if (random(1,100) > 50) {
			
		}
		spawnRandom(width/2+ random(20,70), height/2+ random(20,70), 50, 50)
	},900)
}

function spawnRandom(x,y,w,h){
	boxes.push(new smallBox(x,y,w,h));
}

function mouseClicked(){
	spawnRandom(mouseX+ random(4, 5),
							mouseY+ random(4, 5),
							random(30, 60),
							random(50, 60));
}

function draw(){
	background(89)
	
	ground.show();

	for (let i = boxes.length-1; i >= 0; i--) {
		if (boxes[i].isOverEdge()) {
			boxes.splice(i,1)
		}
	}
	boxes.forEach( b => b.show())

}

