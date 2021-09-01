var y =10; angle = 0, speed= 5; framer = 30 /*frameRate*/ , strobs = true, Key = "1";
var rand=false;//random para fills
var direction = true, state=0, scaler = false;	

//
var x;
function setup() {
	createCanvas(windowWidth, windowHeight-4);
	background(20);
	angleMode(DEGREES);
	frameRate(framer);
	strokeWeight(3);
	paleta = [
	color(255,0,0), color(255,20,10), color(255,69,0), color(0,255,0), color(124,252,0), 
	color(127,255,0), color(0,250,154),
	color(0,255,127), color(32,178,170), color(0,206,209), color(208,170,8), color(17,random(200,250),random(18,243),250)
	];
	points = initCube(points);
	points2 = initCube(points2);
  	points3 = initCube(points3);

  	for (var i = 0; i < 8; i++) {
		particless[i] = new Particle((width/8)*((-1)**i)*((i+1)/4), random(-10,10), 40);
	}
	attractorr[0] = new Attractor(0,0);
	rectMode(CENTER);
}

function draw(){ 
	bckg(0);
	//translate(width/2,height/2);
	ang = spiral(100,50, ang, notab);
	abLissa = lissajous(abLissa[0], abLissa[1]);
	rLines();
	esferas();
	bars();
	bezaturn(particless,attractorr);
	bez(particless, attractorr);
	eCube(angulo,points,color(200,50,25));
	eCube(angulo+5,points2,color(20,100,255));
  	eCube(angulo+12,points2, color(200,50,25));

	panels(40,width,pain,45);
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
	else if (keyCode === 82) rand = !rand //cuando key = R (randoom)
	else if (keyCode === 68) {direction	= !direction; keyCtrl+=68;} // D
	else if (keyCode === 67) {curves = !curves} //C curves
	else if (keyCode === 80) {pltte = !pltte; colored = random(paleta)} // P palette
	else if (keyCode === 66) {backOn = !backOn;} //B bckground
	else if (keyCode === 192) {bar = !bar}//ñ
	else if (keyCode === 97) {beza = !beza}//1 numpad
	else if (keyCode === 98) {bezie = !bezie}//2 numpad
	else if (keyCode === 78) { // N new colors 
		colored = random(paleta);
	}
	else if (keyCode === 77) { colored = random([color(17,random(200,250),random(18,243),250),
			color(random(170),random(200,250),random(18,243),250),color(random(200,250),random(20,50),random(18,24),250),
			color(random(17,150),6,random(18,243),250), color(random(17,243),random(17,200),random(18,243),220)]);}
	else if (keyCode === 71) {notab = round(random(1, 359));} //g
	else if (keyCode === 69) {ellips = !ellips} //Ellipses 
	else if (keyCode === 76) {lins = !lins;} // lines
	else if (keyCode === 83) {spiralrect = !spiralrect;} // S spiral rects
	else if (keyCode === 65) {panel = !panel; power = random(["rombos","horizontales","verticales"])} // A 
	else if (keyCode === 84) {tridi = !tridi;} // T
	else if (keyCode === 9) {keyCode = 0} 

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
		background(strobos(130,Key, color(250,250)));
	}
	else background(random(0,10),100);
}

