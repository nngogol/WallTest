class smallBox{
  constructor(x, y, w, h){

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.options = {
      friction: 0.1
      ,density: 6
      ,mass: 5
    }
    this.text = random([
    'Счастье',
     'Bob Ross',
     'Колобок',
     'Курс Рубля',
     'Гном',
     'Акробат',
     'Бык',
     'JS',
     'Клетка',
     'Музыка',
     'BWM',
     'Помидорка',
      'Радуга' ])
    this.color = color(random(140,240),random(40,50),random(0,150))
    this.colorRandom = color(random(255),random(255),random(255))
    this.matterBox = Bodies.rectangle(x, y, w, h, this.options);
    World.add(world, this.matterBox );
    
    // in future:
    //this.texture = img
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
    let pos = this.matterBox.position;
    let forceMagnitude = .005 * this.matterBox.mass;
    Matter.Body.applyForce(this.matterBox, this.matterBox.position, { 
      x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
      y: -forceMagnitude + Common.random() * -forceMagnitude
    });
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

      //body
      // rect(0, 0, this.w, this.h)
      stroke(this.colorRandom)
      strokeWeight(3)
      rect(0, 0, this.w, this.h)
      
      if (this.texture) {
        imageMode(CENTER)
        image(this.texture, 0, 0, this.w, this.h)
      }
      
      // text
      stroke(255, 120)
      strokeWeight(.3)
      noFill()
      textFont(24)
      textAlign(CENTER)
      text(this.text, 0 , 0)
    pop()
  }
}