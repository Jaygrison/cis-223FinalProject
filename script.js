let stars = [];
let planets = [];
let cam;

function setup() {
  createCanvas(800, 600, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 500); // Set initial camera position
  
  // Create stars
  for (let i = 0; i < 800; i++) {
    stars.push(createVector(random(-width, width), random(-height, height), random(-1000, 1000)));
  }
  
  // Create planets
  for (let i = 0; i < 5; i++) {
    planets.push(new Planet(40, random(TWO_PI)));
  }
}

function draw() {
  background(0);


  



  // Control camera movement
  if (keyIsDown(UP_ARROW)) {
    cam.move(0, -5, 0);
  }
  if (keyIsDown(DOWN_ARROW)) {
    cam.move(0, 5, 0);
  }
  if (keyIsDown(LEFT_ARROW)) {
    cam.move(-5, 0, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cam.move(5, 0, 0);
  }
  
  // Display stars
  push();
  noStroke();
  fill(255);
  for (let star of stars) {
    let sx = star.x;
    let sy = star.y;
    let sz = star.z;
    translate(sx, sy, sz);
    sphere(3);
    translate(-sx, -sy, -sz);
  }
  pop();
  
  // Display and update planets
  for (let planet of planets) {
    planet.display();
    planet.update();
  }
}

class Planet {
  constructor(radius, angle) {
    this.radius = radius;
    this.angle = angle;
    this.speed = random(0.0001, 0.0003);
  }
  
  display() {
    push();
    rotateY(this.angle);
    translate(300, 0, 0);
    normalMaterial();
    fill(255, 0, 0);
    sphere(this.radius);
    pop();
  }
  
  update() {
    this.angle += this.speed;
  }
}
