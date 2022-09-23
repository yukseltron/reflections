const width = 500;
const height = 500;
const halfWidth = width/2;
const halfHeight = height/2;
const centerX = 0;
const centerY = 0;
const boxSize = 20;
const offset = 15;

function draw() {
    rectMode(CENTER);
    createCanvas(width, height);
    background(0);
    translate(halfWidth, halfHeight);

    let incident
        = drawRay
        ( mouseX-halfWidth
        , mouseY-halfHeight
        , centerX
        , centerY
        , 'yellow'
        );
    fill('red');
    rect(mouseX-halfWidth, mouseY-halfHeight, boxSize, boxSize);

    let m1
        = drawMirror
        (centerX-40
        , centerY
        , centerX+40
        , centerY
        );

    let m2
        = drawMirror
        ( centerX+30
        , centerY-100
        , centerX+70
        , centerY-40
        );

    const angle = degrees(getAngle(incident.start, m1.start));
    let r = drawReflection(incident, m1, 'orange', windowHeight);

    const poi = intersect(r, m2);
    if (poi !== false) {
        r = undrawRay(incident, m1, poi);
        r = drawReflectionCustom(r, m2, 'orange', windowHeight);
    }
}

function drawRay(x1, y1, x2, y2, color) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawLine(v1, v2, color);

    return {start: v1, end: v2};
}

function undrawRay(light, mirror, poi) {
    let p = createVector(poi.x, poi.y);
    strokeWeight(1.5);
    r = drawReflection(light, mirror, 'black', windowHeight);
    strokeWeight(1);
    r = drawReflection(light, mirror, 'orange', p.mag());

    return {start: light.start, end: p};
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

function drawReflection(light, mirror, color, size) {
    let angle = light.start.angleBetween(mirror.start);
    let r = p5.Vector.fromAngle(angle, size);
    drawLine(light.end, r, color);

    return {start: light.end, end: r, angle: angle};
}

function drawReflectionCustom(light, mirror, color, size) {
    let angle = degrees(getAngle(light.end, mirror.normal.start));
    let r = p5.Vector.fromAngle(-radians(angle+offset), size);
    drawLine(light.end, r, color);

    return {start: light.end, end: r, angle: angle};
}

function drawImage(light, mirror) {
    let image = light.start.copy();
    image.reflect(mirror.normal.end);
    drawLine(light.end, image, 'violet');
    fill('pink');
    rect(image.x, image.y, boxSize, boxSize);

    return {start: light.end, end: image};
}

//modified from: https://stackoverflow.com/questions/56147279/how-to-find-angle-between-two-vectors-on-canvas
function getAngle(v1, v2) {
    let firstAngle = Math.atan2(v1.x, v1.y);
    let secondAngle = Math.atan2(v2.x, v2.y);
    const points = [v1.x, v1.y, v2.x, v2.y]
    let angle = secondAngle - firstAngle;

    const len = points.filter(value => value < 0);
    return len.length % 2 === 0 ? angle : -angle;
}

//modified from: https://stackoverflow.com/a/1243676/6137476
function getNormal(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let n1 = createVector(-dy,dx);
    let n2 = createVector(dy,-dx);

    return {start: n1, end: n2};
}

//modified from: http://paulbourke.net/geometry/pointlineplane/javascript.txt
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
