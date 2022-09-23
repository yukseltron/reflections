# Reflections

[See the site](https://reflections-brilliant.vercel.app/)


## Documentation
This is for the ```reflect.js``` file, which contains the shared code for all examples. 


```js
// Num -> Num -> Num -> Num -> String -> {Vector, Vector}
function drawRay(x1, y1, x2, y2, color) {
    ...
    return {start: v1, end: v2};
}
```
Draws an incident ray.

```js
// {Vector, Vector} -> {Vector, Vector} -> Vector -> {Vector, Vector}
function undrawRay(light, mirror, poi) {
    ...
    return {start: light.start, end: p};
}
```
Undraws an incident ray.

```js
// Num -> Num -> Num -> Num -> {Vector, Vector, Vector}
function drawMirror(x1, y1, x2, y2) {
    ...
    return {start: v1, end: v2, normal: n};
}
```
Draws a mirror with a normal calculated.

```js
// Num -> Num -> Num -> Num -> String -> {Vector, Vector}
function drawViewer(x, y, w, l, color) {
    ...
    return {start: v1, end: v2};
}
```
Draws a viewer capable of seeing a ray.

```js
// {Vector, Vector} -> {Vector, Vector} -> String -> Num -> {Vector, Vector, Num}
function drawReflection(light, mirror, color, size) {
    ...
    return {start: light.end, end: r, angle: angle};
}
```
Draws a reflection of a given ray (incident or another reflection).

```js
// {Vector, Vector} -> {Vector, Vector} -> String -> Num -> {Vector, Vector, Num}
function drawReflectionCustom(light, mirror, color, size) {
    ...
    return {start: light.end, end: r, angle: angle};
}
```
Also draws a reflection, but this time using a different angle calculator for 2 vectors.

```js
// {Vector, Vector} -> {Vector, Vector} -> {Vector, Vector}
function drawImage(light, mirror) {
    ...
    return {start: light.end, end: image};
}
```
Draws the virtual image and distance of an object.

```js
// Vector -> Vector -> String -> (void)
function drawLine(start, end, color) {
    push();
    stroke(color);
    line(start.x, start.y, end.x, end.y)
    pop();
}
```
Adds a line to the canvas.
