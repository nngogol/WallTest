// aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Common = Matter.Common;
var Mouse = Matter.Mouse;
var Constraint = Matter.Constraint;
var MConstraint = Matter.MouseConstraint;

var world;
var engine;
var mConstraint;
var mycanvas;

// floor
let wall;
let circle;
let ground;
let ground2;

// all boxes

// html button
let massCircle;
let punchForce;
let WallWidth;
let WallDensity;

function htmlSetup(){
	// select sliders

	massCircle = select("#massCircle")
	massCircleVal = select("#massCircleVal")
	
	punchForce = select("#punchForce")
	punchForceVal = select("#punchForceVal")
	
	wallWidth = select("#WallWidth")
	wallWidthVal = select("#WallWidthVal")
	
	wallDensity = select("#WallDensity")
	wallDensityVal = select("#WallDensityVal")
	
	$("#massCircle").on("slide", slideEvt => {
		$("#massCircleVal").text(slideEvt.value);
		circle.changeMass(slideEvt.value)
	});

	$("#punchForce").on("slide", slideEvt => {
		$("#punchForceVal").text(slideEvt.value);
		circle.changePunchForce(slideEvt.value)
	});

	$("#WallWidth").on("slide", slideEvt => {
		$("#WallWidthVal").text(slideEvt.value);
		wall.changeWallWidth(slideEvt.value)
	});

	$("#WallDensity").on("slide", slideEvt => {
		$("#WallDensityVal").text(slideEvt.value);
		wall.changeWallDensity(slideEvt.value)
	});

}

function setup(){
	mycanvas = createCanvas(900, 400)
	mycanvas.parent("#canvasDiv")
	htmlSetup();
	// clear all objects btn

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
	ground = new Ground(0, height-50, width*2, 120);
	ground2 = new Ground(width*.75, height-80, width*.25, height*.25);
	wall = new Wall(width/4, height-120, 40, 100, 1);
	circle = new Circle(width*.75, height-100, 22)
	// RUN
	Engine.run(engine);

	// Rain logic

}

function mouseWheel(){
	wall.addRandomBlockAtMouse()
}


let isSlowTiming = false;
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

function keyPressed(event){
	switch (event.key) {
		case 'a':                     TimeBottle(); break;
		case 'q':	case 'w':	case 'e':	wall.shake();	break;
		case 's':	                    wall.clear();	break;
		case 'd':	                    wall.addRandomBlock(); break;

		case '8':	                    circle.RandomPunchUp(); break;
		case '4':	                    circle.RandomPunchLeft(); break;
		case '6':	                    circle.RandomPunchRight(); break;
		case '2':	                    circle.RandomPunchDown(); break;
		
		default: break;
	}
}

function draw(){
	// draw grey background
	background(89)
	
	// show boundaries
	ground.show();
	ground2.show();

	// show wall
	wall.update();
	wall.show();
	
	// show circle
	circle.show();

}

