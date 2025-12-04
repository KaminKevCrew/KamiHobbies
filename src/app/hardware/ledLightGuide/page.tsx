import React from 'react';
import MermaidDiagram from '../../_components/MermaidDiagram';

export default function LedLightGuide() {

    return(
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold p-4">Designing the Light Guides for the Digital Dash</h1>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                Manufacturing Tradeoffs, Geometry Limits, and Why I Ended Up with SLS Nylon
            </blockquote>

            <p className="p-4">
                One of the trickiest parts of this digital dash project hasn&apos;t been the LEDs, the PCBs, or the firmware—it&apos;s been the light guides.
            </p>

            <p className="p-4">
                These parts sit between dense SK6805-EC10 LED arrays and the visible gauge indicators. Their job is to:
            </p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Confine light into well-defined channels</li>
                <li>Prevent light bleed between segments</li>
                <li>Shape what you see on the gauge into crisp, readable indicators</li>
            </ul>

            <p className="p-4">
                On paper, that sounds straightforward. In reality, it forces some brutal constraints on geometry and manufacturing, especially around thin, opaque walls and sharp interior corners.
            </p>

            <p className="p-4">
                This writeup walks through the manufacturing methods I evaluated, the constraints I ran into, and why I ultimately ended up with single-part SLS black nylon for the light guides.
            </p>

            <h2 className="text-2xl font-bold p-4">System Architecture</h2>

            <MermaidDiagram
                id="light-guide-stack"
                chart={`flowchart TB
    subgraph Visible[Visible Layer]
        Gauge[Gauge Face<br/>Visible Indicators]
    end

    subgraph LightGuide[Light Guide Layer]
        Channels[Light Channels<br/>~0.5mm walls]
        Baffles[Internal Baffles<br/>Light Separation]
    end

    subgraph LED[LED Layer]
        Array[SK6805-EC10<br/>Dense LED Array]
        PCB[Control PCB<br/>STM32 Controller]
    end

    Array -->|Light| Channels
    Channels -->|Shaped Light| Gauge
    Baffles -.->|Prevents Bleed| Channels
    PCB -->|Controls| Array

    style Gauge fill:#2dd4bf
    style Channels fill:#7c3aed
    style Baffles fill:#f472b6
    style Array fill:#818cf8
    style PCB fill:#a78bfa`}
            />

            <h2 className="text-2xl font-bold p-4">1. What the Light Guides Actually Need to Do</h2>

            <p className="p-4">The requirements driving the design:</p>

            <h3 className="text-xl font-semibold p-4">Thin internal walls (~0.5 mm):</h3>
            <p className="p-4">
                To fit within the gauge stackup and keep channel spacing tight.
            </p>

            <h3 className="text-xl font-semibold p-4">Opaque at those thicknesses:</h3>
            <p className="p-4">
                Any glow or bleed through a wall means ghosting between adjacent segments.
            </p>

            <h3 className="text-xl font-semibold p-4">Sharp, well-defined internal features:</h3>
            <p className="p-4">
                Internal corners define where one segment stops and the next begins.
            </p>

            <h3 className="text-xl font-semibold p-4">Geometry that wraps around LEDs and PCB features:</h3>
            <p className="p-4">
                The light guides have to respect LED positions, component clearances, and mechanical mounting.
            </p>

            <p className="p-4">
                And all of this has to survive automotive conditions: vibration, temperature swings, and long-term reliability.
            </p>

            <MermaidDiagram
                id="requirements"
                chart={`mindmap
  root((Light Guide<br/>Requirements))
    Optical
      0.5mm thin walls
      Opaque barriers
      Sharp corners
      No light bleed
    Mechanical
      LED clearance
      PCB mounting
      Vibration resistant
      Temp cycling
    Manufacturing
      Single piece
      Complex internals
      Cost effective
      Reliable process`}
            />

            <h2 className="text-2xl font-bold p-4">2. Why Sharp Vertical Interior Corners Are a Problem for Machining</h2>

            <p className="p-4">
                I initially considered CNC machining the light guides out of materials like PMMA or polycarbonate. Mechanically, these would be great. Optically, they can be polished to very high quality.
            </p>

            <p className="p-4">
                But there&apos;s a fundamental issue:
            </p>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                Any process using a rotating endmill cannot cut a perfectly sharp internal corner aligned with the tool axis.
            </blockquote>

            <p className="p-4">Because the cutter is round:</p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Every interior corner parallel to the tool axis ends up with a radius.</li>
                <li>Even tiny endmills still leave a noticeable fillet.</li>
                <li>Tool deflection and fragility get worse as the tool size shrinks.</li>
            </ul>

            <MermaidDiagram
                id="endmill-problem"
                chart={`flowchart LR
    subgraph Desired[Desired Geometry]
        Sharp[Sharp 90°<br/>Internal Corner]
    end

    subgraph Reality[CNC Reality]
        Endmill[Rotating<br/>Endmill]
        Radius[Radiused<br/>Corner]
    end

    subgraph Problem[Light Problem]
        Leak[Light Leaks<br/>Around Radius]
        Ghost[Ghosting Between<br/>Segments]
    end

    Sharp -->|CNC Process| Endmill
    Endmill -->|Creates| Radius
    Radius -->|Causes| Leak
    Leak -->|Results in| Ghost

    style Sharp fill:#2dd4bf
    style Radius fill:#f472b6
    style Leak fill:#ff6b6b
    style Ghost fill:#ff6b6b`}
            />

            <p className="p-4">For light separation, those radii become unwanted light paths.</p>

            <p className="p-4">For the light guides, that means:</p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Rounded internal partitions → light leaks around corners</li>
                <li>Worse segment separation</li>
                <li>Visible ghosting and halos</li>
            </ul>

            <p className="p-4">
                You can try to work around this with multi-part assemblies or inserts, but that complicates the design and manufacturing a lot.
            </p>

            <p className="p-4">
                This limitation pushed me to look harder at additive methods—especially those that can create sharp internal features without tooling access.
            </p>

            <h2 className="text-2xl font-bold p-4">3. Additive Manufacturing Methods I Explored</h2>

            <MermaidDiagram
                id="manufacturing-decision"
                chart={`flowchart TD
    Start[Light Guide<br/>Requirements] --> FDM{FDM<br/>Fused Deposition}

    FDM -->|Pros: Cheap, Fast| FDM_Test[Test Print]
    FDM_Test -->|Cons: Layer lines,<br/>Poor precision,<br/>Warping| FDM_Reject[❌ Rejected<br/>Optical quality too poor]

    Start --> SLA{SLA<br/>Resin Printing}
    SLA -->|Pros: Sharp features,<br/>Smooth surface| SLA_Test[Test Print]
    SLA_Test -->|Cons: Not opaque<br/>at 0.5mm| SLA_Reject[❌ Rejected<br/>Light bleeds through walls]

    Start --> SLS{SLS<br/>Black Nylon}
    SLS -->|Pros: Opaque walls,<br/>Complex internals| SLS_Test[Test Print]
    SLS_Test -->|Meets all<br/>requirements| SLS_Accept[✅ Selected<br/>Production method]

    Start --> SLM{SLM<br/>Metal Printing}
    SLM -->|Pros: Sharp corners,<br/>Complex geometry| SLM_Test[Test Print]
    SLM_Test -->|Cons: Heavy,<br/>Expensive,<br/>Chipping risk| SLM_Reject[❌ Rejected<br/>Reliability concerns]

    style FDM_Reject fill:#ff6b6b
    style SLA_Reject fill:#ff6b6b
    style SLS_Accept fill:#2dd4bf
    style SLM_Reject fill:#ff6b6b`}
            />

            <h3 className="text-xl font-semibold p-4">FDM (Fused Deposition Modeling)</h3>

            <p className="p-4"><strong>Pros:</strong></p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Cheap</li>
                <li>Fast iteration</li>
                <li>Good for rough, initial geometry exploration</li>
            </ul>

            <p className="p-4"><strong>Cons:</strong></p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Layer lines and surface roughness scatter light</li>
                <li>Poor dimensional precision for thin walls</li>
                <li>Thin features tend to warp</li>
                <li>Structural + optical performance is not good enough</li>
            </ul>

            <p className="p-4"><strong>Verdict:</strong><br/>
                Great for early prototypes of shape, but not even close to acceptable for production or real optical behavior.
            </p>

            <h3 className="text-xl font-semibold p-4">SLA (Resin Printing)</h3>

            <p className="p-4">On paper, SLA looks perfect:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Fantastic resolution</li>
                <li>Very sharp internal features</li>
                <li>Smooth surfaces</li>
                <li>Tight tolerances</li>
            </ul>

            <p className="p-4">But there&apos;s one non-negotiable requirement it fails:</p>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                I need walls around 0.5 mm thick to be truly opaque in the visible spectrum.
            </blockquote>

            <p className="p-4">The problem:<br/>
                Despite being marketed as &quot;opaque,&quot; SLA resins just aren&apos;t fully opaque at those thicknesses. At ~0.5 mm:
            </p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>&quot;Black&quot; resins glow gray under LED light</li>
                <li>&quot;Opaque&quot; colored resins become weird diffusers</li>
                <li>Light bleeds right through the walls</li>
            </ul>

            <p className="p-4">
                It isn&apos;t just pigment loading; it&apos;s also the underlying polymer network. UV-cured resin simply doesn&apos;t block light efficiently enough in thin sections for this use.
            </p>

            <p className="p-4"><strong>Verdict:</strong><br/>
                SLA is fantastic for form and fit, but fundamentally fails the light-blocking requirement. It&apos;s useful for quick visual/fit prototypes, but not as a functional light guide material here.
            </p>

            <h3 className="text-xl font-semibold p-4">SLS (Selective Laser Sintering – Black Nylon)</h3>

            <p className="p-4">This is the method I ended up using.</p>

            <p className="p-4"><strong>Pros:</strong></p>

            <h4 className="text-lg font-semibold px-4">Single-part geometry:</h4>
            <p className="p-4">
                No need for multi-piece assemblies to work around tool access. Internal channels and baffles can be built in one shot.
            </p>

            <h4 className="text-lg font-semibold px-4">Opaque at thin walls:</h4>
            <p className="p-4">
                With the black nylon SLS material, walls around 0.5 mm thick are opaque enough to prevent light bleed between channels. This is crucial: the material actually does what the datasheets and marketing often hand-wave.
            </p>

            <h4 className="text-lg font-semibold px-4">Good dimensional consistency:</h4>
            <p className="p-4">
                Plenty accurate for aligning with LED arrays and PCB edges.
            </p>

            <h4 className="text-lg font-semibold px-4">Slightly textured surface that works in my favor:</h4>
            <p className="p-4">
                Inside the baffles, a slightly matte surface helps absorb stray light instead of reflecting it.
            </p>

            <p className="p-4"><strong>Cons:</strong></p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Not optically clear (which is fine here—I want opaque baffles).</li>
                <li>Surface isn&apos;t as smooth as SLA or machined acrylic, but that&apos;s more of a non-issue for light-blocking cavities than it would be for a transmissive light pipe.</li>
            </ul>

            <p className="p-4"><strong>Verdict:</strong><br/>
                For this use case—opaque, thin-walled light channels with complex internal geometry—black SLS nylon hits the sweet spot between function and manufacturability. It&apos;s the process I chose for the actual light-guide parts.
            </p>

            <h3 className="text-xl font-semibold p-4">SLM / DMLS (Metal Printing)</h3>

            <p className="p-4">SLM is interesting because it solves one major geometric problem:</p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>No endmills → no tool-radius limitations</li>
                <li>Extremely complex 3D internal geometry is possible</li>
                <li>Internal corners can be very sharp</li>
            </ul>

            <p className="p-4">
                From a pure geometry perspective, SLM would actually be excellent for this: crisp internal corners, robust structure, no tool access concerns.
            </p>

            <p className="p-4">But there are some big deal-breakers:</p>

            <h4 className="text-lg font-semibold px-4">Weight & Cost</h4>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Metal prints are way heavier than nylon.</li>
                <li>Per-part cost is significantly higher, especially for larger pieces.</li>
            </ul>

            <h4 className="text-lg font-semibold px-4">Incompatible with the rest of the stackup</h4>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>These light guides live right above PCBs and soldered components.</li>
                <li>A heavy, metal light guide is not ideal in that environment.</li>
            </ul>

            <h4 className="text-lg font-semibold px-4">Vibration and chipping risk</h4>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Automotive environments are high vibration by definition.</li>
                <li>If a metal SLM part ever chips or frets against the PCB, it can damage solder mask.</li>
                <li>Worst-case: small conductive flakes end up on the board → intermittent shorts over time.</li>
            </ul>

            <p className="p-4">
                That long-term reliability concern is a big one: I don&apos;t want the light guide itself to become a failure mode.
            </p>

            <p className="p-4"><strong>Verdict:</strong><br/>
                Geometrically wonderful, but too heavy, too expensive, and potentially risky in a high-vibration automotive environment due to the chance of chipping solder mask or creating metal debris.
            </p>

            <h2 className="text-2xl font-bold p-4">4. Why SLS Nylon Won</h2>

            <p className="p-4">
                After working through all of the above, the decision to use single-part SLS black nylon came down to a few key points:
            </p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>It&apos;s opaque enough at ~0.5 mm to prevent light bleed between segments.</li>
                <li>It allows single-piece geometry with all the internal channels and baffles I need, without worrying about tool access.</li>
                <li>The internal surface texture actually helps absorb stray light, improving contrast.</li>
                <li>It&apos;s lightweight, which is important when it&apos;s mounted on top of PCBs inside a car.</li>
                <li>It avoids the debonding/chipping/shorting risks associated with a metal part bouncing around over solder mask in a high-vibration environment.</li>
            </ul>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                In other words: SLS isn&apos;t the most visually glamorous process, but for opaque, thin-walled, complex internal geometry in a high-vibration automotive application, it does the job better than anything else I tested.
            </blockquote>

            <MermaidDiagram
                id="comparison-matrix"
                chart={`graph TD
    subgraph Methods[Manufacturing Methods Comparison]
        direction TB

        subgraph FDM_Block[FDM]
            FDM_Cost[💰 Cost: Low]
            FDM_Opt[👁️ Optical: Poor]
            FDM_Geo[📐 Geometry: Limited]
            FDM_Rel[🔧 Reliability: Poor]
        end

        subgraph SLA_Block[SLA Resin]
            SLA_Cost[💰 Cost: Medium]
            SLA_Opt[👁️ Optical: FAILS<br/>Not opaque]
            SLA_Geo[📐 Geometry: Excellent]
            SLA_Rel[🔧 Reliability: Good]
        end

        subgraph SLS_Block[SLS Nylon ✅]
            SLS_Cost[💰 Cost: Medium]
            SLS_Opt[👁️ Optical: Excellent<br/>Opaque at 0.5mm]
            SLS_Geo[📐 Geometry: Excellent]
            SLS_Rel[🔧 Reliability: Excellent]
        end

        subgraph SLM_Block[SLM Metal]
            SLM_Cost[💰 Cost: High]
            SLM_Opt[👁️ Optical: Good]
            SLM_Geo[📐 Geometry: Excellent]
            SLM_Rel[🔧 Reliability: RISK<br/>Chipping concern]
        end
    end

    style SLS_Block fill:#2dd4bf,stroke:#2dd4bf,stroke-width:4px
    style SLA_Opt fill:#ff6b6b
    style SLM_Rel fill:#ff6b6b
    style FDM_Opt fill:#ff6b6b
    style FDM_Rel fill:#ff6b6b`}
            />

            <h2 className="text-2xl font-bold p-4">5. Big Picture: What This Says About the Design</h2>

            <p className="p-4">This light-guide work ended up being a good example of how:</p>

            <ul className="list-disc list-inside p-4 space-y-2">
                <li>&quot;Best resolution&quot; (SLA) doesn&apos;t always mean &quot;best part.&quot;</li>
                <li>&quot;Best geometry freedom&quot; (SLM) doesn&apos;t always mean &quot;best system-level choice.&quot;</li>
                <li>Classic machining hits fundamental geometry limits with internal corners.</li>
                <li>The &quot;rougher&quot; process (SLS) can be the right answer when the physics of light, wall thickness, and real-world environment are all accounted for.</li>
            </ul>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                The final light guides aren&apos;t just shaped by LED placement or aesthetic design—they&apos;re the result of a careful balance between optics, mechanics, manufacturing limits, and automotive reliability.
            </blockquote>

        </div>
    )
}