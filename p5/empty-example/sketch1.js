// A list of vehicles
var vehicles = [];
var seekF = [];
var fr = 30;
let head =  80;
let img;
function preload() {
  // img = loadImage('manSilhoutteBlack1.png'); // head*7.5
  img = loadImage('manSilh2.png'); //wid = head*5.80
}

function setup() {
  // createCanvas(1920,1080);
  createCanvas(windowWidth,windowHeight);

  angleMode(DEGREES);
  imageMode(CENTER);
  frameRate(fr);
  colo = color(255);
  let fix, m = 10;
  // We are now making random vehicles and storing them in an array
  for (var i = 0; i < 900; i++) {
    vehicles.push(new Vehicle(random(-150,150),random(-head*4,head*4)));
    vehicles.push(new Vehicle(random(-50,50),random(-head*4,head*4)));
  }
  // var angle = 76;
  // let x = 0, y = 0;
  // for (var i = -4; i < 5; i++) {
  //   //to head to pelvis
  //   if (i >= -4 && i < 1){ 
  //     //shoulders
  //     if (i==-3){ 
  //       seekF.push(createVector(0,(head*i)-(head/3)));
  //       seekF.push(createVector(0,(head*i)-(head/3)));
  //       fix = (1/4)*head;
  //     }
  //     else fix = 0;
  //     // head , neck
  //     if (i == -2){
  //       seekF.push(createVector((-1/4)*head, (head*-3.5) ));
  //       seekF.push(createVector((1/4)*head, (head*-3.5)));
  //     }
  //     seekF.push(createVector(0,(head*i)+fix));

  //   }
  //   // lejs
  //   if (i >= 0 && i < 5){
  //     seekF.push(createVector((2/3)*head,head*i));
  //     seekF.push(createVector((-2/3)*head,head*i));
      
  //   }
  //   // arms
    
  //   if (i >= -3 && i < 2){
  //     if (i==-3) {
  //       fix = (1/4)*head;
  //       x =  1*head;
  //       y = (head*i) + fix;
  //       seekF.push(createVector(  x,  y ));
  //       seekF.push(createVector( -x,  y ));
  //       //fix = (3/4)*head;
  //     }
  //     else if (i >=-2 && i <= -1) {
  //       if (i == -2) {
  //         // stroke(0,255,0);
  //         x += (((3/4)*head)*cos(angle+m));
  //         y += (((3/4)*head)*sin(angle+m));
  //       }
  //       else if( i == -1) {
  //         x += (head*cos(angle+m));
  //         y += (head*sin(angle+m));
  //       }
  //       seekF.push(createVector( x, y ));
  //       seekF.push(createVector( -x, y ));
  //     }
  //     //forearms   
  //     else if (i > -1 && i < 2 ){
  //       if (i == 0) {
  //         x += /*1*head +*/ (head*cos(angle));
  //         y += /*head*(i - 1) +*/  (head*sin(angle));
  //       }
  //       else if( i == 1) {
  //         x += (head*cos(angle));
  //         y += (head*sin(angle));
  //       }
  //       // else if (i == 1) {fix = 2}  
  //       //point(1*head,((head*i)+fix));
  //       seekF.push(createVector(  x, y));
  //       seekF.push(createVector( -x, y));
  //     }
  //   }
  // }
  // background(0); 
  // innerpoints(seekF,head-20);
}
var alphpoint = 0;

function draw() {
  background(0,100);
  // body(seekF);
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors(vehicles,seekF);
    vehicles[i].update();
    vehicles[i].display(alphpoint,colo);
    vehicles[i].borders(img.width,img.height);
  }
  alphpoint = alphaPoint(alphpoint,6);
  pngAlphaKnob(img,5);
}
var colo;
function keyPressed(){
  if (keyCode === 82) colo = color(255,0,0) //cuando key = R (randoom)
  else if (keyCode === 68) colo = color(0,255,0) // D
  else if (keyCode === 67) colo = color(0,0,255) //C curves
  else if (keyCode === 80) colo = color(255,255,0) // P palette
}


function mouseDragged() {
  // vehicles.push(new Vehicle(mouseX,mouseY));
}

function mousePressed(){
  // innerpoints(seekF,50,3);
}

