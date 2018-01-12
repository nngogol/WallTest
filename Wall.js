class Wall{
  constructor(x, y, w, h, d = 1){

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.options = {
      friction: 0.1
      ,density: d
      ,mass: 1
    }
    this.colorRandom = color(random(255),random(255),random(255))
    this.boxes = []

    this.delat = 10
    for (let i = x; i < w+x; i+=this.delat) {
      for (let j = y; j > y-h; j-=this.delat) {

        // adding
        this.boxes.push(new smallBox(i, j, this.delat, this.delat, color(0),
          {
            friction: .8
            ,density: 2
            ,mass: 10
          }));


      }
    }
    
    // in future:
    //this.texture = img
  }

  // adds block at mouse location
  addRandomBlockAtMouse(){
    let pos = {
      x: mouseX,
      y: mouseY
    } 
    this.addRandomBlock(pos)
  }

  // adds block at random location
  addRandomBlock(){
    let pos = {
      x: width + random(-150, 150),
      y: mouseX+ random(-40, 40)
    } 
    this.addRandomBlock(pos)
  }
  
  // adds block at given location
  addRandomBlock(pos, params = { w:random(30, 60),  h:random(20, 30) }){
    this.boxes.push(new smallBox(pos.x, pos.y, params.w, params.h))
  }

  shake(){
    this.boxes.forEach(x => x.RandomPunch());
  }

  update(){
    // delete 
    // this.boxes = this.boxes.filter(x => x.isOverEdge())
    for (let i = this.boxes.length-1; i >= 0; i--) {
      if (this.boxes[i].isOverEdge()) {
        this.boxes[i].die()
        this.boxes.splice(i,1)
      }
    }

  }

  clear(){
    this.boxes.forEach(x => x.die()); this.boxes = [];
  }

  show(){
    this.boxes.forEach( b => b.show())
  }
}