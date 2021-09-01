var x = 0, y = 0, angle = 0, speed= 90;
var targetX = 0, targetY = 0;
function setup() {
	createCanvas(windowWidth,760);
	background(20);
	angleMode(DEGREES);
	frameRate(60);
	strokeWeight(1);
	stroke(20)
}


function draw(){
	background(250,150);
	stroke(0,map(mouseX,0,width,0,220),map(mouseY,0,height,0,220),250);
	noFill();
	translate(width/2,height/2);
	rotate(angle);

	for (var j = 0; j < 10 ; j++) {
		push();
		rotate(j*(360/8));
		translate(0,map(mouseX,0,width,0,200));	
		ellipse(0,0,20,20);

		rotate(angle);					
		for (var i = 0; i < 6; i++) {
			push();
			rotate(i*(360/6));
			translate(0,map(mouseX,0,width,0,200));	
			ellipse(0,0,50,20);		
			pop();
		}
		pop();
	}
	angle+=speed;
}
//311 787 49 89

// random position
function rPosition(modulo){
	//print(frameCount%modulo);
	if (frameCount%modulo == 0) {
		targetX = random(300, width-300);
		targetY = random(0, height);
	//	print(targetX, targetY)
	}
}
