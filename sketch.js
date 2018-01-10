
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

function setup(){
	createCanvas(600, 600)
	gui = createGui('p5.gui');
	gui.addGlobals('Mass', 'WallWidth', 'WallDensity', 'ForceBall');



	background(51)
}


function draw(){
 
}

