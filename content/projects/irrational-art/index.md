---
title: "irrational-art — Interactive Diagrams of Irrational Numbers"
date: 2025-09-08
draft: true
tags:
  - javascript
  - visualization
  - creative-coding
  - math
  - canvas
summary: "Interactive Art-in-Pi expansion..."
cover:
  image: "IrrationalArt20kDigitsOfPi.png"
  alt: "20,000 digits of π..."
---


> Inspired by Nadieh Bremer's *The Art in Pi*, **irrational-art** renders digit sequences from **π, e, φ**, and **√2** as colored, directed steps on an infinite plane. I extended the concept to support multiple constants, configurable digit counts, and a robust interaction layer with **cursor-centric pan/zoom**.

**Try it live:** [irrational-art.kamihobbies.com](https://irrational-art.kamihobbies.com)

## Highlights

* **Multiple constants:** switch between π, e, φ (golden ratio), and √2.
* **Intuitive controls:** click-drag to pan; mouse wheel to zoom where the cursor points.
* **Deterministic mapping:** each digit maps to a 36° direction and a stable color.
* **Snappy redraws:** re-render only on interaction or input change.

## Screenshots

{{< carousel match="IrrationalArt*.png" width="1600" q="82" altprefix="irrational-art render" auto="5000" label="Irrational-art screenshots" link="true" >}}

## How it works (short)

**Digit → step.** Each digit `0–9` selects a slice on the unit circle (`digit * 36°`). That slice becomes a small vector `(dx, dy)` and a color from a fixed palette. Chaining thousands of these vectors yields a path that “walks” the plane.

**Rendering.** The canvas iterates digits, accumulates positions, and strokes each segment with the digit’s color. Inputs (constant, digit count, custom text) are normalized before draw.

## The hard part: precise mouse interaction on a transformed canvas

HTML Canvas 2D doesn’t give you a built-in inverse transform, so translating **screen** coordinates (mouse events) into **world** coordinates (after pan/zoom) is the tricky bit. I solved this by **wrapping the 2D context** and mirroring its transform with an `SVGMatrix`, then exposing a single helper method:

```js
// ctx.transformedPoint(x, y) → world-space point under the cursor
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const pt = svg.createSVGPoint();
let xform = svg.createSVGMatrix();

// ...override save/restore/translate/scale/rotate/transform/setTransform
// to keep xform in sync with the canvas context...

ctx.transformedPoint = function (x, y) {
  pt.x = x; pt.y = y;
  return pt.matrixTransform(xform.inverse());
};
```

With `transformedPoint`, pan and zoom become straightforward and feel correct at any scale:

```js
let lastX = 0, lastY = 0;
let dragStart = null;

// PAN: world-space delta between drag start and current cursor
canvas.addEventListener('mousedown', (e) => {
  lastX = e.offsetX; lastY = e.offsetY;
  dragStart = ctx.transformedPoint(lastX, lastY);
});
canvas.addEventListener('mousemove', (e) => {
  lastX = e.offsetX; lastY = e.offsetY;
  if (!dragStart) return;
  const p = ctx.transformedPoint(lastX, lastY);
  ctx.translate(p.x - dragStart.x, p.y - dragStart.y);
  redraw();
});
canvas.addEventListener('mouseup', () => { dragStart = null; });

// ZOOM: anchor to the world point under the cursor
const scaleFactor = 1.01;
function zoom(clicks) {
  const p = ctx.transformedPoint(lastX, lastY);
  ctx.translate(p.x, p.y);
  const factor = Math.pow(scaleFactor, clicks);
  ctx.scale(factor, factor);
  ctx.translate(-p.x, -p.y);
  redraw();
}
canvas.addEventListener('wheel', (e) => {
  lastX = e.offsetX; lastY = e.offsetY;
  zoom(-e.deltaY / 40);
  e.preventDefault();
}, { passive: false });
```

**Why this matters:**

* **Cursor-anchored zoom** keeps the point you’re examining fixed beneath the mouse, avoiding the “zoom drifts away” problem.
* **World-space pan** makes dragging feel consistent regardless of zoom level.
* Overriding transform methods ensures the mirror matrix and the canvas stay perfectly in sync.

## Performance notes

* **Redraw on demand** (interaction/input changes only).
* Clamp zoom (`zMin`/`zMax`) to prevent runaway scales.
* Thin strokes + light global alpha add depth without heavy blending.
* Future work: chunked/progressive rendering for very large digit counts, HiDPI scaling via `devicePixelRatio`, optional `OffscreenCanvas`.

## Controls

* **Pan:** click-drag
* **Zoom:** mouse wheel (cursor-centric)
* **Switch constant / digits:** UI controls (π, e, φ, √2; 500 → 20k+)
* **Reset view:** select a new constant or reload

## Credits

* Concept inspired by Nadieh Bremer’s *The Art in Pi*.
