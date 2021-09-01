var p;
function setup() {
	createCanvas(windowWidth,760-100);
	angleMode(DEGREES);
	p = new panels();
}

function draw() {
	background(50);
	translate(width/2,height/2);
	p.stand();
	p.draw();
	//panels(40,width,pain,45);
	//colored();
}

//var pain = true, panel = true; 
function panels (weight = 80, widht = windowWidth , paint = true, angle = 45 , rectan = 1) {
	this.weightt = weight;
	this.widthh = widht;
	this.painter = paint;
	this.anglee = angle;
	this.rectShape = rectan;
	this.panel = true;
	this.matrix = [];
	this.colored;

//fundamenal dimensiones, stroke/color, tr
	
	this.stand = function() {
		for(let i = this.weightt; i <= this.widthh; i+= 2*this.weightt) {
			this.matrix.push([i*this.rectShape,i,color(0)]);
		}
	}

	this.moveLight = function(){
		
	}

	this.draw = function() {
		if (this.panel){
			push();
			rotate(this.anglee);
			noFill();
			strokeWeight(this.weightt);
			rectMode(CENTER);
			scale(1);
			var shades = 0;
			for(let i = 0; i < this.matrix.length; i++){
				if (this.painter == true){ 
					stroke(this.matrix[0][2]);
					//stroke(color(shades/5,shades*13,shades*19));
					//shades++;
				}
				else noStroke();
				rect(0,0,this.matrix[i][0],this.matrix[i][1]);	
				this.painter = !this.painter;
			}
			pop();
			//if (frameCount%10== 0 || frameCount%1001 == 0) pain = !pain
		}
	}
	
}

function colored (){
	let paleta = [];
	let red = 0;

	for (var i = 0; i < 35*13; i+= 35) {
		strokeWeight(35);
		paleta.push(color(red/2,red*13,red*19));
		//print( red/2, red*13, red*19);
		line(-width/2,i,width/2,i);
		red++;
	}

	return paleta
}