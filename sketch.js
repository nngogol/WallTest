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

// floor
var wall;
var circle;
var ground;
var ground2;

// all boxes

// html button
var enable_rain_button
var IsRaining = true;


function setup(){
	mycanvas = createCanvas(900, 400)
	mycanvas.parent("#canvasDiv")
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

