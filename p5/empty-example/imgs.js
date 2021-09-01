var img;

function preload(){
	img = loadImage("sep/99.jpg");
}

function setup(){
	createCanvas(900,600);
	img = loadImage("sep/99.jpg");
}

function draw() {
	background(255);
	image(img,0,0);
} 