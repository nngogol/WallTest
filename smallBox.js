class smallBox{
  constructor(x, y, w, h){

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.options = {
      friction: 0.1
    }
    this.text = random(['Даниил', 'Мета', 'Земля','Слизь','Еда','Деньги','КОБ','blockchain', 'ИИ', 'Код','Чат', ])
    this.color = color(random(140,240),random(40,50),random(0,150))
    this.matterBox = Bodies.rectangle(x, y, w, h, this.options);
    World.add(world, this.matterBox );
  }

  isOverEdge(){
    return  this.matterBox.position.x > width+100 ||
            this.matterBox.position.x < 0-100 ||
            this.matterBox.position.y > height+100
  }

  die(){
    World.remove(world, this.matterBox);
  }

  RandomPunch(){
    // this.matterBox.applyForce(Matter.Vector.create(4,5), Matter.Vector.create(5,8))
  }

  show(){

    let pos = this.matterBox.position;
    let angle = this.matterBox.angle;
    push()
      // transformation
      translate(pos.x, pos.y)
      rotate(angle)
      rectMode(CENTER)

      // style
      fill(255, 9, 66)
      fill(this.color)
      // color

      rect(0, 0, this.w, this.h)
      stroke(0)
      fill(255)
      textAlign(CENTER)
      text(this.text, 0 , 0)
    pop()
  }
}