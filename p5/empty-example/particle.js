// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

var Particle = function() {
  this.pos = createVector(400, 50);
  this.vel = createVector(0.001, 0);
  this.acc = createVector(0, 0);
  this.mass = 1;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function() {
    stroke(0);
    strokeWeight(1);
    fill(255, 127);
    ellipse(this.pos.x, this.pos.y, this.mass*16, this.mass*16);
  };

  this.edges = function(){
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }
    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }
    if (this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }
    if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }
  };

}
