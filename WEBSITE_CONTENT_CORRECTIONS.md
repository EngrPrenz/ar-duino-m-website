# AR-DUINO-M Website Content Corrections & Accuracy Guide

This document outlines all inaccurate, exaggerated, or misleading copy on the [AR-DUINO-M Website](https://ar-duino-m.vercel.app/) and provides exact, copy-paste-ready replacements aligned with the actual Unity application capabilities.

---

## 📌 The Core App Architecture (Two Main Pillars)

To keep marketing and educational copy 100% accurate, always frame AR-DUINO-M around its two distinct modes:

1. **Optical AR Component Library (`Library.unity`):**  
   Camera-based Vuforia scanner. Point the phone camera at printed cards or monitor markers to identify 29 electronic components, rotate them in 3D, and study their technical specifications, pinouts, and real-world uses.
2. **Interactive 3D Tabletop Simulation Lab (`TableTopScene.unity`, `RCCAR.unity`, `DemoTutorialScene.unity`):**  
   On-screen 3D virtual breadboard and robotics workspace with touch gestures (tap-to-place, snap-to-grid, orbit/zoom camera, rotation slider, Mock IDE code review, and real-time circuit checklist validation).

---

## 🛠️ Itemized Copy Corrections

### 1. Hero Badge & Tagline: "Physical Computing" Misnomer
* **Current Text:**  
  `Augmented Reality Physical Computing`
* **Issue:**  
  "Physical computing" means software interfacing with real-world physical hardware (sensors/actuators). The app runs entirely inside mobile without connecting to external physical circuits.
* **Replacement:**
  ```text
  Augmented Reality Electronics Simulator
  ```
  *(Alternative options: `Interactive 3D & AR Circuit Simulator` or `Virtual Microcontroller Learning Lab`)*
* **Updated Hero Subtitle:**
  ```text
  Augmented Reality Driven User Interface for Interactive Prototyping and Learning Microcontroller Electronics.
  ```

---

### 2. "How It Works" Section Subtitle: Guiding Physical Breadboards
* **Current Text:**  
  *"Transition seamlessly from conceptual electronics theory to physical breadboard prototyping with intuitive augmented reality guidance."*
* **Issue:**  
  Implies the camera tracks a physical breadboard sitting on your desk and guides physical wiring with AR overlays.
* **Replacement:**
  ```text
  Master breadboard wiring and microcontroller basics in a risk-free 3D virtual workspace before building on physical hardware.
  ```

---

### 3. Step 4 (How It Works): Conflating AR Card Scanning with Circuit Building
* **Current Text:**  
  *Phase 04 · Scan Target Markers · Build the Circuit*  
  *"Point your phone camera at printable target cards or monitor screens to spawn accurate 3D digital twins of Arduino boards, motors, and sensors."*
* **Issue:**  
  Implies that users scan target cards to assemble a circuit. Target cards are only used in the 3D encyclopedia viewer. Circuits are assembled via touch UI buttons in the tabletop workspace.
* **Replacement:**
  ```text
  Phase 04 · Interactive 3D Workspace · Assemble the Circuit
  Enter the 3D tabletop workspace to spawn digital twins of Arduino boards, LEDs, resistors, and breadboards. Drag and snap components into place with real-time alignment and wire validation.
  ```

---

### 4. Step 5 (How It Works): Compiler & Sensor Stimuli Overstatements
* **Current Text:**  
  *Phase 05 · Real-Time Logic · Run Simulation*  
  *"Flash Arduino C++ logic inside the simulator and watch LEDs blink, stepper motors rotate, and sensors respond to virtual stimuli in real-time."*
* **Issue:**  
  The app does not compile arbitrary C++ code, simulate stepper motors running code, or respond to dynamic virtual stimuli (like heat, sound, or physical distance). It uses a pre-written Mock IDE, an upload flag, and tests specific circuit modules (LEDs, potentiometer, RC car chassis).
* **Replacement:**
  ```text
  Phase 05 · Code Upload & Testing · Simulate & Test Circuit
  Review verified sketches in the built-in Mock IDE, simulate code upload with a single tap, and watch your circuit spring to life with synchronized blinking LEDs, analog potentiometer dimming, and motor responses.
  ```

---

### 5. Feature Card: "PWM Commands" for RC Car
* **Current Text:**  
  *"Witness real-time state changes inside the AR viewport: LEDs light up with true duty cycles, stepper motors step in discrete strides, and RC car wheels respond to PWM commands."*
* **Issue:**  
  There is no live PWM timer emulation or custom C++ motor control running for the RC car. It is a guided robotics chassis assembly and drive experience.
* **Replacement:**
  ```text
  Witness real-time state changes inside the 3D viewport: LEDs illuminate with true blink intervals, potentiometer wipers dynamically adjust brightness, and the RC car robotics chassis responds to directional drive controls.
  ```

---

### 6. Feature Card: Reverse Polarity & Short-Circuit Claims
* **Current Text:**  
  *Safe Learning · Zero Hardware Damage Risk*  
  *"Accidentally reverse polarity or short-circuit power rails without destroying expensive physical microcontrollers or burning delicate diodes."*
* **Issue:**  
  The app does not simulate electrical faults, short circuits, or component burnouts (no SPICE physics). It uses topological checklist validation (pass/fail).
* **Replacement:**
  ```text
  Safe Learning · Risk-Free Circuit Prototyping
  Troubleshoot wiring mistakes and incorrect pin connections without the risk of damaging expensive microcontroller boards or blowing delicate components. Real-time checklist validation flags errors instantly.
  ```

---

### 7. Optical Library Scope: Implying All 29 Components are Wired in Simulator
* **Current Text:**  
  *"29 Vuforia Target Markers covering microcontrollers, ultrasonic sensors, motor drivers, LCD displays, and breadboard passives for instant AR recognition."*  
  *"Eliminate equipment shortages... with computer-vision augmented reality circuits."*
* **Issue:**  
  Only ~5–6 core components (Arduino Uno, Breadboard, LED, Resistor, Potentiometer, Battery, Wires, and RC car chassis parts) are wired in the simulation scenes. The other 20+ components (RFID, DHT11, Flame sensor, 16x2 LCD, Raspberry Pi, etc.) exist as 3D reference models in the Vuforia library.
* **Replacement:**
  ```text
  Section Title:
  29 Optical AR Component Reference Targets

  Section Subtitle:
  Scan printable markers or screen cards with your phone camera to inspect interactive 3D digital twins, detailed pinout diagrams, specifications, and use cases for 29 essential electronics components.

  Capability Pill:
  29 Optical AR Reference Cards • Hands-On 3D Circuit Simulations
  ```

---

## 📖 Recommended Vocabulary & Phrasing Cheat Sheet

| Avoid on the Website | Use Instead | Why |
| :--- | :--- | :--- |
| *Physical Computing* | *Virtual Electronics Simulator* / *3D Prototyping Platform* | The app operates entirely virtually on-device. |
| *Flash Arduino C++ logic* | *Review and upload sketches via Mock IDE* | Clarifies that code is educational and verified without full GCC compilation. |
| *AR breadboard guidance* | *Interactive 3D tabletop breadboard workspace* | Clarifies that the breadboard is virtual, not physical on your desk. |
| *Sensors respond to virtual stimuli* | *Interactive potentiometer dimming & circuit validation* | Reflects the actual interactive analog controls available in the app. |
| *Short-circuit & burnout simulation* | *Instant connection validation & error-free learning* | Emphasizes safe checklist validation rather than claiming electrical physics. |
| *29 AR Circuit Components* | *29 Optical AR Reference Cards + 3D Simulation Labs* | Accurately separates the 29-part reference library from the active simulator modules. |
