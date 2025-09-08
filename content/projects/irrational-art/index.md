+++
date = '2025-09-08T13:40:15-07:00'
title: "irrational-art — Interactive Diagrams of Irrational Numbers"
date: 2025-09-08
draft: true
tags: ["javascript", "visualization", "creative-coding", "math", "canvas"]
summary: "An interactive canvas exploration of π, e, φ, and √2 inspired by Nadieh Bremer’s ‘The Art in Pi’—expanded to multiple constants with smooth pan/zoom and live digit controls."
cover:
image: "/images/irrational-art/IrrationalArt500DigitsOfE.png"   # TODO: add a render/screenshot
alt: "Irrational number art drawn on an HTML canvas"
+++

> Inspired by Nadieh Bremer’s *The Art in Pi*, this project turns streams of digits from multiple irrational numbers (π, e, φ, √2) into colored, directed line segments. I extended the idea to be **interactive** (pan/zoom under the cursor), **switchable between numbers**, and configurable by **digit length** or **custom input**.

## TL;DR / Highlights
- **Multiple numbers**: π, e, φ, √2 datasets (from 20k to multi-million digits).
- **Interactive canvas**: smooth pan & scroll-wheel zoom centered on the cursor.
- **Deterministic layout**: each digit maps to a direction & color.
- **Composable modules**: clear separation between **rendering**, **transform management**, **interaction**, and **digit mapping**.

---

## Demo & Controls
- **Switch numbers** via the nav buttons (`π`, `e`, `φ`, `√2`).
- **Custom input**: paste digits, choose how many to render, re-generate.
- **Pan**: click-drag anywhere on the canvas.
- **Zoom**: mouse wheel (zoom is centered on the cursor position).
- **Reset**: reload or pick a different number.

---

## Architecture Overview


### 1) Digit → Geometry (direction + color)
`segment_builder.js` converts each digit (`0–9`) into a 36° step on a circle (10 slices = 360°), producing a unit step vector and a color:

- **Direction**: `sin/cos(angle)` with `angle = digit × 36°`
- **Step size**: configurable `scale` (defaults to `10`)
- **Color**: per-digit palette (readable, high-contrast)

Each incoming digit becomes a small vector. Chaining vectors produces the path.

### 2) Rendering
`render.js` iterates digits, accumulating **start → end** positions and stroking a segment per digit:

- Positions accumulate so the polyline **walks** the plane.
- Stroke style uses the digit’s mapped color.
- Inputs (digit count, custom text) are normalized before draw.

### 3) Interaction (Pan/Zoom) — the tricky part
**Canvas 2D** doesn’t expose an inverse transform out of the box, so mapping **screen** coordinates (mouse) to **world** coordinates (your transformed canvas space) is non-trivial. The project solves this with a well-known technique:

- **`track_transforms.js`** wraps the `CanvasRenderingContext2D`, maintaining a live **SVGMatrix** mirror of the context’s transform.
- It **overrides** `save/restore/scale/rotate/translate/transform/setTransform` to keep an accurate matrix.
- It exposes **`ctx.transformedPoint(x, y)`**, which converts screen points into the current world space using the **inverse** of the tracked matrix.

That unlocks precise pan/zoom behaviors—e.g., zoom **around the cursor** (not the canvas origin), and pan in world units even as you zoom.

---

## Key Interaction Code

### A) Tracking the transform & inverse mapping
From `src/track_transforms.js` (core idea excerpt):
```js
// Maintain a parallel SVGMatrix transform for the canvas context.
var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
var xform = svg.createSVGMatrix();

ctx.getTransform = function () { return xform; };

const savedTransforms = [];
const save = ctx.save;
ctx.save = function () {
  savedTransforms.push(xform.translate(0, 0));
  return save.call(ctx);
};

// ... similar overrides for restore/scale/rotate/translate/transform/setTransform ...

const setTransform = ctx.setTransform;
ctx.setTransform = function (a, b, c, d, e, f) {
  xform.a = a; xform.b = b; xform.c = c;
  xform.d = d; xform.e = e; xform.f = f;
  return setTransform.call(ctx, a, b, c, d, e, f);
};

// Convert a screen-space point to world-space using the inverse matrix.
const pt = svg.createSVGPoint();
ctx.transformedPoint = function (x, y) {
  pt.x = x; pt.y = y;
  return pt.matrixTransform(xform.inverse());
};

let lastX = canvas.width / 2, lastY = canvas.height / 2;
let dragStart, dragged;

canvas.addEventListener('mousedown', (evt) => {
  lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
  lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
  dragStart = ctx.transformedPoint(lastX, lastY);
  dragged = false;
}, false);

canvas.addEventListener('mousemove', (evt) => {
  lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
  lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
  dragged = true;
  if (dragStart) {
    const pt = ctx.transformedPoint(lastX, lastY);
    ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y); // PAN in world space
    redraw();
  }
}, false);

canvas.addEventListener('mouseup', (evt) => {
  dragStart = null;
  if (!dragged) {
    zoom(evt.shiftKey ? -1 : 1); // click to zoom in/out
  }
}, false);

const scaleFactor = 1.01; // smooth zoom
function zoom(clicks) {
  const pt = ctx.transformedPoint(lastX, lastY); // cursor pos → world space
  ctx.translate(pt.x, pt.y);
  const factor = Math.pow(scaleFactor, clicks);
  ctx.scale(factor, factor);                       // ZOOM around cursor
  ctx.translate(-pt.x, -pt.y);
  redraw();
}

function handleScroll(evt) {
  const delta = evt.wheelDelta ? evt.wheelDelta / 40 : (evt.detail ? -evt.detail : 0);
  if (delta) zoom(delta);
  evt.preventDefault();
}
canvas.addEventListener('DOMMouseScroll', handleScroll, false);
canvas.addEventListener('mousewheel', handleScroll, false);
