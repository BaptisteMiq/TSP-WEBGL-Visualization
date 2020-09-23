// List of flies
const flies = [];

// Number of flies
const fliesNumber = 10;

// Total length of links
let poidsTot = 0;

// Z camera position (zoom)
let deltaZ = 0;

// Drawing lines in P5 3D context
p5.RendererGL.prototype.line = function() {
  var args = arguments;
  this.beginShape();
  this.vertex(args[0], args[1], args[2]);
  this.vertex(args[3], args[4], args[5]);
  this.endShape();
  return this;
}

// Loading external files (models, fonts)
let bee = null;
let font = null;
function preload() {
  font = loadFont('font.otf');
  bee = loadModel('BEE.OBJ', true);
}

// Setting up screen and flies
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  flies[0] = new Fly(true); // First fly (red sphere)
  for(let i = 0; i < fliesNumber; i++) {
    flies.push(new Fly());
  }
}

// Managing mouse wheel for the zoom
function mouseWheel(event) {
  deltaZ += event.delta / 2;
}

function draw() {
  background(0);
  camera(0, 0, 20 + deltaZ, 0, 0, 0, 0, 1, 0);
  stroke(255);

  // Nearest neighbour algorithm
  let actualFly = flies[0];
  for(let i = 0; i < flies.length; i++) {
    actualFly.linked = true;
    let nFly = actualFly.getNearest();
    if(nFly === null) {
     nFly = flies[0]; // Return to the first fly at the end
    }
    
    // Drawing link
    push();
    translate(-width / 2, -height / 2, 0);
    line(actualFly.pos.x, actualFly.pos.y, actualFly.pos.z, nFly.pos.x, nFly.pos.y, nFly.pos.z);
    pop();
    
    // Drawing link number
    push();
    fill(255);
    textFont(font);
    translate((actualFly.pos.x + nFly.pos.x) / 2 -width / 2, (actualFly.pos.y + nFly.pos.y) / 2 -height / 2, actualFly.pos.z);
    text(i+1, 0, 0);
    pop();
    
    // Drawing fly
    actualFly.show();

    actualFly = nFly;
  }

  // Reset algorithm
  flies.forEach(f => f.linked = false);
  poidsTot = 0;

  // Running the algorithm only one time at start
  //noLoop();
}

class Fly {
  constructor(s = false) {
    this.pos = createVector(random(0, width), random(0, height), random(-1000, 1000));
    this.start = s;
    this.linked = false;
  }
  show() {
    push();

    // Drawing sphere
    translate(this.pos.x - width / 2, this.pos.y - height / 2, this.pos.z);
    fill(255);
    if(this.start) {
      stroke(255, 0, 0);
      fill(255, 0, 0);
    } else {
      stroke(120);
    }
    
    sphere(10);

    // Drawing sphere position
    //text(`${round(this.pos.x)}; ${round(this.pos.y)}`, this.pos.x - 5, this.pos.y + 15);

    pop();
  }
  getNearest() {
    // Get and return the nearest fly
    let dist = 1e9;
    let nFly = null;
    flies.forEach(f => {
      let aDist = this.pos.dist(f.pos); // Eucledian distance between two vectors
      if(!f.linked && aDist < dist && aDist > 0) {
        dist = aDist;
        nFly = f;
        poidsTot += dist;
      }
    });
    return nFly;
  }
}







