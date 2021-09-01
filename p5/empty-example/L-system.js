 // a: "F",
 // b: "FF+[+F-F-F]-[-F+F+F]"
// var axiom = "A";
var axiom = "F";
var sentence = axiom;
var len = 100;
var angle;
var rules = [];

var axiolist = [["F","F","FF+[+F-F-F]-[-F+F+F]",25,180],
	["F-F-F-F","F","F[F]-F+F[--F]+F-F", 90, 100],

];

function axio(axioArray,rule) {
	axiom = axioArray[rule][0];  
	sentence = axiom;
	rules[0] = {
		a: axioArray[rule][1],
	  	b: axioArray[rule][2]
	};
	angle = radians(axioArray[rule][3]);
	len = axioArray[rule][4];
}

function generate(){
	len *= 0.5;
	var nextSentence = "";
	for (var i = 0; i < sentence.length; i++){
		var current = sentence.charAt(i);
		var found = false;
		for (var j = 0; j < rules.length; j++){
			if (current == rules[j].a){
				found = true;
				nextSentence += rules[j].b
				break;
			}
		}
		if (!found){nextSentence += current}
	}
	sentence = nextSentence;
	// createP(sentence);
	turtle();
}

var r = 255, g = 80, b = 100;
var weight = 5;
function turtle() {
	background(51,10);
	//resetMatrix();
	push();
	translate(width/2,height);
	//strokeWeight(weight);
	for (var i = 0; i < sentence.length ; i++){
		var current = sentence.charAt(i);
		if (current == "F"){
			stroke(r, 1+(i/sentence.length)*50, 30 + (i/sentence.length)*100,100);
			line(0,0,0,-len);
			translate(0,-len);
		} else if (current == "f"){
			translate(0,-len);
		} else if (current == "+"){
			rotate(angle);
		} else if (current == "-"){
			rotate(-angle);
		} else if (current == "["){
			push();
		} else if (current == "]"){
			pop();
		} 
	}
	pop();
}

function setup() {	
	createCanvas(windowWidth, 768);
	background(0);
	strokeWeight(0.5);
	// axio(axiolist,0);
	// createP(axiom);
	// turtle();
	// var button = createButton("generate");
	// button.mousePressed(generate);
	frameRate(25);
}
var looop =  4;
function draw() { 
	background(2,13);
	if (frameCount % int(looop) == 0) {
		axio(axiolist,1);
	}
	generate();
}