

let stars = [];
let planets = [];
let cam;
let model;
let img;



function preload() {
  img = []
  img[0] = loadImage("texture/ear0xuu2.jpg");
  img[1] = loadImage("texture/as10-31-4537.jpg");
  img[2] = loadImage("texture/ven0aaa2.jpg");
  model = loadModel("texture/Dawn_19.stl", true, handleModel, handleError);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 700); // Set initial camera 
  angleMode(DEGREES)
  
  // Create stars
  for (let i = 0; i < 800; i++) {
    stars.push(createVector(random(-width, width), random(-height, height), random(-1000, 1000)));
  }
  
  // Create planets
  for (let i = 0; i < 5; i++) {
    planets.push(new Planet(23, random(TWO_PI)));
  }
}
  

function draw() {
  background(0);


  function biggerPlanet(x, y, radius) {
    rotateY(frameCount * .005);
    texture(img[2]);
    translate(x - width / 2, y - height / 2);
    sphere(radius);
    
  }  

  orbitControl();
  
  //translate(0, 0, -200);
  //model(model);

  let angle = frameCount * 0.02;
  rotate(angle);
  texture(img[0]);
  noStroke();
  sphere(75);
  
  
  

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
  biggerPlanet(10, 0, 250);
}

class Planet {
  constructor(radius, angle) {
    this.radius = radius;
    this.angle = angle;
    this.speed = random(0.9, 1.8);
  }
  
  display() {
    push();
    rotateY(this.angle);
    translate(300, 0, 0);
    noStroke();
    texture(img[1]);
    sphere(this.radius);
    pop();
  }
  
  update() {
    this.angle += this.speed;
  }
}
