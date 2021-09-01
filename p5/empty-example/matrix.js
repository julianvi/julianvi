
function setup() {
	createCanvas(windowWidth,760);
	background(20);
	angleMode(DEGREES);
	frameRate(60);
	strokeWeight(1);
	stroke(20);
}


function draw(){
	background(20,10);
	//stroke(220);
	noStroke();
	noFill();
	//translate(width/2,height/2);
	size = sizze(10,100);
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			//noiseSqr([size[0]-2,size[1]-2], [ size[0]*i, size[1]*j ]);			
		}
	}
	
	rectMat();
}

function mousePressed(){
	pos = [mouseX, mouseY];
	return pos;
}


function sizze(m,n){
	dim = [round(width/m),round(height/n)];
	return dim;
}


function rectSem(widthOrHeight,measure){
	switch(widthOrHeight) {
	    case "w": 
	    	return  [(measure*width)/height, measure]
	        break;
	    case "h": 
	    	return [measure, (measure*height)/width]
	        break;
	    //default:
	}
} 

function noiseSqr(size = [100,100], pos = [0,0], mouse = false){
	if (mouse) pos = mousePressed();

	for ( i = pos[0] ; i < pos[0]+size[0]  ; i+=2 ){
		for ( j = pos[1] ; j <pos[1]+size[1] ; j+=2 ){
			//point(50*cos(i),i*sin(j));
			stroke(220,random(10,250));	
			point(i,j);	
		}	
	}
}

function rectMat( xdiv = 10, ydiv = 10){ //matriz de rectangulos
	var size = sizze(xdiv,ydiv);
	for (var i = 0; i < xdiv; i++) {
		for (var j = 0; j < ydiv; j++) {
			//stroke(250);
			var c = abs(200*sin(frameCount*0.5));
			var s = 100*tan(frameCount*5) + 100
			fill(c,0,s);


			rect(size[0]*i, size[1]*j, size[0]-1, (size[1]-1));			
		}
	}

}