// In this final Project I used the p5 WEBGL 3D environment
// What I learned most is how the environment creates a 3rd, 3D coordinate z alond side x and y
// this coordinate creates the 3rd dimension which allows shapes or objects to move along a 3rd path
// I applied what I learned about functions to create planets by using custom parameters
// and arrays which can hold planet objects and can use the properties of those created objects
// I also applied a class which added in not using repetitive code from creating multiple lines of planet code
// I finally used WEBGL to create a small solar system where you can see the stars and planets through three dimentional viewing


// We create a planet class. The contructor will have the radius param and angle param
// we update the properties by the parameters
// The speed variable will use the random function
class Planet {
  constructor(radius, angle) {
    this.radius = radius;
    this.angle = angle;
    this.speed = random(0.9, 1.8);
  }
  
// we create a method called display to show the planet
// we use the push and pop function to save what is already coded before and after
// we rotate the planet by the angle variable
// we translate the planet to the x y z coordinates stated
// add a nostroke, with a texture given by a img using an element in an array
// we create the planet by the radius 
// we go back to the regular settings, pop
  display() {
    push();
    rotateY(this.angle);
    translate(300, 0, 0);
    noStroke();
    texture(img[1]);
    sphere(this.radius);
    pop();
  }
// we continue to update the angle and speed which is random
  update() {
    this.angle += this.speed;
  }
}

// we create arrays and variables we will use for the creation
// an array for multiple planets
// an arry for multiple stars

let stars = [];
let planets = [];
let cam;
let mymodel;
let img;

// we preload images for the textures
// since we have 3 images, we save them in an array called img
// we upload a model and set to true. 

function preload() {
  img = []
  img[0] = loadImage("texture/ear0xuu2.jpg");
  img[1] = loadImage("texture/as10-31-4537.jpg");
  img[2] = loadImage("texture/ven0aaa2.jpg");
  mymodel = loadModel("Dawn_19.stl", true);

  
}

// with in setup function we create the canvas to the window size
// enter into WEBGL mode for the 3D environment
// create a cam using createcamera function
// set the camera position to the specified coordinates
// set angle mode to degree for the rotation around center
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 700); // Set initial camera 
  angleMode(DEGREES)
  
// we Create the stars
// use a for loop for 800 iterations
// we push new stars within the array
// we create vectors for the shape with random width and height
// we hard code the z coordinate within random
  for (let i = 0; i < 800; i++) {
    stars.push(createVector(random(-width, width), random(-height, height), random(-1000, 1000)));
  }
// We Create the planets
// we use another loop for 5 planet iteration
// within loop we push the new planet object with a radius of 23
// with the angle being random and we set to two pi for the radians in 360 degrees
  for (let i = 0; i < 5; i++) {
    planets.push(new Planet(23, random(TWO_PI)));
  }
}
  

function draw() {
  background(0);

// we create a function for another different size planet
// we rotate by framecount times 5 thousandths
// give one of the textures within the img array
// move the planet to what x or y is minus the width and height divided by 2
// create the planey by the given radius
  function biggerPlanet(x, y, radius) {
    rotateY(frameCount * .005);
    texture(img[2]);
    translate(x - width / 2, y - height / 2);
    sphere(radius);
    
  }  


// we use orbit control to be able to use the mouse to move the canvas 
  orbitControl();

// add a push to save the code
// add directional light and ambient light and material to set up a color for a model
// we use translate to put model into a certain coordinate
// we call the model using model function
  push();
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  ambientLight(250);
  ambientMaterial(255, 0, 0);
  translate(0, 100, 400);
  model(mymodel);
  
// we pop out of the certain code back to regular
  
  pop();

// we create another plane
// we create a angle for the planet
// texture will be an element from the array
// we create the planet using sphere function
  let angle = frameCount * 0.02;
  rotate(angle);
  texture(img[0]);
  noStroke();
  sphere(75);
  
  
  

// we create keydown presses for camera movement
// we use key is down function for up, down, left and right
// we move y coordinate up 5 or down 5 pixels when key is up and down
// we move x coordinate up 5 or down 5 pixels when key is left or right
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
  
// we push again for the drawing of the stars
// add no stroke
// we use for loop for the array stars
// we create variables for x, y, and z which is random in setup
// we include those variables within translate function
// create the stars by sphere
// then another translate function for negative coordinates
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

// we pop back to regular
  pop();

  
// we then Display and update planets using for loop 
// we access the array and within the loop we use the display method and update method from the planet class
  for (let planet of planets) {
    planet.display();
    planet.update();
  }
// we lastly call the biggerplanet function to create the final planet
  biggerPlanet(0, 0, 200);
}

