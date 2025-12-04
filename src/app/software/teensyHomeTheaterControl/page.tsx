import React from 'react';
import Link from 'next/link';
import {AiFillGithub} from "rocketicons/ai";

export default function TeensyHomeTheaterControl() {

    return(
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold p-4">Teensy 4.1 Home Theater Controller — Serial + OSC + HTTPS Bridge</h1>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                One box to rule the room. A <strong>Teensy 4.1</strong> (Ethernet + multiple UARTs) acts as the hub for my home theater: it talks <strong>RS-232</strong> to the <strong>Denon AVR</strong>, <strong>Optoma projector</strong>, and a <strong>4×4 HDMI matrix</strong>, toggles a <strong>relay</strong> to raise/lower the motorized screen, and sends <strong>OSC</strong> to a small <strong>Python bridge</strong> (with <strong>pyvizio</strong>) to control a <strong>HTTPS-only Vizio TV</strong>. The whole system is driven from a <strong>TouchOSC</strong> interface on my phone.
            </blockquote>

            <h2 className="text-2xl font-bold p-4">Highlights</h2>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Teensy 4.1:</strong> fast MCU, <strong>NativeEthernet</strong>, and <strong>lots of UARTs</strong> → perfect for IP + serial control.</li>
                <li><strong>Three serial links:</strong> Denon AVR (9600), Optoma projector (9600), HDMI matrix (115200).</li>
                <li><strong>Motorized screen:</strong> relay on a GPIO (active-low) for up/down.</li>
                <li><strong>Phone UI:</strong> <strong>TouchOSC</strong> sends OSC over UDP to the Teensy.</li>
                <li><strong>HTTPS bridge:</strong> Teensy emits OSC → Python server (pyvizio) issues TLS requests to the TV.</li>
                <li><strong>Mode logic:</strong> switching TV↔Projector powers the right devices and moves the screen accordingly. <em>(Planned: add projector warm-up delay before lowering the screen.)</em></li>
            </ul>

            <h2 className="text-2xl font-bold p-4">System Architecture</h2>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`[TouchOSC App] --OSC/UDP--> [Teensy 4.1]
                                |  \\__________ RS-232 (115200) ---> [HDMI Matrix]
                                |___________ RS-232 (9600)  ---> [Denon AVR]
                                |___________ RS-232 (9600)  ---> [Optoma Projector]
                                |___________ GPIO (active-low) ---> [Screen Relay]
                                \\--OSC/UDP--> [Python Bridge on Media Server] --HTTPS--> [Vizio TV]`}</code></pre>

            <h3 className="text-xl font-semibold p-4">Why Teensy 4.1?</h3>
            <p className="p-4">
                High clock, solid <strong>NativeEthernet</strong> stack, and <strong>multiple hardware UARTs</strong> make it a great fit when you need IP + several independent serial ports without external multiplexers.
            </p>

            <h2 className="text-2xl font-bold p-4">Controls & TouchOSC Map</h2>
            <p className="p-4">
                The Teensy listens on <strong>UDP 5005</strong> and routes these OSC addresses:
            </p>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><code>/display &lt;0|1&gt;</code> — <strong>0</strong> = TV mode (projector <strong>off</strong>, screen <strong>up</strong>, TV <strong>on</strong>), <strong>1</strong> = Projector mode (projector <strong>on</strong>, screen <strong>down</strong>, TV <strong>off</strong>)</li>
                <li><code>/input &lt;1..4&gt;</code> — route the HDMI matrix (and align AVR input)</li>
                <li><code>/volume &lt;0..100&gt; &lt;dir 0|1&gt;</code> — smooth ramping volume (down/up)</li>
                <li><code>/mute &lt;0|1&gt;</code> — mute toggle on AVR</li>
                <li><code>/all_off &lt;any&gt;</code> — all devices off, screen up</li>
            </ul>

            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`bundleIN.route("/display",  displayHandler);
bundleIN.route("/input",    inputHandler);
bundleIN.route("/volume",   volumeHandler);
bundleIN.route("/mute",     muteHandler);
bundleIN.route("/all_off",  allOffHandler);`}</code></pre>

            <h2 className="text-2xl font-bold p-4">Device Mapping & Init</h2>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`// Serial ports and IO
#define AVRSERIAL        Serial4     // Denon AVR (9600)
#define PROJECTORSERIAL  Serial7     // Optoma (9600)
#define MATRIXSERIAL     Serial8     // HDMI matrix (115200)
#define SCREENPIN        0           // Active-low relay: LOW=down, HIGH=up

void setup() {
  AVRSERIAL.begin(9600);
  PROJECTORSERIAL.begin(9600);
  MATRIXSERIAL.begin(115200);

  Ethernet.begin(mac, teensyIp);
  Udp.begin(5005);

  pinMode(SCREENPIN, OUTPUT);
  digitalWrite(SCREENPIN, HIGH);     // default: screen UP (relay off)
}`}</code></pre>

            <h2 className="text-2xl font-bold p-4">AVR (Denon) Serial Control</h2>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`enum { PW, MV, MU, SI }; // power, volume, mute, source input

void avrCommand(int type, int param) {
  switch (type) {
    case PW: AVRSERIAL.print("PW"); AVRSERIAL.print(param ? "ON" : "STANDBY"); break;
    case MV: AVRSERIAL.print("MV"); AVRSERIAL.print(param ? "UP" : "DOWN");    break;
    case MU: AVRSERIAL.print("MU"); AVRSERIAL.print(param ? "ON" : "OFF");     break;
    case SI: AVRSERIAL.print("SI"); AVRSERIAL.print(param == 1 ? "DVD" : param == 2 ? "TV" : "VDP"); break;
  }
  AVRSERIAL.write(0x0D); // CR
}`}</code></pre>

            <p className="p-4"><strong>Volume ramping</strong> from TouchOSC slider:</p>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`int prevVol = -1;

void volumeHandler(OSCMessage &msg, int) {
  const int target = msg.getInt(0);
  const bool dirUp = msg.getInt(1) == 1;
  if (prevVol != -1) {
    int steps = target - prevVol;
    if (steps != 0 && ((steps > 0) == dirUp)) steps += dirUp ? 11 : -11; // nudge in same direction
    while (steps != 0) {
      avrCommand(MV, steps > 0);  // UP if positive
      steps += (steps > 0 ? -1 : 1);
    }
  }
  prevVol = target;
}`}</code></pre>

            <h2 className="text-2xl font-bold p-4">Projector (Optoma) Serial Control</h2>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`// Basic power + display mode example (protocol varies by model)
void projectorPower(bool on) {
  PROJECTORSERIAL.print("~00");   // header
  PROJECTORSERIAL.print("00 ");   // command: power
  PROJECTORSERIAL.write(on ? '1' : '0');
  PROJECTORSERIAL.write(0x0D);
}`}</code></pre>

            <h2 className="text-2xl font-bold p-4">HDMI Matrix Routing</h2>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`// Route input N to all 4 outputs (gofanco-style)
void matrixRoute(int input /*1..4*/) {
  MATRIXSERIAL.print("#video_d out1,2,3,4 matrix=");
  MATRIXSERIAL.write('0' + input);
  MATRIXSERIAL.write('\\r');
}`}</code></pre>

            <h2 className="text-2xl font-bold p-4">TV via Python (pyvizio) — OSC → HTTPS</h2>
            <p className="p-4">
                The Teensy can't do HTTPS reliably, so it sends OSC to a small Python service (on the media server). The service uses <strong>pyvizio</strong> to talk to the TV.
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`# server.py (bridge)
from pythonosc.dispatcher import Dispatcher
from pythonosc.osc_server import BlockingOSCUDPServer
from pyvizio import Vizio

TV_IP = "192.168.1.50"
AUTH  = "your-paired-token"
vizio = Vizio("VizioTV", TV_IP, auth_token=AUTH)

def power_handler(addr, val):
    if int(val): vizio.pow_on()
    else:        vizio.pow_off()

def input_handler(addr, source):
    vizio.set_input(str(source))  # or map to real input names

disp = Dispatcher()
disp.map("/power", power_handler)
disp.map("/input", input_handler)

BlockingOSCUDPServer(("0.0.0.0", 5005), disp).serve_forever()`}</code></pre>

            <p className="p-4">
                On the Teensy side you send <code>/power</code> or <code>/input</code> to the bridge's IP:5005:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`void tvCommand(int type, int param) {
  const char* addr = (type == PW) ? "/power" : "/input";
  OSCMessage msg(addr);
  msg.add(param);
  Udp.beginPacket(tvBridgeIp, 5005);
  msg.send(Udp);
  Udp.endPacket();
  msg.empty();
}`}</code></pre>

            <h2 className="text-2xl font-bold p-4">Display Modes & Screen Relay (with planned warm-up delay)</h2>
            <p className="p-4">
                Currently, switching modes automatically turns <strong>off</strong> the "other" display (TV vs projector) and moves the screen. I'm adding a <strong>projector warm-up delay</strong> so the TV <strong>doesn't turn off</strong> and the screen <strong>doesn't drop</strong> until the projector is ready.
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto"><code>{`// Planned timing (tweak per projector spec)
const uint32_t PROJECTOR_WARMUP_MS  = 30000; // e.g., 30s
const uint32_t PROJECTOR_COOLDOWN_MS= 60000; // optional, 60s