// funcion que recrea una luz stroboscopica usando dos colores 
//                 beat   tecla actual    color de encendido  color de "apagado"       fill cada x segundos  
function strobos(bpm = 130, K = "1", colorOn = color(250,220), colorOff = color(0,220), fillTime = 8) {
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

var paleta = [];
var pltte = false;
var colored;
function palette(){ // plets 
	if (pltte) return strobos(130,Key,colored);
	else return strobos(130,Key, color(200,255))
}

var lins = false;
function rLines(posX = random(-width/2, width/2), lines = 10, space = 20, weight = 15, grayscale = 240){
	if (lins){
		push();
		translate(width/2,height/2);
		stroke(palette());	
		lines = width/2;
		strokeWeight(strkWght = round(random(1,2)));
		posX -= (lines*space)/2; // "centrado" del grid
		for (var i = 0; i < lines; i++) {
			if (i != 0) line( posX+space*i, -height/2, posX+space*i, height/2);
			else line( posX , -height/2 , posX ,height/2);
		}
		pop();
	}
}
var bar = false;
function bars(){
	if (bar){
		push();
		translate(width/2,height/2);
		// strokeWeight(7);
		noFill();
		// strokeWeight(1);
		//stroke(255,0,0);
		//rect(0,0,0,h);
		let divy = 0, divx = 10;
		let k = height/divy;
		let c = width/divx;
		for (var z = 0; z < 50; z++){
			if (noise(millis())<0.49){
				divy = random(5);
				for (var j = (-width/2)+c; j <= (width/2)+c; j+= c){
					// divy = random(5);
					k = height/divy;
					for(var i = (-height/2)+k; i <= (height/2)+k; i+= k){
						push();
						scale(random(.9,1));
						strokeWeight(9); //exteriores
						stroke(red(palette()),green(palette()),blue(palette()),random(50));
						rect( j-(c/2) , i-(k/2) , 4 , noise(second())*(k-20));

						strokeWeight(1);//interiores
						stroke(palette());
						rect( j-(c/2) , i-(k/2), 2 , noise(second())*(k-20));
						pop();
					}
					for(var i = (-height/2)+k; i <= (height/2)+k; i+= k){
						push();
						scale(random(.85,.9));
						strokeWeight(9); //exteriores
						stroke(red(palette()),green(palette()),blue(palette()),random(50));
						rect( j-(c/2) , i-(k/2) , 4 , noise(second())*(k-20));

						strokeWeight(1);//interiores
						stroke(palette());
						rect( j-(c/2) , i-(k/2), 2 , noise(second())*(k-20));
						pop();
					}
				}
			}
		}
		
		pop();
	}
}

var ellips = false;
var desplazar = 0; diametro	= 500;
function circle(diametro = 400, radius = -diametro/2,){
	strokeWeight(.5);
	noFill();
	push();
	//
	for (var j = 0; j < 30; j++) {
		scale(random(.95,1));
		for (i = radius; i < abs(radius)+1; i+=50){
			if (frameCount%180 <= 90) stroke(palette());
			else {stroke(palette())}
			dM = sqrt(sq(diametro/2)-sq(i+desplazar))*2;
			ellipse(0,i+desplazar,dM, (diametro*0.1)*dM/diametro);
			
		}
	}
	pop();
}

function esferas(){
	if (ellips) {
		push()
		translate(width/2,height/2);
		circle();
		

		push();
		translate(-width/4,0);
		circle();
		pop();
		
		push();
		translate((width)/4,0);
		circle();
		pop();

		pop();
		desplazar+=5;
		if (frameCount%10==0)desplazar=0;
	}
}

var abLissa = [1,2], curves =  false;
function lissajous (a = 1, b = 2, colore = colored, A = random(600,650), B = random(200,210),  delta = 0){
	if (curves) {
		push();
		translate(width/2,height/2);
		stroke(palette());
		strokeWeight(0.5);
		delta = frameCount;
		if (frameCount%200 == 0){
			a = round(random(1,5));
			b = round(random(1,5));
		}
		let x1, y1, x2, y2;
		//point(a*cos(millis()),a*2*sin(natural*millis()));
		for (var j = 0; j < 10; j++) {
			scale(random(.9,1));
			for (let t = 1; t <= 360; t++){
				x1= A*sin(a*t + delta);
				y1= B*sin(b*(t));
				x2= A*sin(a*(t+2) + delta);
				y2= B*sin(b*(t+2));
				line(x1,y1,x2,y2);	
			}
		}
		pop();
	}
	return [a,b];
}

var ang = 0, notab = 30, spiralrect = false;
function spiral(widht = 100, heigth = 50, angle = 0, notable = 90) {
	if (spiralrect) {
		push();
		rectMode(CENTER);
		translate(width/2,height/2);
		noFill();
		scale(1);
		strokeWeight(0.5);
		rotate(angle += notable);
		let height2;
		for (i = 0; i < width; i += 20) {
			push()
			stroke(palette(), random(150,255));
			rotate(angle += notable);
			height2 = ((widht + i) * heigth) / widht;
			rect(0,0, widht + i, height2);
			pop();
		}
		pop();
	}
	return angle;
}

var pain = false, panel = true, power; 
function panels (weight = 80, widht = windowWidth , paint = true, angle=45 , rectan = 1) {
	if (panel){
		rectMode(CENTER);
		push();
		translate(width/2,height/2);
		if (power == "rombos"){
			push();
			rotate(angle);
			noFill();
			strokeWeight(weight);
			for(let i = weight; i <= width; i+= 2*weight){
				if (paint == true){ 
					stroke(0);
				}
				else noStroke();
				//stroke(i*0.2);
				rect(0,0,i*rectan,i);	
				paint = !paint;
			}
			pop();
		} else if (power == "horizontales"){
			push();
			k = height/4;
			strokeWeight(weight);
			for (var i = (-height/2)+ k; i <= (height/2)+k; i+= k) {
				stroke(1);
				rect(0,i,width,1);
			}
			pop();
		} else if (power == "verticales"){ 
			push();
			k = width/8;
			strokeWeight(weight);
			for (var i = (-width/2)+ k; i <= (width/2)+k; i+= k) {
				stroke(1);
				rect(i,0,1,height);
			}
			pop();
		}
		pop();
		if (frameCount%200 == 0 || frameCount%201 == 0) pain = !pain; // linea que crea fills
	}
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var angulo = 0;
var points = [], points2 = [], points3 = []; // array pvector [8] 
//var points = Array(8);
var projection = [
  [1, 0, 0],
  [0, 1, 0]
];

function initCube(point = []){
  // array pvector [8] 
  angleMode(DEGREES);
  point.push(createVector(-0.5, -0.5, -0.5));
  point.push(createVector(0.5, -0.5, -0.5));
  point.push(createVector(0.5, 0.5, -0.5));
  point.push(createVector(-0.5, 0.5, -0.5));
  point.push(createVector(-0.5, -0.5, 0.5));
  point.push(createVector(0.5, -0.5, 0.5));
  point.push(createVector(0.5, 0.5, 0.5));
  point.push(createVector(-0.5, 0.5, 0.5));
  return point;
}
var tridi = false;
function eCube(angle,points, colores){
	if (tridi){
		var rotationZ = [
	    	[ cos(angulo), -sin(angulo), 0],
	    	[ sin(angulo), cos(angulo), 0],
	    	[ 0, 0, 1]
	  	];

	  	var rotationX = [
	    	[ 1, 0, 0],
	    	[ 0, cos(angulo), -sin(angulo)],
	    	[ 0, sin(angulo), cos(angulo)]
	  	];

		var rotationY = [
			[cos(angulo), 0, sin(angulo)],
			[0, 1, 0],
			[-sin(angulo), 0, cos(angulo)]
		];

	  	var projected = [];

	  	var index = 0;
	  	for (let v of points) { //p5 vector
		    var rotated = matmul(rotationY, v); //p5 vector
		    rotated = matmul(rotationX, rotated);
		    rotated = matmul(rotationZ, rotated);
		    var projected2d = matrixToVec(matmul(projection, rotated)); //p5 vector
		    projected2d.mult(200);
		    projected[index] = projected2d;
		    //point(projected2d.x, projected2d.y);
		    index++;
	  	}
	/*
	  	for (let v of projected) {
		    stroke(255);
		    strokeWeight(2);
		    noFill();
		    point(v.x, v.y);
	  	}
	*/
		  // Connecting
		for (var i = 0; i < 4; i++) {
		    connect(i, (i+1) % 4, projected);
		    connect(i+4, ((i+1) % 4)+4, projected);
		    connect(i, i+4, projected);
		}

	  	angulo += 1;
	}
}



//*************************************POINTS CONNECTION**********************************

function connect(i, j, points) {
  push();
  translate(width/2,height/2);
  scale(2);
  var a = points[i];
  var b = points[j];
  strokeWeight(0.5);
  stroke(palette());
  line(a.x, a.y, b.x, b.y);
  pop();
}

//*************************************MATRIX OPERATIONS**********************************
function vecToMatrix(vector = createVector(0,0,0)) {
  var mat = [[0],[0],[0]];
  mat[0][0] = vector.x;
  mat[1][0] = vector.y;
  mat[2][0] = vector.z;
  //print(m[0][0],m[1][0],m[2][0]);
  return mat;
}

function matrixToVec(matrix) {
  var vec = createVector();
  vec.x = matrix[0][0];
  vec.y = matrix[1][0];
  if (matrix.length > 2) {
    vec.z = matrix[2][0];
  }
  return vec;
}

function logMatrix(mat) {
  var cols = mat[0].length;
  var rows = mat.length;
  print(rows + "x" + cols);
  print("----------------");
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      print(mat[i][j] + " ");
    }
    print(" ");
  }
  print(" ");
}


