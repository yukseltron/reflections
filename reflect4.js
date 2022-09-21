const width = 500;
const height = 500;
const boxSize = 20;
var mg = height * 10;

function draw() {
  createCanvas(width, height);
  background(0);
  translate(width / 2, height / 2);

  let x1 = mouseX-(width/2);
  let y1 = mouseY-(height/2);
  let x2 = 0;
  let y2 = 0;

  let light = drawLine(x1, y1, x2, y2, 'yellow');
  fill('red');
  rect(x1, y1, boxSize, boxSize);

  let m1 = drawMirror(x2-40,y2,x2+40,y2);
  let n = getNormal(x2-40,y2,x2+40,y2);
  let r = drawReflection2(light, m1, 'orange', windowHeight);
  let i = drawImage(light.base, n, light.vec);

  let m2 = drawMirror(x2+70,y2-100,x2+70,y2-40);
  const poi = intersect(r, m2);

  if (poi !== false) {
      let p = createVector(poi.x, poi.y);
      strokeWeight(1.5);
      r = drawReflection2(light, m1, 'black', windowHeight);
      strokeWeight(1);
      r = drawReflection2(light, m1, 'orange', p.mag());
      //r.vec = p;reset background to redraw it.
      let r2 = drawReflection2(r, m2, 'red', p.mag());
  } else {
      mg = windowHeight;
  }
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

function drawMirror(x1, y1, x2, y2) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawArrow(v1, v2, 'lightblue');

    return {base: v1, vec: v2};
}

function getNormal(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let n1 = createVector(-dy,dx);
    let n2 = createVector(dy,-dx);

    return {base: n1, vec: n2};
}

function drawReflection(v1, v2, base, color) {
    let angle = v1.angleBetween(v2);
    let mag = windowHeight;
    let r = p5.Vector.fromAngle(angle, mag);
    drawArrow(base, r, color);

    return {base: base, vec: r};
}

function drawReflection2(light, mirror, color, size) {
    let angle = light.base.angleBetween(mirror.base);
    let r = p5.Vector.fromAngle(angle, size);
    drawArrow(light.vec, r, color);

    return {base: light.vec, vec: r};
}

function drawReflection3(v1, v2, base, color) {
    let r = v1.copy();
    r.reflect(v2);
    drawArrow(base, r, color);
    return {base: base, vec: r};
}

function drawImage(v, n, base) {
    let image = v.copy();
    image.reflect(n.base);
    drawArrow(base, image, 'violet');
    fill('pink');
    rect(image.x, image.y, boxSize, -boxSize);

    return {base: base, vec: image};
}


//http://paulbourke.net/geometry/pointlineplane/javascript.txt
function intersect(v1, v2) {
    const x1 = v1.base.x;
    const y1 = v1.base.y;
    const x2 = v1.vec.x;
    const y2 = v1.vec.y;
    const x3 = v2.base.x;
    const y3 = v2.base.y;
    const x4 = v2.vec.x;
    const y4 = v2.vec.y;

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}
