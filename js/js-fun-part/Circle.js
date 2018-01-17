class Circle{
  constructor(x, y, r){

    this.x = x
    this.y = y
    this.r = r
    this.options = {
      friction: 0.01
      ,density: 1
      ,mass: 15
    }
    this.punch_amount = 15

    this.text = random(5,5000)
    this.color = color(random(0,240),255,255)
    this.colorRandom = color(random(255),random(255),random(255))
    this.body = Bodies.circle(x, y, r, this.options);
    World.add(world, this.body);
  }

  isOverEdge(){
    var pos = this.body.position;
    return  (pos.x > width+100 || pos.x < 0-100 || pos.y > height+100);
  }

  die(){
    World.remove(world, this.body);
  }

  changePunchForce(valuee){
    this.punch_amount = valuee;
  }

  changeMass(valuee){
    this.body.mass = valuee
  }


  RandomPunchDirection(direction){
    let pos = this.body.position;
    let forceMagnitude = .005 * this.body.mass;
    Matter.Body.applyForce(this.body, this.body.position, { 
      x: (forceMagnitude + Common.random() * forceMagnitude) * (direction.x * this.punch_amount), 
      y: (-forceMagnitude + Common.random() * -forceMagnitude) * (direction.y * this.punch_amount)
    });
  }

  RandomPunchRight(){
    this.RandomPunchDirection({x:1,y:0})
  }

  RandomPunchLeft(){
    this.RandomPunchDirection({x:-1,y:0})
  }

  RandomPunchUp(){
    this.RandomPunchDirection({x:0,y:1})
  }

  RandomPunchDown(){
    this.RandomPunchDirection({x:0,y:-1})
  }

  show(){

    let pos = this.body.position;
    let angle = this.body.angle;

    push();

    colorMode(HSL)
    noStroke();
    fill(this.color)

    translate(pos.x, pos.y);
    rotate(angle)

    ellipse(0, 0, this.r * 2);
    pop();
  }
}