function initMat(rows, cols) { 
  var m = [];
  for (var i = 0; i < rows; i++) {
    m.push([]);
    for (var j = 0; j < cols; j++) {
      m[i].push(0);
    }
  }
  return m;
}

function matmul( a, b) {
  var colsA = a[0].length;
  var rowsA = a.length;
  var colsB;
  if (b instanceof p5.Vector){ 
    b = vecToMatrix(b);
    colsB = b[0].length;
  }
  else if (typeof(b[0]) == 'number') { colsB = 1 }
  else {colsB = b[0].length}
  var rowsB = b.length;

  if (colsA != rowsB) {
    print("Columns of A must match rows of B");
    return null;
  }

  var result = initMat(rowsA,colsB); 

  for (var i = 0; i < rowsA; i++) {
    for (var j = 0; j < colsB; j++) {
      var sum = 0;
      for (var k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
//*************************************MATRIX OPERATIONS**********************************

var particless = [];
var attractorr = [];
var beza = false;
function bezaturn(particles, attractor){
	if (beza) {
		noFill();
		for (var i = 0; i < particles.length; i++) {
			for (var k = 0; k < attractor.length; k++) {
				var force = attractor[k].calculateAttraction(particles[i]);
				particles[i].applyForce(force);
			}
			particles[i].update();
		}
		//stroke(17,random(200,250),random(18,243),250); //verde
		//stroke(random(170),random(200,250),random(18,243),250); //verde
		//stroke(random(200,250),random(20,50),random(18,24),250);rojo
		//stroke(random(17,150),6,random(18,243),250); morados azul rojo
		stroke(palette());
		strokeWeight(1);
		let lol = random(200,width/2);
		//stroke(random(17,243),random(17,200),random(18,243),220); mmulti
		for (var i = 0; i < 30/2; i++) {
			for (var z = 0; z < particless.length ; z+= 2) {
				push();
				//translate(width/2, height*i/(30/2));
				translate(width/2,height/2);
				scale(random(0.1,.2));		
				bezier(-lol,particles[0].pos.x, particles[0].pos.x, particles[0].pos.y,particles[1].pos.x, particles[1].pos.y, lol,particles[1].pos.x);
				rotate(180);
				bezier(-lol,-particles[1].pos.x, particles[0].pos.x, particles[0].pos.y,particles[1].pos.x, particles[1].pos.y, lol,-particles[0].pos.x);	
				pop();

			}
		}
	}
}
var bezie = false;
function bez(particles,attractor){
	if(bezie) {
		noFill();	
		for (var i = 0; i < particles.length; i++) {
			for (var k = 0; k < attractor.length; k++) {
				var force = attractor[k].calculateAttraction(particles[i]);
				particles[i].applyForce(force);
			}
			particles[i].update();
			//particles[i].edges();
			//attractor[0].display();
			/*push();
			translate(width/2, height/2);
			//particles[i].display();
			pop();*/
			
		}
		//stroke(17,random(200,250),random(18,243),250); //verde
		// stroke(random(170),random(200,250),random(18,243),250); //verde
		// stroke(random(200,250),random(20,50),random(18,24),250); //rojo
		//stroke(random(17,150),6,random(18,243),250); morados azul rojo
		stroke(random(17,243),random(17,200),random(18,243),220); //mmulti
		// stroke(250,250);
		strokeWeight(1);
		for (var j = 0; j < 15; j++) {
			for (var i = 0; i < particles.length; i+=4) {
				push();
				translate(width/2, height/2);
				scale(random(0.2,.3));	
				bezier(particles[i].pos.x, particles[i].pos.y, particles[i+1].pos.x, particles[i+1].pos.y,
					-particles[i+1].pos.x, particles[i+1].pos.y, -particles[i].pos.x, particles[i].pos.y);
				bezier(particles[i].pos.x, -particles[i].pos.y, particles[i+1].pos.x, -particles[i+1].pos.y,
					-particles[i+1].pos.x, -particles[i+1].pos.y, -particles[i].pos.x, -particles[i].pos.y);
				rotate(90);
				bezier(particles[i].pos.x, particles[i].pos.y, particles[i+1].pos.x, particles[i+1].pos.y,
					-particles[i+1].pos.x, particles[i+1].pos.y, -particles[i].pos.x, particles[i].pos.y);
				bezier(particles[i].pos.x, -particles[i].pos.y, particles[i+1].pos.x, -particles[i+1].pos.y,
					-particles[i+1].pos.x, -particles[i+1].pos.y, -particles[i].pos.x, -particles[i].pos.y);
				pop();
			
			}
		}
	}
}