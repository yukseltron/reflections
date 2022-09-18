function draw() {
  createCanvas(windowWidth/2, windowHeight/2);
  background(0);

  let v0 = createVector(0,0);
  let v1 = createVector(mouseX, mouseY);
  drawArrow(v0, v1, 'orange');

  let n = createVector(0, 1);
  drawMirror(v1, n, -40, 5, 100, 1);

  let angleBetween = v1.angleBetween(n);
  let rad = radians(-(90-degrees(angleBetween)));
  let v2 = p5.Vector.fromAngle(rad, v1.mag());


  fill(250);
  text(
      'angle mirror: ' +
        degrees(angleBetween).toFixed(2) +
        ' degrees',
      mouseX - 100,
      mouseY - 100,
      90,
      50
  );
  text(
      'angle mirror: ' +
        (90 - degrees(angleBetween)).toFixed(2) +
        ' degrees',
      mouseX - 100,
      mouseY + 10,
      90,
      50
  );
  drawArrow(v1, v2, 'red');
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
