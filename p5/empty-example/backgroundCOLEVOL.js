var x1,y1,x2,y2,a,f,p,l;
function setup(){ 
	createCanvas(windowWidth,windowHeight);
	background(20);
	strokeWeight(1);
	frameRate(30);
	angleMode(DEGREES);
}

function draw(){
	background(20,10, 50,30);
	noFill();
	stroke(color(127,255,0));
	a = 2;
	b = 2;
	stroke(color(0,206,209));
	translate(width/2,height/2);
	//j = random(-10,10);

	for (var j = -height/3; j < height/3; j+=250){
		for (var i = -width/(3+noise(millis()/1000)); i < width/(3+noise(millis()/1000)); i+=1) {
			a = map(noise(millis()/1000),0,1, 0, 100);
			f = map(noise(millis()/1000),0,1,1,10);
			p = map(noise(millis()/1000),0,1,0, 90);
			x1= i;
			y1= a * sin((x1 * f) + p);
			x2= i + 1;
			y2= a * sin((x2 * f) + p);
			stroke(color((second()%30),206-second()%10,209));
			line(x1,y1+j,x2,y2+j);	

		}
	}
}
