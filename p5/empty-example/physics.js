function Particle(x, y, m) {
	this.pos = createVector(x, y); 
	this.vel = createVector(1,0);
	this.acc = createVector(0,0);
	this.mass = m;

	this.applyForce = function(force){
		var f = force.copy();
		//f.div(this.mass);
		this.acc.add(f);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0,0);
	}
	
	this.display = function() {
		//fill(255);
		noStroke();
		fill(random(255),random(200,255));
		ellipse(this.pos.x, this.pos.y, this.mass*2 , this.mass*2);
	}

	this.edges = function(){
		if (this.pos.y > height*2) {
			this.vel.y *= -1;
			this.pos.y = height*2;
		}
		if (this.pos.x > width*2) {
			this.vel.x *= -1;
			this.pos.x = width*2;
		}
		if (this.pos.y < 0) {
			this.vel.y *= -1;
			this.pos.y = 0;
		}
		if (this.pos.x < 0) {
			this.vel.x *= -1;
			this.pos.x = 0;
		}
		
	}
	this.collision = function(particle){
		if (this.pos.x > (particle.pos.x-48) && this.pos.x < (particle.pos.x+48)){
			this.vel.x *= -1;
			particle.vel.x *= -1;
			ellipse(width/2,height/2,10,10); 
			if (this.vel.x * particle.vel.x > 0){ this.vel.x *= -1 }
			if (this.pos.x < particle.pos.x){ this.pos.x = particle.pos.x - 48;}
			if (this.pos.x > particle.pos.x){ this.pos.x = particle.pos.x + 48;}
			
		}
	}
} 