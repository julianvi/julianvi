var y1 = 1, y2 = 50, state = 0, limit = 70, angle= 0;
function setup(){ 
	createCanvas(windowWidth,760);
	background(20);
	strokeWeight(1);
	frameRate(30);
	angleMode(DEGREES);
}

function draw(){
	background(20,100);
	noFill();
	stroke(random(200,250),0,map(mouseY,0,height,0,250),200);
	
	translate(width/2,height/2);
	rotate(angle);
	//scale(map(mouseY,0,height,0,1));
	for (var i = 0; i<100; i+=2) {	
		translate(0,i);
		rotate(angle);
		ellipse(0,0,50+i,height);
	}

	if (y1 < limit){
		y1++; 
		state = y1
		if (y1 == limit) y2 = limit
	}
	else if (y1 == limit) { 
		y2--; 
		state = y2;
		if (y2 == 1) y1 = 1
	}
	angle+=limit
}
