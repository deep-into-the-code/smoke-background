var numberOfParticles = 10000;
var particles = [];
var a1, a2, a3, a4, a5, aMax;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  noFill();
  colorMode(HSB, 360, 255, 255, 255);
  strokeWeight(0.1);
  reset();
}

function reset() {
  noiseDetail(int(random(1, 5)));
  aMax = 5;
  a1 = random(1, aMax);
  a2 = random(1, aMax);
  a3 = random(1, aMax);
  a4 = random(1, aMax);
  a5 = 10;

  for (let i = 0; i < numberOfParticles; i++) {
    particles[i] = new Particle(i);
  }
}

function draw() {

  for (let i = 0; i < numberOfParticles; i++) {
    particles[i].run();
  }
}

function Particle(index) {
  this.index = index;
  this.velocity = createVector(200, 200, 200);
  this.acceleration = createVector(200, 200, 200);
  this.position0 = createVector(random(0, width), random(0, height), random(0, sin(height)));
  this.position = this.position0.copy();
  this.trans = random(50, 100);
  // this.hu = (noise(a1 * cos(PI * this.position.x * width), a1 * sin(PI * this.position.y / height))* 720) % random(360); 
  // this.sat = noise(a2 * sin(PI * this.position.x * width), a2 * sin(PI * this.position.y / height))* 255;
  // this.bri = noise(a3 * cos(PI * this.position.x * width), a3 * cos(PI * this.position.y / height))* 255;

  this.run = () => {
    this.update();
    this.show();
  }

  this.update = () => {
    this.velocity = createVector(1 - 2 * noise(a4 + a2 * sin(TAU * this.position.x / width), a4 + a2 * sin(TAU * this.position.y / height)),
      1 - 2 * noise(a2 + a3 * cos(TAU * this.position.x / width), a4 + a3 * cos(TAU * this.position.y / height))
    );

    this.velocity.mult(a5);

    this.velocity.rotate(sin(90) * noise(a4 + a3 * sin(TAU * this.position.x / width)));
    this.position0 = this.position.copy();
    this.position.add(this.velocity);
  }

  this.show = () => {

    // stroke(255, this.trans);
    stroke((frameCount) % 255, 255, 255, this.trans);

    line(this.position0.x, this.position0.y, this.position.x, this.position.y);

    if (this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0) {
      this.position0 = createVector(random(0, width), random(0, height), random(8, width * height));
      this.position = this.position0.copy();
    }

  }
}