enum DisplayMode { TVMODE=0, PJMODE=1 };

uint32_t pjWarmStart = 0;
bool     pendingScreenDown = false;

void setDisplayMode(DisplayMode m) {
  if (m == PJMODE) {
    // 1) Turn TV off via bridge (or defer until screen drops if you prefer)
    tvCommand(PW, 0);
    // 2) Power projector on
    projectorPower(true);
    // 3) Begin warm-up timer; drop screen only after warm-up completes
    pendingScreenDown = true;
    pjWarmStart = millis();
    // AVR on + route inputs as needed
    avrCommand(PW, 1);
  } else {
    // TV mode: screen up, projector off, then TV on
    digitalWrite(SCREENPIN, HIGH); // screen UP (relay inactive)
    projectorPower(false);
    tvCommand(PW, 1);
  }
}

void loop() {
  // Warm-up check
  if (pendingScreenDown && millis() - pjWarmStart >= PROJECTOR_WARMUP_MS) {
    digitalWrite(SCREENPIN, LOW);  // screen DOWN (active-low)
    pendingScreenDown = false;
  }

  // ...handle OSC, serial IO, etc...
}`}</code></pre>

            <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 p-4">
                If your projector exposes a <strong>status query</strong> over RS-232 (e.g., "Lamp On / Ready"), replace the fixed delay with an actual <strong>status poll</strong> and drop the screen when it reports <strong>Ready</strong>.
            </blockquote>

            <h2 className="text-2xl font-bold p-4">Reliability & UX Notes</h2>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Idempotent commands:</strong> OK to resend <code>PWON</code>/<code>STANDBY</code>; devices ignore duplicates.</li>
                <li><strong>Delays:</strong> add small inter-command delays where vendors require them (often 50–200 ms).</li>
                <li><strong>Static IPs/DHCP reservations:</strong> make TouchOSC → Teensy and Teensy → bridge lookups deterministic.</li>
            </ul>

            <h2 className="text-2xl font-bold p-4">What I'd Improve Next</h2>
            <ul className="list-disc list-inside p-4 space-y-2">
                <li><strong>Implement warm-up delay</strong> with <strong>projector status polling</strong> so the screen won't move down until the projector is up and running.</li>
                <li><strong>Command retries</strong> + readbacks (parse device responses to confirm state).</li>
                <li><strong>Check state</strong> for seamless restarts, and to show current status on TouchOSC interface.</li>
                <li><strong>On-device TLS</strong> option (bearSSL or an ESP32 co-processor) to retire the bridge.</li>
            </ul>

            <div className="p-4 my-8">
                <Link href="https://github.com/KaminKevCrew" passHref legacyBehavior>
                    <a target="_blank" className="inline-flex items-center gap-2">
                        <AiFillGithub className="icon-accent icon-lg"/>
                        <button className="btn btn-primary">View on Github</button>
                    </a>
                </Link>
            </div>
        </div>
    )
}