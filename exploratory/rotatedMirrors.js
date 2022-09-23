const width = 500;
const height = 500;
const halfWidth = width/2;
const halfHeight = height/2;
const centerX = 0;
const centerY = 0;
const boxSize = 20;


function draw() {
    rectMode(CENTER);
    angleMode(DEGREES);
    createCanvas
    ( width
    , height
    );
    background(0);
    translate(halfWidth, halfHeight);
    //scale(1, -1);

    const object =
    drawObject
        ( mouseX-halfWidth
        , mouseY-halfHeight
        , boxSize
        , 'white'
        );

    const light =
    drawRay
        ( object.x
        , object.y
        , centerX
        , centerY-25
        , 'yellow'
        );

        /*
    const mirror =
    drawMirror
        ( centerX
        , centerY-50
        , centerX
        , centerY+50
        );
        */
    const mirror =
    drawMirror
        ( centerX-50
        , centerY-50
        , centerX+50
        , centerY
        );

    let reflection =
    drawReflection
        ( light
        , mirror
        , 'orange'
        , windowHeight
        )

    const mirror2 =
      drawMirror
          ( centerX-50
          , centerY+50
          , centerX+50
          , centerY+100
          );

    const poi = intersect(reflection, mirror2);
    if (poi !== false) {
      let p = createVector(poi.x, poi.y);
      strokeWeight(1.5);
      reflection = drawReflection(light, mirror, 'black', windowHeight);
    reflection = drawReflection(light, mirror, 'orange', p.mag());
      reflection.end.setMag(p.mag());
      reflection = drawReflection(reflection, mirror2, 'orange', windowHeight);
    }
}

function drawObject(x, y, size, color) {
    drawSquare(x, y, size, color);

    return {x: x, y: y};
}

function drawRay(x1, y1, x2, y2, color) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);
    drawLine(v1, v2, color);

    return {start: v1, end: v2};
}

function drawMirror(x1, y1, x2, y2) {
    let v1 = createVector(x1,y1);
    let v2 = createVector(x2,y2);

    let delta = p5.Vector.sub(v2, v1);
    delta.normalize();

    drawLine(v1, v2, 'lightblue');

    return {start: v1, end: v2, normal: delta};
}

function drawReflection(light, mirror, color, size) {
    let r = light.start.copy();
    r.reflect(mirror.normal);
    r.setMag(size);
    drawLine(light.end, r, color);

    return {start: light.end, end: r};
}

function drawReflection2(light, mirror, color, size) {
    let r = light.end.copy();
    let n = (0,-1);
    r.reflect(mirror.normal);
    r.setMag(size);
    drawLine(light.end, r, color);

    return {start: light.end, end: r};
}

function drawLine(start, end, color) {
    push();
    stroke(color);
    line(start.x, start.y, end.x, end.y)
    pop();
}

function drawSquare(x, y, size, color) {
    push();
    fill(color);
    rect(x,y,size,size);
    pop();
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
