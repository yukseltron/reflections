function draw() {
  createCanvas(windowWidth/2, 500);
  background(0);
  translate(0,250);
  let v0 = createVector(0,0);
  let v1 = createVector(mouseX, mouseY);
  drawArrow(v0, v1, 'orange');
  fill('green');
  rect(0,0,20,20);

  let n = createVector(0, 1);
  drawMirror(v1, n);

  let r = v1.copy();
  let n2 = createVector(1, 0);
  r.reflect(n2);
  rect(r.x,r.y,20,20);
  drawArrow(v1, r, 'purple');
  print(r);

  let angleBetween = v1.angleBetween(n);
  let rad = radians(-(90-degrees(angleBetween)));
  let v2 = p5.Vector.fromAngle(rad, v1.mag());
  drawArrow(v1, v2, 'yellow');
  if (intersectLineCircle(v1,v2,{x: 600, y:60},20)) {
       fill(250);
  } else {
      fill('yellow');
  }
  circle(600,60,50)


  let n3 = createVector(1, 0);

  angleBetween = v2.angleBetween(n2);
  rad = radians((degrees(angleBetween)));
  let v3 = p5.Vector.fromAngle(rad, v2.mag());
  drawArrow(v2, v3, 'yellow');


  fill(250);
  text(
      (degrees(angleBetween)).toFixed(2) +
      '°',
      mouseX - 75,
      mouseY - 15,
      90,
      50
  );
  text(
      (degrees(angleBetween)).toFixed(2) +
      '°',
      mouseX + 45,
      mouseY - 15,
      90,
      50
  );
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function drawMirror(base, vec) {
    push();
    stroke('#FFFFFF');
    strokeWeight(1);
    translate(base.x, base.y);
    line(0, -50, 0, 0);
    line(windowWidth/2, 0, -windowWidth, 0);
    strokeWeight(10);
    let arrowSize = 7;
    stroke('#0000FF');
    translate(base.x, base.y);
    pop();
}

function intersectLineCircle(p1, p2, cpt, r) {
    print(cpt.x, p2);
    if (p2.x >= cpt.x/2 && p2.x  <= (cpt.x + 100)/2) {
        return true
    }
    return false;
}
