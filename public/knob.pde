
void setup()
{
  size(200,200);
  background(125);
  fill(255);
  smooth();
  noLoop();
  PFont fontA = loadFont("courier");
  textFont(fontA, 14);  

  window.knob = function(data) {
  	background(125);

  	pushMatrix(); 
  	translate(100, 100);
  	rotate(data.A0*2*PI/1023 + PI/2);
  	noFill();
  	ellipse(0, 0, 100, 100);
  	line(0, 0, 60, 0);
  	text(data.A0, 0, 0);
  	popMatrix();
  };
}

void draw(){  
  text("OK",20,20);
  //println("Hello ErrorLog!");
}

