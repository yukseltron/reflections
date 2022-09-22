const width = 500;
const height = 500;
const boxSize = 20;

function draw() {
  createCanvas(width, height);
  background(0);
  translate(width / 2, height / 2);

  print(mouseX, mouseY);
  const x1 = mouseX > 0 && mouseX < (width/2) ? mouseX-(width/2) : 0;
  const y1 = mouseY > 0 && mouseY < (height/2) ? mouseY-(height/2) : 0;
  const x2 = 0;
  const y2 = 0;

  let incident = drawRay(x1, y1, x2, y2, 'yellow');
  fill('red');
  rect(x1, y1, boxSize, boxSize);

  let m1 = drawMirror(x2-40,y2,x2+40,y2);
  const angle = degrees(getAngle(incident.start, m1.start));
  let r = drawReflection(incident, m1, 'orange', windowHeight, -angle);
}

function drawRay(x1, y1, x2, y2, color) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawLine(v1, v2, color);

    return {start: v1, end: v2};
}

function drawLine(start, end, color) {
    push();
    stroke(color);
    line(start.x, start.y, end.x, end.y)
    pop();
}

function drawMirror(x1, y1, x2, y2) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawLine(v1, v2, 'lightblue');
    let n = getNormal(x1, y1, x2, y2);

    return {start: v1, end: v2, normal: n};
}

function drawViewer(x, y, w, l, color) {
    let v1 = createVector(x+w,y);
    let v2 = createVector(x,y+l);
    fill(color);
    rect(x, y, w, l);

    return {start: v1, end: v2};
}

function drawReflection(light, mirror, color, size, angle) {
    let r = p5.Vector.fromAngle(radians(angle), size);
    r.reflect(mirror.normal.start);
    drawLine(light.end, r, color);

    return {start: light.end, end: r, angle: angle};
}

function drawImage(light, mirror) {
    let image = light.start.copy();
    image.reflect(mirror.normal.end);
    drawLine(light.end, image, 'violet');
    fill('pink');
    rect(image.x, image.y, boxSize, -boxSize);

    return {start: light.end, end: image};
}

function getAngle(v1, v2) {
    let firstAngle = Math.atan2(v1.x, v1.y);
    let secondAngle = Math.atan2(v2.x, v2.y);
    const points = [v1.x, v1.y, v2.x, v2.y]
    let angle = secondAngle - firstAngle;

    const len = points.filter(value => value < 0);
    return len.length % 2 === 0 ? angle : -angle;
}

function getNormal(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let n1 = createVector(-dy,dx);
    let n2 = createVector(dy,-dx);

    return {start: n1, end: n2};
}


//http://paulbourke.net/geometry/pointlineplane/javascript.txt
function intersect(v1, v2) {
    const x1 = v1.start.x;
    const y1 = v1.start.y;
    const x2 = v1.end.x;
    const y2 = v1.end.y;
    const x3 = v2.start.x;
    const y3 = v2.start.y;
    const x4 = v2.end.x;
    const y4 = v2.end.y;

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