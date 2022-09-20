const width = 500;
const height = 500;

function draw() {
  createCanvas(width, height);
  background(0);
  translate(width / 2, height / 2);

  const x1 = -25;
  const y1 = 0;
  const x2 = 20;
  const y2 = 0;

  let light = drawLine(mouseX-400, mouseY-400,0,0,'yellow');
  fill('red');
  circle(mouseX-400, mouseY-400, 20);
  let m1 = drawMirror(x1,y1,x2,y2,light);

}

function drawLine(x1, y1, x2, y2, color) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawArrow(v1, v2, color);

    return {base: v1, vec: v2};
}

function drawArrow(base, vec, color) {
    push();
    stroke(color);
    line(base.x, base.y, vec.x, vec.y)
    pop();
}

function drawMirror(x1, y1, x2, y2, {base, vec}) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawArrow(v1, v2, 'lightblue');

    let dx = x2 - x1;
    let dy = y2 - y1;
    let n1 = createVector(-dy,dx);
    let n2 = createVector(dy,-dx);
    drawArrow(n1, n2, 'white');

    let angle = base.angleBetween(v1);
    let v = p5.Vector.fromAngle(angle, base.mag());
    drawArrow(vec, v, 'orange');

    let image = base.copy();
    image.reflect(n1);
    drawArrow(vec, image, 'violet');
    fill('pink');
    circle(image.x, image.y, 20);

    return {base: vec, vec: v};
}
