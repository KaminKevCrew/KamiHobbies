import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import CodeBlock from '../../_components/CodeBlock';
import E500Digs from '../../../../public/softwarePhotos/IrrationalArt500DigitsOfE.png'
import Phi500Digs from '../../../../public/softwarePhotos/IrrationalArt500DigitsOfPhi.png'
import Pi500Digs from '../../../../public/softwarePhotos/IrrationalArt500DigitsOfPi.png'
import RootTwo500Digs from '../../../../public/softwarePhotos/IrrationalArt500DigitsOfRootTwo.png'
import E20kDigs from '../../../../public/softwarePhotos/IrrationalArt20kDigitsOfE.png'
import Phi20kDigs from '../../../../public/softwarePhotos/IrrationalArt20kDigitsOfPhi.png'
import Pi20kDigs from '../../../../public/softwarePhotos/IrrationalArt20kDigitsOfPi.png'
import RootTwo20kDigs from '../../../../public/softwarePhotos/IrrationalArt20kDigitsOfRootTwo.png'


export default function IrrationalArt() {

    return(
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold p-4">irrational-art — Interactive Diagrams of Irrational Numbers</h1>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                Inspired by Nadieh Bremer&apos;s <em>The Art in Pi</em>, <strong>irrational-art</strong> renders digit sequences from <strong>π, e, φ</strong>, and <strong>√2</strong> as colored, directed steps on an infinite plane. I extended the concept to support multiple constants, configurable digit counts, and a robust interaction layer with <strong>cursor-centric pan/zoom</strong>.
            </blockquote>

            <div className="p-4">
                <strong>Try it live:</strong>{' '}
                <Link href="https://irrational-art.kamihobbies.com" passHref legacyBehavior>
                    <a target="_blank" className="link link-primary">
                        irrational-art.kamihobbies.com
                    </a>
                </Link>
            </div>

            <h2 className="text-2xl font-bold p-4">Highlights</h2>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Multiple constants:</strong> switch between π, e, φ (golden ratio), and √2.</li>
                <li><strong>Intuitive controls:</strong> click-drag to pan; mouse wheel to zoom where the cursor points.</li>
                <li><strong>Deterministic mapping:</strong> each digit maps to a 36° direction and a stable color.</li>
                <li><strong>Snappy redraws:</strong> re-render only on interaction or input change.</li>
            </ul>

            <h2 className="text-2xl font-bold p-4">Screenshots</h2>
            <div className="carousel carousel-center rounded-box w-full space-x-4 p-4">
                <div id="slide1" className="carousel-item flex-col items-center">
                    <Image
                        src={ E500Digs }
                        alt="500 Digits of E"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of E</div>
                </div>
                <div id="slide2" className="carousel-item flex-col items-center">
                    <Image
                        src={ Phi500Digs }
                        alt="500 Digits of Phi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of Phi</div>
                </div>
                <div id="slide3" className="carousel-item flex-col items-center">
                    <Image
                        src={ Pi500Digs }
                        alt="500 Digits of Pi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of Pi</div>
                </div>
                <div id="slide4" className="carousel-item flex-col items-center">
                    <Image
                        src= { RootTwo500Digs }
                        alt="500 Digits of Root Two"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of Root Two</div>
                </div>
                <div id="slide5" className="carousel-item flex-col items-center">
                    <Image
                        src={ E20kDigs }
                        alt="20,000 Digits of E"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of E</div>
                </div>
                <div id="slide6" className="carousel-item flex-col items-center">
                    <Image
                        src={ Phi20kDigs }
                        alt="20,000 Digits of Phi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of Phi</div>
                </div>
                <div id="slide7" className="carousel-item flex-col items-center">
                    <Image
                        src={ Pi20kDigs }
                        alt="20,000 Digits of Pi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of Pi</div>
                </div>
                <div id="slide8" className="carousel-item flex-col items-center">
                    <Image
                        src={ RootTwo20kDigs }
                        alt="20,000 Digits of Root Two"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of Root Two</div>
                </div>
            </div>

            <h2 className="text-2xl font-bold p-4">How it works (short)</h2>
            <p className="p-4">
                <strong>Digit → step.</strong> Each digit <code>0–9</code> selects a slice on the unit circle (<code>digit * 36°</code>). That slice becomes a small vector <code>(dx, dy)</code> and a color from a fixed palette. Chaining thousands of these vectors yields a path that &quot;walks&quot; the plane.
            </p>
            <p className="p-4">
                <strong>Rendering.</strong> The canvas iterates digits, accumulates positions, and strokes each segment with the digit&apos;s color. Inputs (constant, digit count, custom text) are normalized before draw.
            </p>

            <h2 className="text-2xl font-bold p-4">The hard part: precise mouse interaction on a transformed canvas</h2>
            <p className="p-4">
                HTML Canvas 2D doesn&apos;t give you a built-in inverse transform, so translating <strong>screen</strong> coordinates (mouse events) into <strong>world</strong> coordinates (after pan/zoom) is the tricky bit. I solved this by <strong>wrapping the 2D context</strong> and mirroring its transform with an <code>SVGMatrix</code>, then exposing a single helper method:
            </p>
            <CodeBlock
                language="javascript"
                code={`// ctx.transformedPoint(x, y) → world-space point under the cursor
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const pt = svg.createSVGPoint();
let xform = svg.createSVGMatrix();

// ...override save/restore/translate/scale/rotate/transform/setTransform
// to keep xform in sync with the canvas context...

ctx.transformedPoint = function (x, y) {
  pt.x = x; pt.y = y;
  return pt.matrixTransform(xform.inverse());
};`}
            />

            <p className="p-4">
                With <code>transformedPoint</code>, pan and zoom become straightforward and feel correct at any scale:
            </p>
            <CodeBlock
                language="javascript"
                code={`let lastX = 0, lastY = 0;
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
}, { passive: false });`}
            />

            <h3 className="text-xl font-semibold p-4">Why this matters:</h3>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Cursor-anchored zoom</strong> keeps the point you&apos;re examining fixed beneath the mouse, avoiding the &quot;zoom drifts away&quot; problem.</li>
                <li><strong>World-space pan</strong> makes dragging feel consistent regardless of zoom level.</li>
                <li>Overriding transform methods ensures the mirror matrix and the canvas stay perfectly in sync.</li>
            </ul>

            <h2 className="text-2xl font-bold p-4">Performance notes</h2>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Redraw on demand</strong> (interaction/input changes only).</li>
                <li>Clamp zoom (<code>zMin</code>/<code>zMax</code>) to prevent runaway scales.</li>
                <li>Thin strokes + light global alpha add depth without heavy blending.</li>
                <li>Future work: chunked/progressive rendering for very large digit counts, HiDPI scaling via <code>devicePixelRatio</code>, optional <code>OffscreenCanvas</code>.</li>
            </ul>

            <h2 className="text-2xl font-bold p-4">Controls</h2>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Pan:</strong> click-drag</li>
                <li><strong>Zoom:</strong> mouse wheel (cursor-centric)</li>
                <li><strong>Switch constant / digits:</strong> UI controls (π, e, φ, √2; 500 → 20k+)</li>
                <li><strong>Reset view:</strong> select a new constant or reload</li>
            </ul>

            <h2 className="text-2xl font-bold p-4">Credits</h2>
            <p className="p-4">
                Concept inspired by Nadieh Bremer&apos;s{' '}
                <Link href="https://www.visualcinnamon.com/art/the-art-in-pi/" passHref legacyBehavior>
                    <a target="_blank" className="link link-primary">
                        <em>The Art in Pi</em>
                    </a>
                </Link>
                .
            </p>
        </div>
    )
}