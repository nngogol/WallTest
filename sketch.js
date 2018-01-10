
var gui;
// var myAngle = 30;
// var myMass = '#eeee00';

var IsRain = false;

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
var ground;
var ground2;
var ground3;
var boxes = [];

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
}

function setup(){
	createCanvas(600, 600)
	mkBtn("clear all objects", ['btn', 'rounded', 'btn-primary'], [['display', 'flex'], ['margin', '10px']], () => {
		boxes.forEach(x => x.die())
		boxes = []
	})

	mkBtn("Stop Rain", ['btn', 'rounded', 'btn-primary'], [['display', 'flex'], ['margin', '10px']], (selfBtn) => {
		IsRain = !IsRain;
		if (IsRain) {
			selfBtn.addClass('btn-warning')
			selfBtn.removeClass('btn-primary')	
			selfBtn.html("Rain: On")
		}else{
			
			selfBtn.addClass('btn-primary')
			selfBtn.removeClass('btn-warning')	
			selfBtn.html("Rain: Off")
			
		}
	})


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

	setInterval(() => {
		if (IsRain) {
			spawnRandom(random(20,width*.8), -random([200,400, 600, 800, 100]), 50, 50)
			spawnRandom(random(20,width*.8), -random([200,400, 600, 800, 100]), 50, 50)
		}
	},900)

	// setInterval(() => {
	// 	random(boxes).RandomPunch()
	// },900)

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
	ground2.show();
	ground3.show();

	for (let i = boxes.length-1; i >= 0; i--) {
		if (boxes[i].isOverEdge()) {
			boxes.splice(i,1)
		}
	}
	boxes.forEach( b => b.show())

}

