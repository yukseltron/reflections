function draw() {
  cnv = createCanvas(500, 500);
  background(0);
  translate(100,100)

  let v0 = createVector(0,0);
  let v1 = createVector(mouseX, mouseY);
  drawArrow(v0, v1, 'orange');
  fill('green');
  rect(0,0,20,20);


  let n = createVector(0, 1);
  drawMirror(v1, n, -40, 5, 100, 1);

  let angleBetween = v1.angleBetween(n);
  let rad = radians(-(90-degrees(angleBetween)));
  let v2 = p5.Vector.fromAngle(rad, v1.mag());
  drawArrow(v1, v2, 'red');

  fill(250);
  text(
      (90-degrees(angleBetween)).toFixed(2) +
      '°',
      mouseX - 75,
      mouseY - 15,
      90,
      50
  );
  text(
      (degrees(angleBetween)).toFixed(2) +
      '°',
      mouseX - 45,
      mouseY - 55,
      90,
      50
  );
  text(
      (90-degrees(angleBetween)).toFixed(2) +
      '°',
      mouseX + 45,
      mouseY - 15,
      90,
      50
  );
  text(
      (degrees(angleBetween)).toFixed(2) +
      '°',
      mouseX + 15,
      mouseY - 55,
      90,
      50
  );
}


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

function drawMirror(base, vec, x, y, w, h) {
    push();
    stroke('#FFFFFF');
    strokeWeight(1);
    translate(base.x, base.y);
    line(0, -100, 0, 0);
    strokeWeight(10);
    let arrowSize = 7;
    stroke('#0000FF');
    translate(vec.mag() - arrowSize, 0);
    rect(x, y, w, h);
    pop();
}
