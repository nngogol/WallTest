class Ground{
  constructor(x, y, w, h){

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.matterGround = Bodies.rectangle(x, y, w, h, { isStatic: true });
    World.add(world, this.matterGround );
  }

  show(){

    let pos = this.matterGround.position;
    // let angle = this.matterGround.angle;
    push()
      // transformation
      translate(pos.x, pos.y)
      // rotate(angle)
      rectMode(CENTER)

      // style
      noStroke()
      fill(11, 30,  25)

      rect(0, 0, this.w, this.h)
    pop()
  }
}