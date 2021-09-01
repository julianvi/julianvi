// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Separation and Seek

// The "Vehicle" constructor

function Vehicle(x, y) {
  // All the usual stuff
  this.position = createVector(x, y);
  this.r = 12;
  this.maxspeed = 10;    // Maximum speed
  this.maxforce = 3;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  this.applyBehaviors = function(vehicles,seekF) {

    var separateForce = this.separate(vehicles);
    var target = this.target(seekF);
    var seekForce = this.seek(target);
    separateForce.mult(random(3,5));
    seekForce.mult(3);
    this.applyForce(separateForce);
    this.applyForce(seekForce);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby vehicles and steers away
  this.separate = function(vehicles) {
    var desiredseparation = 20;
    var sum = createVector();
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  this.target =  function(list) {
    let record = Infinity;
    let closest = -1;
    for (var i = 0; i < list.length; i++){
      var d = dist(this.position.x, this.position.y, list[i].x, list[i].y);
      if (d < record) {
        record = d;
        closest = i;
      }
    }
    return list[closest];
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    if (desired.mag() < 40){


      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus velocity
      
    }
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }

  // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.display = function(alp, col) {
    fill(127);
    stroke(random(red(col)-10,red(col)),random(green(col)-10,green(col)),random(blue(col)-10,blue(col)),alp);
    strokeWeight(random(2,2.5));
    push();
    translate(width/2, height/2);
    point(this.position.x, this.position.y);
    pop();
  }

  // Wraparound
  this.borders = function(wid,hei) {
    push();
    // translate(width/2,height/2);
    // if (this.position.x < -wid/2) this.position.x =  wid/2;
    // if (this.position.y < -hei/2) this.position.y =  hei/2;
    // if (this.position.x >  wid/2) this.position.x = -wid/2;
    // if (this.position.y >  hei/2) this.position.y = -hei/2;
    if (this.position.x < -270) this.position.x =  270;
    if (this.position.y < -350) this.position.y =  350;
    if (this.position.x >  270) this.position.x = -270;
    if (this.position.y >  350) this.position.y = -350;

    pop()
  }
}