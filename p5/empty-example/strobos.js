var y =10; angle = 0, speed= 5; framer = 60 /*frameRate*/ , strobs = true, Key = "1";
var rand=false;//random para fills
var direction = true, state=0, scaler = false;	

//
var x;
function setup() {
	createCanvas(windowWidth,760-100);
	background(20);
	angleMode(DEGREES);
	frameRate(framer);
	strokeWeight(3);
	frrom = color(255,0);
	too = frrom;
}

function draw(){ 

	bckg(100);
	//background(strobos(128,Key, color(250,250))); //Background
	
	translate(width/2,height/2);
	//stroke(palette(0.0,1.0));
	//stroke(palette(color(225,0,0),color(0,0,255),200,100))
	noFill();
	ellip();
	concentricRects(strobos(128,Key, color(250,0,0,250)));
	rLines();
	scale (dir(0,2,85,0.02));
	//print(randomGaussian(200,0.7))
}


var counter=0, keyCtrl = 0;
function keyPressed(){
	counter ++;
	if (keyCode === CONTROL){
		//background(200,0,200,160);
		strobs = !strobs;
		counter	= 1;
		keyCtrl = 17;
	}
	else if (keyCode === 82) rand = !rand //cuando key = r (randoom)
	else if (keyCode === 68) {direction	= !direction; keyCtrl+=68;} // d
	else if (keyCode === 67) {concetric	= !concetric;} //c  
	else if (keyCode === 80) {pltte = !pltte} // p palette
	else if (keyCode === 66) {backOn = !backOn;} //b bckground
	else if (keyCode === 78) { // n new colors
		frrom = color(random(0,255), round(random(0,255)), round(random(0,255)));
		too = color(round(random(0,255)), round(random(0,255)), round(random(0,255)));
	}
	else if (keyCode === 69) {ellips = !ellips}
	//else if (keyCode === 66) {backOn = !backOn;}

	//else if (keyCode === 80)
	//else if (keyCode === 80)

	else if (key === "1") Key = key
	else if (key === "2") Key = key
	else if (key === "3") Key = key	
	else if (key === "4") Key = key
	else if (key === "5") Key = key
	//else if (keyCode === 225 ) Key = key
	
	if (counter>2) {counter = 0; keyCtrl = 0;}
	print (keyCode);
	
}

// 85 =  ctrl + d //
var dOn = true;
function dir(min=0, max=1, mapeado, velocity = 0.02){
	if (keyCtrl == mapeado) dOn = !dOn; 

	if (dOn){
		if (direction && state <= 1) {state += (1 - state) * velocity;}	// el num 1 y 0 es un punto de referencia para la direccion del movimiento
		else if (!direction && state >= 0) state+= (0 - state) * velocity
		if (min != 0 || max != 1) return map(state,0,1,min,max)		
		else return	state
	}
	else return	state	
}

//bckground
var backOn = false;
function bckg(alpha = 100){
	if (backOn){
		background(strobos(128,Key, color(250,250)));
	}
	else background(0,100);
}

// funcion que recrea una luz stroboscopica usando dos colores 
//                 beat   tecla actual    color de encendido  color de "apagado"       fill cada x segundos  
function strobos(bpm = 120, K = "1", colorOn = color(250,220), colorOff = color(0,220), fillTime = 8) {
	var x;	
	var eightSeg = round(framer*8); //calcula la cantidad de frames en 8 segundos, segun el frameRate
	if (strobs){
		if (K == 17) key = "1"
		var i = int(K); //equivalente entero de Key
		if (rand){ //random cada 8 segundos
			if (frameCount%eightSeg >= eightSeg-50 && frameCount%eightSeg  <= eightSeg-1){
				i = round(random(3,5));
			}
		}
		x = (60/(i*bpm)); // ratio seconds x minute // Rapidez del strob
		x = round(x*framer); // 
		if (frameCount%x == 0) return colorOn;
		else return colorOff;
	}
	else return	colorOff;//color(0,250);
}



var pltte = false;
var frrom;
var too;
function palette(){ // plets 
	var points = [0,0.22,0.44,0.66,0.88,1.0];
	if (pltte) return strobos(128,Key,lerpColor(frrom, too, points[round(random(0,6))]));
	else return strobos(128,Key, color(0,255))
}

var ellips = false;
function ellip(max=4){ // ellipses
	if (ellips){
		stroke(palette());
		for (var i = 1; i <= max; i++){
			max = round(randomGaussian(2,2))
			push();
			rotate(map(i,1,max,0,359));
			ellipse(0,0,randomGaussian(200*(1/i),100*i),400);

			ellipse(0,randomGaussian(40,20),300,150);
			ellipse(0,randomGaussian(0,40),300,150);
			ellipse(0,randomGaussian(-40,20),300,150);
			
			ellipse(0,randomGaussian(80,10),400,200);
			ellipse(0,randomGaussian(-80,10),400,200);
			pop();
		}
	}
}

var m, alturaH, concetric = false; 
function concentricRects(strok = color(255,200), strkkWghtOn = true, strkWght = 1) {
	if (concetric) {
		if (strkkWghtOn) {strkWght = round(random(2,7))}
		m = height/ width;
		density = round(random(30,100));
		for (var i= -width/2; i < 0;i+= density) { // de cero a la mitad es para obtener los vertices de los rectangulos
			alturaH = dist(i,m*i,i,-m*i);
			strokeWeight(strkWght);
			stroke(palette());// colores de la pantalla mapeados solo a rojo y azul
			rect(i,m*i,(width*alturaH)/height,alturaH);//dibuja los rectangulos
		}
	}
}	

function rLines(posX = random(0, width), lines = 10, space = 10, weight = 3, grayscale = 240){
	stroke(random(0,grayscale),250);	
	strokeWeight(weight);
	posX -= (lines*space)/2; // "centrado" del grid
	for (var i = 0; i < lines; i++) {
		if (i != 0) line( posX+space*i, 0, posX+space*i, height);
		else line( posX , 0 , posX ,height);
	}
}