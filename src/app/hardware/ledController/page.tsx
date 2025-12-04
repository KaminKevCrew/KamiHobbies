import React from 'react';
import MermaidDiagram from '../../_components/MermaidDiagram';

export default function LedController() {

    return(
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold p-4">Driving a Modern Digital Dash: Why I Chose the STM32G031F6P6</h1>

            <p className="p-4">
                One of the central engineering challenges in my custom automotive digital dash project is controlling hundreds of SK6805-EC10 addressable RGB LEDs spread across multiple gauge clusters. Each gauge contains dozens of LEDs arranged into segments—groups of LEDs that must illuminate in perfect unison to replicate the clean, high-contrast look of the Toyota Supra&apos;s third-generation factory VFD dashboard.
            </p>

            <p className="p-4">
                To deliver smooth, synchronized lighting at ~30FPS across the entire dash, I designed a distributed architecture using one microcontroller per gauge. The MCU receives high-level data (via I²C) from a central ESP32-S3 controller and then generates precise, high-bandwidth timing signals to its local LED segments.
            </p>

            <p className="p-4">
                After evaluating several microcontroller families, I selected the STM32G031F6P6 for each gauge board. This page explains how the G031 is used technically, and why it became the best choice for the job.
            </p>

            <h2 className="text-2xl font-bold p-4">System Architecture</h2>

            <MermaidDiagram
                id="system-architecture"
                chart={`flowchart LR
    subgraph Vehicle
        ECU(CANBus ECU)
        Sensors(Factory Sensors)
    end

    subgraph MainBoard[Main Controller Board]
        ESP32(ESP32-S3<br/>CAN + Web UI + I2C Master)
    end

    I2C_BUS{{I²C Bus}}

    subgraph Gauges[Individual Gauge Boards]
        G031A[STM32G031F6<br/>Gauge 1]
        G031B[STM32G031F6<br/>Gauge 2]
        G031C[STM32G031F6<br/>Gauge 3]
        G031D[STM32G031F6<br/>Gauge 4]
        G031E[STM32G031F6<br/>Gauge 5]
        G031F[STM32G031F6<br/>Gauge 6]
    end

    subgraph LEDs[LED Segments]
        SegA[Segments<br/>Gauge 1 LEDs]
        SegB[Segments<br/>Gauge 2 LEDs]
        SegC[Segments<br/>Gauge 3 LEDs]
        SegD[Segments<br/>Gauge 4 LEDs]
        SegE[Segments<br/>Gauge 5 LEDs]
        SegF[Segments<br/>Gauge 6 LEDs]
    end

    ECU --> ESP32
    Sensors --> ESP32

    ESP32 --> I2C_BUS

    I2C_BUS --> G031A
    I2C_BUS --> G031B
    I2C_BUS --> G031C
    I2C_BUS --> G031D
    I2C_BUS --> G031E
    I2C_BUS --> G031F

    G031A --> SegA
    G031B --> SegB
    G031C --> SegC
    G031D --> SegD
    G031E --> SegE
    G031F --> SegF`}
            />

            <h2 className="text-2xl font-bold p-4">How the STM32G031F6P6 Drives the LEDs</h2>

            <p className="p-4">Each gauge includes:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>20–60+ SK6805-EC10 LEDs per segment</li>
                <li>Multiple segments per gauge</li>
                <li>LEDs wired mostly in parallel per segment</li>
                <li>Up to 150 mm of trace length for some large segments</li>
            </ul>

            <p className="p-4">To drive these LEDs reliably, the STM32G031 performs several key functions.</p>

            <h3 className="text-xl font-semibold p-4">1. Precise PWM + DMA Waveform Generation</h3>

            <p className="p-4">SK6805 LEDs require strict timing:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>800 kHz serial stream</li>
                <li>~1.25 μs per bit</li>
                <li>Very tight high/low pulse periods for &quot;0&quot; vs &quot;1&quot;</li>
            </ul>

            <p className="p-4">
                Distributing this workload to individual MCUs keeps timing local, stable, and immune to long cable runs or bus latency.
            </p>

            <p className="p-4">On each gauge, the G031 uses:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>TIM2 or TIM3 configured in PWM mode</li>
                <li>DMA feeding the CCR register to create exact high/low pulse widths</li>
                <li>A dynamically generated bit-buffer that maps each logical LED value into a sequence of PWM timings</li>
            </ul>

            <MermaidDiagram
                id="led-timing"
                chart={`sequenceDiagram
    participant CPU as G031 CPU
    participant Buf as LED Bit Buffer
    participant DMA as DMA Controller
    participant TIM as TIM2/TIM3 (PWM)
    participant LED as SK6805 LED Chain

    CPU->>Buf: Write GRB values<br/>Convert to bit timings
    CPU->>DMA: Start DMA Transfer

    DMA->>TIM: Load CCR value (bit 0 high)
    TIM->>LED: Output pulse

    DMA->>TIM: Load CCR value (bit 0 low)
    TIM->>LED: Output pulse

    DMA->>TIM: Load CCR value (bit 1 high)
    TIM->>LED: Output pulse

    DMA->>TIM: Load CCR value (bit 1 low)
    TIM->>LED: Output pulse

    Note over DMA, TIM: Continues until 24 bits per LED have been sent

    TIM->>LED: Send RESET pulse
    LED->>LED: Latch color and display`}
            />

            <p className="p-4">This approach offloads nearly all LED timing from the CPU. Once a DMA transfer begins, the LED data stream is produced autonomously by hardware. The CPU is free to:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Prepare the next frame of LED data</li>
                <li>Handle incoming I²C commands</li>
                <li>Perform per-segment color calculations</li>
                <li>Apply brightness scaling or gamma correction</li>
            </ul>

            <p className="p-4">This architecture is extremely predictable, low-jitter, and scales well as segment sizes grow.</p>

            <h3 className="text-xl font-semibold p-4">2. Each Gauge MCU Receives I²C Commands from the Central Controller</h3>

            <p className="p-4">The central ESP32-S3 converts CANBus and vehicle sensor signals into gauge values, then broadcasts them over a resilient I²C bus to each gauge.</p>

            <p className="p-4">Each G031:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Implements an I²C slave at a unique address</li>
                <li>Receives segment brightness, color, and state info</li>
                <li>Updates only the segments relevant to that specific gauge</li>
                <li>Converts those logical values into the LED timing buffer</li>
            </ul>

            <p className="p-4">
                Because the G031 only receives logical data (not raw LED frames), the I²C bus carries only a few dozen bytes per gauge per frame — not Mbps-scale data.
            </p>

            <p className="p-4">This massively reduces wiring complexity and keeps gauge-to-gauge timing consistent.</p>

            <MermaidDiagram
                id="gauge-board"
                chart={`flowchart LR
    ESP[ESP32-S3<br/>I²C Master]

    subgraph GaugeBoard[Single Gauge PCB]
        I2C[I²C Slave Handler]

        subgraph Timing[LED Timing Engine]
            Timer[TIM2/TIM3 PWM]
            DMA[DMA → CCR Stream]
            BitBuffer[Bit-Encoded LED Frame Buffer]
        end

        Calc[Segment Color & Brightness Calculator]
        MEMS[MEMS Oscillator<br/>Stable Clock Source]
        Power[Local 5V Plane<br/>Decoupling Caps]
        SK[SK6805-EC10<br/>Parallel LED Segments]
    end

    ESP --> I2C
    I2C --> Calc
    Calc --> BitBuffer
    BitBuffer --> DMA
    DMA --> Timer
    Timer --> SK
    MEMS --> Timer
    Power --> SK`}
            />

            <h3 className="text-xl font-semibold p-4">3. Hardware-Backed Timing from an External MEMS Oscillator</h3>

            <p className="p-4">
                Unlike many small MCUs, the G031 supports stable timing from an external clock source. For this project, each gauge PCB includes a high-accuracy MEMS oscillator to ensure:
            </p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Zero drift in LED timing</li>
                <li>Consistency across temperature and vibration</li>
                <li>Predictable DMA transfers</li>
                <li>Synchronized appearance between gauges</li>
            </ul>

            <p className="p-4">
                Automotive temperature swings can easily push internal RC oscillators out of spec; using a MEMS oscillator eliminates this risk entirely.
            </p>

            <h3 className="text-xl font-semibold p-4">4. 4-Layer PCB with Local Decoupling for High LED Counts</h3>

            <p className="p-4">One gauge includes a 150 mm span with ~60 LEDs wired in parallel — a significant capacitive load.</p>

            <p className="p-4">The G031 handles this safely because:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Boards use internal 5V and GND planes for low-impedance power delivery</li>
                <li>Each group of ~3 LEDs receives a dedicated 1 µF capacitor</li>
                <li>Optional solder-jumpers allow splitting long segments into multiple fan-out paths</li>
                <li>The G031&apos;s fast GPIO and timers easily drive the required signal integrity</li>
            </ul>

            <p className="p-4">Signal degradation is mitigated through PCB layout, local buffering, and tight control of rise/fall times.</p>

            <MermaidDiagram
                id="led-wiring"
                chart={`flowchart LR
    subgraph Segment[One Gauge Segment]
        DI[Data Input]
        LED1[LED1]
        LED2[LED2]
        LED3[LED3]
        LEDN[LED60+]
    end

    DI -->|Parallel Fan-Out| LED1
    DI --> LED2
    DI --> LED3
    DI --> LEDN

    LED1 -.->|Only one LED<br/>passes data forward| Next[Next Segment]`}
            />

            <h2 className="text-2xl font-bold p-4">Why I Chose the STM32G031F6P6</h2>

            <p className="p-4">
                There are many microcontrollers that can drive addressable LEDs — so why use the G031 specifically?
            </p>

            <p className="p-4">
                After extensive testing, cost analysis, and architecture simulation, it became clear that the G031 hit the perfect balance of price, features, and robustness.
            </p>

            <h3 className="text-xl font-semibold p-4">1. It Has Exactly the Features Needed — and Nothing Extra</h3>

            <p className="p-4">The G031 includes:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>High-quality timers with flexible PWM</li>
                <li>DMA capable of feeding timers directly</li>
                <li>Sufficient RAM for LED buffers</li>
                <li>I²C hardware with robust interrupt handling</li>
                <li>A stable clocking architecture that accepts external oscillators</li>
                <li>Automotive-friendly operating range and stability</li>
            </ul>

            <p className="p-4">Crucially, it does not include expensive features I don&apos;t need:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>No large Flash footprint</li>
                <li>No high-end peripherals</li>
                <li>No radio</li>
                <li>No unnecessary power management complexity</li>
            </ul>

            <p className="p-4">This keeps cost and power consumption extremely low.</p>

            <h3 className="text-xl font-semibold p-4">2. Performance-per-Dollar Is Excellent</h3>

            <p className="p-4">Competing options were either:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Too slow (ATtiny, ATmega, PIC, ESP8266)</li>
                <li>Overkill (STM32F4, STM32H7, ESP32, RP2040)</li>
                <li>Too expensive once multiplied by 6+ gauge boards</li>
                <li>Too noisy electrically for long LED chains</li>
                <li>Too large for the tight mechanical constraints of the gauge PCBs</li>
            </ul>

            <p className="p-4">The G031 hits the &quot;Goldilocks&quot; zone:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Powerful enough to generate high-precision LED waveforms</li>
                <li>Affordable even in multi-MCU designs</li>
                <li>Available in a small TSSOP-20 package that fits easily behind a gauge</li>
                <li>Minimal external components (regulator, MEMS oscillator, decoupling caps)</li>
            </ul>

            <h3 className="text-xl font-semibold p-4">3. Easier Scaling and Better Reliability Than a Single-MCU Approach</h3>

            <p className="p-4">I did consider using a single large processor (e.g., STM32H7 or ESP32) to drive all gauge LEDs directly. This was rejected because:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>The physical distance between gauges (up to ~1 ft) is too long for clean LED data signals</li>
                <li>Crosstalk and EMI from automotive wiring would degrade timing</li>
                <li>Running 600+ LEDs from one pin would require heavy buffering and introduce latency</li>
                <li>Distributed MCUs create fault isolation — if one gauge fails, the others continue working</li>
                <li>The system becomes easier to debug and update per-gauge</li>
            </ul>

            <p className="p-4">Distributed control is a key part of meeting automotive reliability expectations.</p>

            <MermaidDiagram
                id="architecture-comparison"
                chart={`flowchart TB
    subgraph SingleMCU[Single Large MCU - Rejected]
        BigMCU[STM32H7 / ESP32]
        LongWires[Long LED Data Runs 0.5–1 ft]
        Buffers[Level Shifters / Signal Buffers]
        Issues[Problems:<br/>• Timing jitter<br/>• Crosstalk<br/>• EMI sensitivity<br/>• Harder to isolate faults]
    end

    subgraph MultiMCU[Distributed STM32G031F6 - Chosen]
        ESP32Main[ESP32-S3 Main Controller]
        LocalMCUs[1 G031 per Gauge]
        ShortRuns[Short Local LED Routes<br/>High Integrity Timing]
        Benefits[Benefits:<br/>• Automotive stability<br/>• Fault isolation<br/>• Perfect LED timing<br/>• Cheaper overall<br/>• Cleaner harness wiring]
    end

    BigMCU --> LongWires --> Buffers --> Issues
    ESP32Main --> LocalMCUs --> ShortRuns --> Benefits`}
            />

            <h3 className="text-xl font-semibold p-4">4. Verified, Predictable Behavior with DMA-Based LED Driving</h3>

            <p className="p-4">Before selecting the G031, I prototyped:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>A 300+ LED test board</li>
                <li>Multiple DMA-timing strategies</li>
                <li>Different segment wiring architectures</li>
                <li>LED fan-out configurations (parallel inputs, staggered data points, etc.)</li>
            </ul>

            <p className="p-4">The G031 consistently delivered stable LED timing even in stressful conditions:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>No decoupling caps on the prototype (later added for production)</li>
                <li>Long trace lengths</li>
                <li>High refresh rates</li>
                <li>Parallel data, ~60-LED groups per segment</li>
            </ul>

            <p className="p-4">
                This gave me the confidence that the G031 would continue performing under real-world automotive conditions.
            </p>

            <h2 className="text-2xl font-bold p-4">Conclusion</h2>

            <p className="p-4">The STM32G031F6P6 turned out to be the ideal microcontroller for this digital dash:</p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li>Accurate LED timing using timers + DMA</li>
                <li>Distributed gauge control with a clean I²C communication model</li>
                <li>Hardware reliability backed by MEMS oscillators and robust peripherals</li>
                <li>Scalable architecture that isolates failures and simplifies debugging</li>
                <li>Affordable, compact, and electrically quiet</li>
                <li>Proven performance across multiple prototypes, including 300+ LED boards</li>
            </ul>

            <p className="p-4">
                This decision wasn&apos;t just about raw specs — it was about choosing the microcontroller that best fit the system architecture, the mechanical constraints of the gauges, and the reliability requirements of an automotive environment.
            </p>

            <p className="p-4">
                By leveraging the G031&apos;s strengths, every gauge in the dash can render smooth, vivid, synchronized lighting that brings a modern feel to a classic platform.
            </p>
        </div>
    )
}
