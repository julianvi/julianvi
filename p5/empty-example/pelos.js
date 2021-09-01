var y =10; angle = 0, speed= 5; millisecond = 0; 
var framer =30, rand = false;
function setup() {
	createCanvas(windowWidth,760-100);
	background(20);
	angleMode(DEGREES);
	frameRate(30);
	strokeWeight(1);
}
function draw(){
	background(10,2,10,50);
	translate(width/2,height/2);

	push();
	rotate(angle);
	//print (tofill(8,0.1,.4))
	//scale(tofill(8,0.1,.4));
	rectMat(1,1);
	pop();
	if (random(0,100) < 30){
		angle+=speed+40;		
	}
	//angle+=speed;

}

function sizze(m,n){
	dim = [round(width/m),round(height/n)];
	return dim;
}

function tofill(time = 8, val1 = 0.0, val2 = 1.0){
	if (key == "r") rand = !rand
	var val;
	var eightSeg = round(framer*8);	
	if (rand){ //random cada 8 segundos
			if (frameCount%eightSeg >= eightSeg - ((1/8)*eightSeg) && frameCount%eightSeg  <= eightSeg-1){
				val = round(random(val1,val2));
				background(200,0,200,160);
			}
		}

	return int(val);
}

function probabilityColor(pR, pG, pB){
	r = random(0,1);
	if (random(0,1) <= (pR/100))    pR = 250 * (pR/100)
	else pR=0
	if (random(0,1) <= (pG/100))    pG = 250 * (pG/100)
	else pG = 0
	if (random(0,1) <= (pB/100))	pB = 250
	else pB = 0
	//if (random(0,1) <= (pA/100))	pA = 220
	//else pA = 20
	return	color(pR,pG,pB,random(30,100));
}

function rectMat( xdiv = 10, ydiv = 10){ //matriz de rectangulos
	var size = sizze(xdiv,ydiv);

	for (var i =-xdiv; i < xdiv; i++) {
		for (var j = -ydiv; j < ydiv; j++) {
			push();
			translate(size[1]*round(random(-ydiv, ydiv)),size[0]*i);
			rotate(angle);
			//noStroke();
			noFill();
			//fill(probabilityColor(100,100,100));
			stroke(probabilityColor(abs(100*sin(i)),100,abs(100*cos(j))));
			strokeWeight(random(4,6));		
			point(size[0]*cos(i), size[1]*sin(j));
			strokeWeight(1);		
			line(0,0,size[0]*cos(angle), size[1]*sin(angle));
			//ellipse(0,0, size[0]*cos(angle), sin(angle)*size[1]);
			pop();
		}
		angle+=speed;
	}
}

