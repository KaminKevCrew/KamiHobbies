---
title: "Teensy 4.1 Home Theater Controller — Serial + OSC + HTTPS Bridge"
date: 2025-09-08
draft: false
summary: "A Teensy 4.1 drives a full home theater: RS-232 projector/receiver/HDMI matrix, a relay for the motorized screen, and an OSC→HTTPS bridge (Python + pyvizio) for a TLS-only TV—all controllable from a custom TouchOSC layout."
tags:
    - embedded
    - teensy
    - arduino
    - ethernet
    - osc
    - serial
    - home-theater
    - vizio
    - optoma
    - denon

# Uncomment the cover once you add an image file next to this index.md:

# cover:

# image: "cover.jpg"

# alt: "Teensy 4.1 home theater controller with network and serial connections"
---

> One box to rule the room. A **Teensy 4.1** (Ethernet + multiple UARTs) acts as the hub for my home theater: it talks **RS-232** to the **Denon AVR**, **Optoma projector**, and a **4×4 HDMI matrix**, toggles a **relay** to raise/lower the motorized screen, and sends **OSC** to a small **Python bridge** (with **pyvizio**) to control a **HTTPS-only Vizio TV**. The whole system is driven from a **TouchOSC** interface on my phone.

## Highlights

* **Teensy 4.1**: fast MCU, **NativeEthernet**, and **lots of UARTs** → perfect for IP + serial control.
* **Three serial links**: Denon AVR (9600), Optoma projector (9600), HDMI matrix (115200).
* **Motorized screen**: relay on a GPIO (active-low) for up/down.
* **Phone UI**: **TouchOSC** sends OSC over UDP to the Teensy.
* **HTTPS bridge**: Teensy emits OSC → Python server (pyvizio) issues TLS requests to the TV.
* **Mode logic**: switching TV↔Projector powers the right devices and moves the screen accordingly. *(Planned: add projector warm-up delay before lowering the screen.)*

## System Architecture

```
[TouchOSC App] --OSC/UDP--> [Teensy 4.1]
                                |  \__________ RS-232 (115200) ---> [HDMI Matrix]
                                |___________ RS-232 (9600)  ---> [Denon AVR]
                                |___________ RS-232 (9600)  ---> [Optoma Projector]
                                |___________ GPIO (active-low) ---> [Screen Relay]
                                \--OSC/UDP--> [Python Bridge on Media Server] --HTTPS--> [Vizio TV]
```

### Why Teensy 4.1?

High clock, solid **NativeEthernet** stack, and **multiple hardware UARTs** make it a great fit when you need IP + several independent serial ports without external multiplexers.

---

## Controls & TouchOSC Map

The Teensy listens on **UDP 5005** and routes these OSC addresses:

* `/display <0|1>` — **0** = TV mode (projector **off**, screen **up**, TV **on**), **1** = Projector mode (projector **on**, screen **down**, TV **off**)
* `/input <1..4>` — route the HDMI matrix (and align AVR input)
* `/volume <0..100> <dir 0|1>` — smooth ramping volume (down/up)
* `/mute <0|1>` — mute toggle on AVR
* `/all_off <any>` — all devices off, screen up

```cpp
bundleIN.route("/display",  displayHandler);
bundleIN.route("/input",    inputHandler);
bundleIN.route("/volume",   volumeHandler);
bundleIN.route("/mute",     muteHandler);
bundleIN.route("/all_off",  allOffHandler);
```

---

## Device Mapping & Init

```cpp
// Serial ports and IO
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
}
```

---

## AVR (Denon) Serial Control

```cpp
enum { PW, MV, MU, SI }; // power, volume, mute, source input

void avrCommand(int type, int param) {
  switch (type) {
    case PW: AVRSERIAL.print("PW"); AVRSERIAL.print(param ? "ON" : "STANDBY"); break;
    case MV: AVRSERIAL.print("MV"); AVRSERIAL.print(param ? "UP" : "DOWN");    break;
    case MU: AVRSERIAL.print("MU"); AVRSERIAL.print(param ? "ON" : "OFF");     break;
    case SI: AVRSERIAL.print("SI"); AVRSERIAL.print(param == 1 ? "DVD" : param == 2 ? "TV" : "VDP"); break;
  }
  AVRSERIAL.write(0x0D); // CR
}
```

**Volume ramping** from TouchOSC slider:

```cpp
int prevVol = -1;

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
}
```

---

## Projector (Optoma) Serial Control

```cpp
// Basic power + display mode example (protocol varies by model)
void projectorPower(bool on) {
  PROJECTORSERIAL.print("~00");   // header
  PROJECTORSERIAL.print("00 ");   // command: power
  PROJECTORSERIAL.write(on ? '1' : '0');
  PROJECTORSERIAL.write(0x0D);
}
```

---

## HDMI Matrix Routing

```cpp
// Route input N to all 4 outputs (gofanco-style)
void matrixRoute(int input /*1..4*/) {
  MATRIXSERIAL.print("#video_d out1,2,3,4 matrix=");
  MATRIXSERIAL.write('0' + input);
  MATRIXSERIAL.write('\r');
}
```

---

## TV via Python (pyvizio) — OSC → HTTPS

The Teensy can’t do HTTPS reliably, so it sends OSC to a small Python service (on the media server). The service uses **pyvizio** to talk to the TV.

```python
# server.py (bridge)
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

BlockingOSCUDPServer(("0.0.0.0", 5005), disp).serve_forever()
```

On the Teensy side you send `/power` or `/input` to the bridge’s IP:5005:

```cpp
void tvCommand(int type, int param) {
  const char* addr = (type == PW) ? "/power" : "/input";
  OSCMessage msg(addr);
  msg.add(param);
  Udp.beginPacket(tvBridgeIp, 5005);
  msg.send(Udp);
  Udp.endPacket();
  msg.empty();
}
```

---

## Display Modes & Screen Relay (with planned warm-up delay)

Currently, switching modes automatically turns **off** the “other” display (TV vs projector) and moves the screen. I’m adding a **projector warm-up delay** so the TV **doesn’t turn off** and the screen **doesn’t drop** until the projector is ready.

```cpp
// Planned timing (tweak per projector spec)
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
}
```

> If your projector exposes a **status query** over RS-232 (e.g., “Lamp On / Ready”), replace the fixed delay with an actual **status poll** and drop the screen when it reports **Ready**.

---

## Reliability & UX Notes

* **Idempotent commands**: OK to resend `PWON`/`STANDBY`; devices ignore duplicates.
* **Delays**: add small inter-command delays where vendors require them (often 50–200 ms).
* **Static IPs/DHCP reservations**: make TouchOSC → Teensy and Teensy → bridge lookups deterministic.

---

## Screenshots / Media

Add photos of the Teensy box, wiring, and TouchOSC UI next to this `index.md`. Then uncomment the carousel call below and adjust the glob to your filenames.

---

## What I’d Improve Next

* **Implement warm-up delay** with **projector status polling** so the screen won't move down until the projector is up and running.
* **Command retries** + readbacks (parse device responses to confirm state).
* **Check state** for seamless restarts, and to show current status on TouchOSC interface.
* **On-device TLS** option (bearSSL or an ESP32 co-processor) to retire the bridge.