function alphaPoint(alphh,frames) {
  let rate = 255/frames;
  
  if (frameCount < frames/3){
    alphh = 0;
  } 
  else {
    if (alphh <= 250 ){
    alphh += rate;
    } 
    else if (alphh > 255){
      alphh = 255;
    }
  }
  
  return alphh;
}

var alph = 0;  //
// function pngAlphaKnob(img, frames, wid = head*7.3, hei = (wid*img.height)/img.width){
function pngAlphaKnob(img, frames, wid = head*5.80, hei = (wid*img.height)/img.width){
  push();
  translate(width/2, height/2);
  let rate = 255/frames;
  tint(255,alph);
  image(img,0,0,wid,hei);  
  alph += rate;
  pop();
}

function body( seek){
  push();
  translate(width/2, height/2);
  let head =  50;
  let fix;

  // stroke(random(200,255));
  strokeWeight(6);
  // human proportions
  /*let x = 0, y = 0;
  for (var i = -4; i < 5; i++) {
    stroke(random(200,255));
    //to head to pelvis
    if (i >= -4 && i < 1){ 
      //shoulders
      // stroke(200,0,0);
      if (i==-3){ 
        point(0,(head*i));
        fix = (1/4)*head;
      }
      else fix = 0;
      //head , neck, pelvis
      // stroke(200,0,0);
      point(0,(head*i)+fix);      
    }
    // legs
    // stroke(random(200,255));
    if (i >= 0 && i < 5){
      point((2/3)*head,head*i);
      point((-2/3)*head,head*i);
    }
    // arms
    var angle = 45;
    if (i >= -3 && i < 2){
      if (i==-3) {
        fix = (1/4)*head;
        x =  1*head;
        y = (head*i) + fix;
        point(  x,  y );
        point( -x,  y );
        //fix = (3/4)*head;
      }
      else if (i >=-2 && i <= -1) {

        if (i == -2) {
          // stroke(0,255,0);
          x += (((3/4)*head)*cos(angle+25));
          y += (((3/4)*head)*sin(angle+25));
        }
        else if( i == -1) {
          x += (head*cos(angle+25));
          y += (head*sin(angle+25));
        }
        point(  x, y );
        point( -x, y );
      }
      //forearms   
      else if (i > -1 && i < 2 ){
        if (i == 0) {
          x += /*1*head + (head*cos(angle));
          y += /*head*(i - 1) +  (head*sin(angle));
        }
        else if( i == 1) {
          x += (head*cos(angle));
          y += (head*sin(angle));
        }
        // else if (i == 1) {fix = 2}  
        //point(1*head,((head*i)+fix));
        // stroke(0,0,255);
        point(  x, y);
        point( -x, y);
      }
    }
    //------------------------fill points------------
    // for (var j = 1; j < 3; j++){ point()}

  }*/
  for (var i = 0; i < seek.length; i++){
    stroke(17,255,100,random(100,200));
    point(seek[i].x,seek[i].y);
  }
  pop();
}

function innerpoints(matrix, distance) {
  var x1 = 0, y1 = 0;
  // push();
  // translate(width/2, height/2)
  // strokeWeight(6);
  var pointsIndex = [];
  for (var i = 1; i < matrix.length; i++){

    var p1 = matrix[i];
    
    for (var j = 0; j < matrix.length; j++){

      var dis = p1.dist(matrix[j]);
      if (dis <= distance){ pointsIndex.push([j,i]);
        // print("distancia:" + dis + " p1:" + i + " p2:" + j + " filas:" + x);
        
      }
      if (i >= 1 && i < 2/*&& i >= 4 && i < 8*/) {pointsIndex.push([i,j]);}
    }   
    
  }

  for (var v = 0; v < pointsIndex.length ; v++){
    var p = pointsIndex[v];
    // print(pointsIndex.length);
    // for (var k = 1; k <  partition; k++) {
        // stroke(255,0,0);point(100,100);
        // x = (matrix[p[0]].x + matrix[p[1]].x )/2;
        // y = ( matrix[p[0]].y + matrix[p[1]].y )/2;
        x1 = ( matrix[p[0]].x + matrix[p[1]].x )/2; 
        y1 = ( matrix[p[0]].y + matrix[p[1]].y )/2; 
        // print(x,y);
        // stroke(17,255,random(100,200),random(100,200));
        // point(x1,y1);
        matrix.push(createVector(x1, y1));  
    // }
  }
  pointsIndex = []; 
  // pop();
}    
