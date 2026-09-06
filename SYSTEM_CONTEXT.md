# AR-DUINO Web Platform — Full System Context & Functional Specification

---

## 1. System Overview & Purpose

### 1.1 What is AR-DUINO?
**AR-DUINO** stands for:
> **A**ugmented **R**eality **D**riven **U**ser **I**nterface for **N**avigation and **O**peration of Microcontrollers.

AR-DUINO is an educational technology ecosystem developed to teach electronics, embedded systems, and microcontroller circuit design through immersive Augmented Reality (AR). By combining software simulation with physical computer vision tracking, it enables students, hobbyists, and educators to learn robotics and circuit prototyping without purchasing expensive hardware kits or risking burnt microcontrollers, damaged LEDs, or wiring short circuits.

The ecosystem comprises two primary software products:
1. **The AR-DUINO Mobile App (Android APK):** An augmented reality application powered by the Vuforia Engine. It tracks real-world image target markers via the smartphone camera to instantiate interactive 3D digital twins of Arduino boards, sensors, and actuators with live circuit simulation.
2. **The AR-DUINO Website (This Platform):** The comprehensive web-based companion platform, distribution hub, reference library, and exhibition kiosk that supports the mobile application.

---

### 1.2 What is this Website For?
This website serves five primary operational functions:

1. **Digital Target Marker Host for AR Scanning:**
   The mobile application relies on Vuforia target images to know where and how to render 3D components in physical space. This website hosts the official repository of **29 high-definition Vuforia image targets**. Users can display these target markers on their computer monitor or laptop screen, point their Android phone running the AR-DUINO app at the display, and immediately spawn 3D interactive hardware.

2. **Curated Curriculum & Interactive Learning Portal:**
   A structured laboratory guide providing step-by-step video tutorials, hardware checklists, pinout schematics, wiring procedures, and production-ready Arduino C++ source code for hands-on electronics projects across varying difficulty tiers.

3. **Software Distribution Hub:**
   Direct distribution point for the Android application (`AR-DUINO.apk`), offering direct downloads, installation instructions, version compatibility requirements, and scannable QR codes for mobile installation.

4. **Product Showcase & Interactive Feature Explainer:**
   An informational portal explaining the core architecture, workflow, safety benefits, and simulated capabilities of the mobile app to prospective learners, schools, and academic evaluators.

5. **Exhibition & Kiosk Demonstration System:**
   A dedicated presentation mode built for research congresses, hardware expos, and classroom displays, featuring an automated looping slide deck, hardware walk-throughs, and on-booth APK download triggers.

---

## 2. System Architecture & Page Hierarchy

The web application is structured as a client-side routed Single Page Application (SPA) with four primary operational views and two persistent layout components:

```
                                  +-----------------------+
                                  |     AR-DUINO Web      |
                                  |     (Root Router)     |
                                  +-----------+-----------+
                                              |
               +------------------------------+------------------------------+
               |                                                             |
+--------------v---------------+                               +-------------v---------------+
|    Global Persistent Navbar  |                               |   Kiosk Presentation Mode   |
+--------------+---------------+                               |   (URL: #presentation)      |
               |                                               +-----------------------------+
   +-----------+-----------+
   |                       |
+--v-------------+   +-----v------------------+   +------------------------+
|  Landing Page  |   | Vuforia Target Library |   | Video Tutorials Portal |
|  (Home View)   |   |   (Components Page)    |   |    (Tutorials Page)    |
+--+-------------+   +-----+------------------+   +----+-------------------+
   |                       |                           |
   +-----------+-----------+                           |
               |                                       |
+--------------v---------------+                       |
|   Global Persistent Footer   |<----------------------+
+------------------------------+
```

### Page List & Routing Identifiers

| View Name | Technical View Key | Access URL / Mechanism | Primary Role |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `'home'` | `/` (default route) | Product overview, feature showcases, process flow, app mockups, download links, team contact |
| **Vuforia Library Page** | `'components'` | In-app navigation button / Navbar link | 29-target marker catalog, hardware categorisation, target search, isolated AR scan modal |
| **Video Tutorials Page** | `'tutorials'` | In-app navigation button / Navbar link | 4 project curriculum modules, YouTube video player, hardware checklist, wiring steps, C++ code |
| **Presentation Mode** | `'presentation'` | `/#presentation` or `/?page=presentation` | Fullscreen 5-slide kiosk deck, autoplay timer, booth presentation, QR download portal |

---

## 3. Comprehensive Breakdown of Pages and Contents

---

### 3.1 Landing Page (`LandingPage.tsx`)

The Landing Page is the front door of the AR-DUINO ecosystem. It introduces visitors to the app, demonstrates its interface through interactive mockups, outlines how to use it in 5 steps, and provides download triggers.

The Landing Page is composed of six stacked content sections:

#### Section 1: Hero Section (`Hero.tsx`)
* **Identity & Branding:** Displays the official AR-DUINO logo, product title, and the full expanded acronym definition (*Augmented Reality Driven User Interface for Navigation and Operation of Microcontrollers*).
* **Call-to-Action Buttons:**
  * Primary Action: *Download for Android (APK)* — smoothly scrolls down to the dedicated download section.
  * Secondary Action: *Vuforia Library* — navigates directly to the full target marker catalog.
* **Platform Indicators:** Highlights key operational constraints: *Android Exclusive* and *Vuforia Engine AR*.
* **Interactive Smartphone Mockup Deck (`HeroMockupCardDeck.tsx`):**
  A landscape-oriented interactive smartphone simulation displaying actual in-app screenshots. Users can preview the mobile application before downloading.
  * **Controls:** Auto-rotates every 6 seconds; includes Category quick-switch tabs, Left/Right navigation chevrons, direct slide pagination dots, and pause-on-hover capability.
  * **Catalog of 7 Featured App Screens:**
    1. *Live AR Vuforia Scanner (`ar-camera`):* Demonstrates real-time detection of target cards with virtual 3D Arduino boards and live pinout cards overlaid in physical space.
    2. *3D AR Circuit Workspace (`ar-workspace-led`):* Demonstrates the 3D digital twin breadboard environment with assembly checklists and 360-degree rotation controls.
    3. *RC Car Motor Wiring Mode (`ar-workspace-rccar`):* Demonstrates complex multi-component robotics wiring including the L298N motor driver module, dual batteries, and chassis assembly.
    4. *Curated Project Catalog (`project-list`):* Demonstrates the project selection screen where users choose from beginner to advanced projects.
    5. *Project Requirements & Specs (`project-details`):* Pre-assembly checklist listing required microcontrollers, diodes, resistors, and breadboards.
    6. *Step-by-Step Circuit Guide (`step-instructions`):* Clear textual guidance explaining breadboard row connectivity, center isolation gaps, and power rail connections.
    7. *Target Image Library QR (`ar-library-qr`):* Demonstrates how the app provides QR codes pointing back to this website's printable/scannable target catalog.

#### Section 2: How It Works (`HowItWorks.tsx`)
A structured 5-step operational breakdown explaining the user journey from zero knowledge to circuit execution:
1. **Step 01 — Download the App:** Install the official AR-DUINO APK on an Android device.
2. **Step 02 — Choose a Project:** Select an electronic simulation module ranked from beginner to advanced.
3. **Step 03 — Learn the Steps:** Read guided circuit instructions or watch embedded video tutorials.
4. **Step 04 — Build the Project:** Assemble components in physical space or scan Vuforia target markers to spawn 3D parts.
5. **Step 05 — Run Simulation:** Execute Arduino C++ code and observe real-time circuit behavior (lighting LEDs, spinning motors) in augmented reality.

#### Section 3: Key App Capabilities (`Features.tsx`)
A 6-card feature grid highlighting the core capabilities of the AR-DUINO software:
1. **AR-Powered Simulation:** Real-time 3D circuit overlay in the user's physical environment via the phone camera.
2. **Step-by-Step Tutorials:** Guided project walkthroughs with written instructions, pin diagrams, and video lessons.
3. **Vuforia Component Library:** Instant 3D model spawning and pinout inspection from physical or digital image targets.
4. **Real-Time Circuit Testing:** Immediate code execution feedback inside the simulator (blinking LEDs, rotating stepper/DC motors).
5. **Beginner-Friendly:** Zero physical hardware required, removing financial barriers and eliminating hardware damage risk.
6. **Offline Capable:** Full simulation and AR scanning functionality works without active internet connectivity once installed.

#### Section 4: Target Library Preview (`ComponentsPreview.tsx`)
* **Purpose:** Acts as a bridge between the Landing Page and the dedicated Component Library page.
* **Contents:** Previews 4 key hardware targets from the catalog (across microcontrollers, sensors, inputs, and motors).
* **Interactive Trigger:** *Explore All 29 Targets* button and clickable preview cards that immediately transition the view to the full Vuforia Target Library.

#### Section 5: Download Call-to-Action (`DownloadCTA.tsx`)
* **Purpose:** The primary conversion point for distributing the mobile app.
* **Contents:**
  * Headline and instructions for downloading the package.
  * *Download APK File* button: Triggers direct browser download of `AR-DUINO.apk`.
  * Technical Compatibility Badges: *Android 8.0+ Compatible*, *Safe Direct Download*, *Free & No Hardware Required*.

#### Section 6: Contact & Feedback (`Contact.tsx`)
* **Purpose:** Direct communication channel for user feedback, feature suggestions, academic inquiries, and bug reports.
* **Contents:**
  * Display of the official team email address: `markyisulat@gmail.com`.
  * *Send Email* button: Opens the user's default email client with pre-filled destination address (`mailto:markyisulat@gmail.com`).
  * *Copy Address* button: Copies the email address to the system clipboard and displays a temporary confirmation checkmark.

---

### 3.2 Vuforia Component Target Library Page (`ComponentsPage.tsx`)

The Vuforia Target Library is an interactive, search-enabled optical catalog. It is designed to be displayed on a secondary screen (desktop, tablet, or monitor) so that a user holding a smartphone with the AR-DUINO app can point their camera at the screen and trigger 3D AR models.

#### 1. Header & Usage Guidance
* Explains the optical scanning procedure: locate the desired component, click to open the target card in high resolution, and point the phone camera at the screen.

#### 2. Search & Filtering System
* **Real-Time Text Search Bar:** Instant client-side filtering across component names and functional descriptions. Includes a one-click clear button (`X`).
* **Active Result Counter:** Displays the number of visible matching targets out of the total 29.
* **Hardware Category Filters (7 Pill Selectors):**
  * `All Hardware (29)`
  * `Microcontrollers & Boards (7)`
  * `Sensors & Modules (5)`
  * `Inputs & Controls (3)`
  * `Motors & Drivers (3)`
  * `Power & Passives (8)`
  * `Displays & Systems (3)`
* **Empty State Handler:** If a search yields zero matches, an informational view appears with a one-click *Reset Filters* button.

#### 3. Complete 29-Hardware Component Catalog (`componentData.ts`)

| Category | Component Name | Functional Role in Circuit Projects | Target Identifier |
| :--- | :--- | :--- | :--- |
| **Microcontrollers & Boards** | Arduino Uno R3 | Primary brain; ATmega328P MCU; processes inputs & drives actuators | `arduino-uno-r3` |
| | Arduino Nano | Compact breadboard-friendly ATmega328P board for small footprints | `arduino-nano` |
| | Arduino Uno R4 WiFi | 32-bit Renesas RA4M1 MCU; integrated Wi-Fi, BLE, and 12x8 LED matrix | `arduino-r4-wifi` |
| | ESP32 Development Board | Dual-core 32-bit MCU with 2.4GHz Wi-Fi/BLE for IoT & automation | `esp32-dev-board` |
| | Raspberry Pi SBC | Single-board Linux computer for advanced robotics and computer vision | `raspberry-pi` |
| | Raspberry Pi 3 Model B | Quad-core 1.2GHz 64-bit SBC for multimedia processing and IoT hubs | `raspberry-pi-3` |
| | Raspberry Pi Zero | Ultra-small 1GHz single-board computer for embedded IoT devices | `raspberry-pi-zero` |
| **Sensors & Modules** | DHT11 Sensor | Digital temperature and humidity sensor via single-wire communication | `dht11-sensor` |
| | HC-SR04 Ultrasonic Sensor | 40kHz acoustic rangefinder measuring distances from 2cm to 400cm | `hc-sr04-ultrasonic-sensor` |
| | IR Obstacle Sensor | Infrared reflection sensor for proximity detection and line tracking | `ir-sensor` |
| | MPU-6050 6-Axis IMU | Combined 3-axis accelerometer and 3-axis gyroscope with I2C output | `mpu-6050-module` |
| | Water Level Depth Sensor | Conductive trace sensor converting immersion depth to analog voltage | `water-level-sensor` |
| **Inputs & Controls** | Tactile Push Button | Momentary switch sending digital HIGH/LOW signals to input pins | `button` |
| | 10k Rotary Potentiometer | Variable resistor outputting 0–1023 analog signals for PWM dimming | `potentiometer` |
| | Dual-Axis Joystick Module | Dual X/Y potentiometric axes plus a digital pushbutton click (Z-axis) | `joystick-module` |
| **Motors & Drivers** | SG90 Micro Servo Motor | 180° precise angular position actuator driven by PWM signals | `servo-motor` |
| | 28BYJ-48 Stepper Motor | 4-phase geared motor rotating in discrete steps for precise positioning | `stepper-motor` |
| | L298N Motor Driver | Dual H-bridge driver controlling direction and speed of two DC motors | `l298n-motor-driver` |
| **Power & Passives** | 9V Heavy Duty Battery | Portable DC power supply for mobile Arduino and robotic projects | `9v-battery` |
| | Prototyping Breadboard | 830-point solderless contact board for temporary circuit connections | `breadboard` |
| | Jumper Wires Set | Flexible male-to-male and male-to-female signal/power conductors | `jumper-wire` |
| | Carbon Film Resistor | Current-limiting passive element protecting LEDs and dividing voltage | `resistor` |
| | Cylindrical Capacitor | Electrolytic energy storage component for filtering and voltage smoothing | `cylindric-capacitor` |
| | SIP Header Pin Strip | Modular pin strip connectors for PCBs, sensors, and expansion boards | `single-inline-package` |
| | TO-220 Transistor / Regulator | Power semiconductor package for MOSFETs and LM7805 voltage regulators | `to-220-package` |
| | USB Type-A to Type-B Cable | Programming and 5V power cable connecting PC to Arduino Uno | `usb-cable` |
| **Displays & Systems** | 16x2 Alphanumeric LCD | Liquid crystal screen displaying 32 characters via HD44780 controller | `lcd-display` |
| | 3-Color RGB LED Module | Multi-color LED mixing Red, Green, and Blue PWM channels | `rgb-module` |
| | Smart Robot RC Car Chassis | 2WD/4WD mobile platform with gear motors, wheels, and acrylic chassis | `rc-car` |

#### 4. High-Definition Target Viewing Modal
When any component card is clicked, an isolated inspection modal opens:
* **Anti-Hallucination Isolation:** The modal renders the target image against a clean, dedicated canvas surrounded by alignment reticles. This prevents the phone's computer vision algorithm from confusing website text with the target pattern.
* **Optimal Lighting Indicator:** Confirms the target is calibrated for screen scanning.
* **Target Identification Stamp:** Explicitly displays the exact Vuforia target string ID matching the mobile app's tracking database.
* **Direct Image Download:** An explicit *Download High-Res Target* button lets users download the JPG target file directly to print on physical paper or store locally.
* **Full-Resolution New Tab View:** An *Open Full Image in New Tab* link displays the uncompressed image full-screen for maximum scan surface.

---

### 3.3 Video Tutorials & Guided Projects Page (`TutorialsPage.tsx`)

The Tutorials Page is an interactive curriculum portal that bridges conceptual hardware theory with software implementation. It structures learning into four core hands-on projects of graduating difficulty.

#### 1. Page Header & Statistics Dashboard
* Displays total available projects (4) and breaks down the curriculum distribution: *1 Easy (Blue)*, *2 Medium (Purple)*, and *1 Hard (Orange)*.

#### 2. Curriculum Filter & Search Controls
* **Difficulty Filters:** Quick-tabs to isolate `All`, `Easy`, `Medium`, or `Hard` projects.
* **Search Field:** Filters projects by title, short description, or specific hardware names (e.g., searching "resistor" returns all projects using resistors).

#### 3. The 4 Interactive Project Modules (`tutorialData.ts`)

---

##### Project 1: Blinking LED
* **Difficulty Level:** Easy (Blue Theme)
* **Video Duration:** 4 minutes, 15 seconds
* **Conceptual Goal:** The foundational "Hello World" of microcontrollers. Covers digital output pin configuration, binary HIGH/LOW states, and timing loop delays.
* **Required Hardware (5 items):**
  * Arduino Uno R3
  * 5mm Red LED
  * 220Ω Resistor
  * Breadboard
  * 2x Jumper Wires
* **Circuit Assembly Steps (4 steps):**
  1. *Insert LED:* Insert the long anode leg into row 10 and short cathode leg into row 11.
  2. *Add Resistor:* Connect a 220Ω resistor from row 11 (cathode) to the negative ground rail (-).
  3. *Connect Arduino Pins:* Wire Arduino Pin 13 to row 10 (anode) and Arduino GND to the negative ground rail.
  4. *Upload Code:* Connect to PC, select the correct COM port, and upload the sketch.
* **Embedded Arduino C++ Code:** Standard digital pin blink loop toggling pin 13 with 1000ms delay intervals.

---

##### Project 2: Potentiometer Control
* **Difficulty Level:** Medium (Purple Theme)
* **Video Duration:** 6 minutes, 30 seconds
* **Conceptual Goal:** Analog input acquisition, continuous voltage division, and Pulse Width Modulation (PWM) LED dimming.
* **Required Hardware (6 items):**
  * Arduino Uno R3
  * 10k Rotary Potentiometer
  * 5mm LED
  * 220Ω Resistor
  * Breadboard
  * 5x Jumper Wires
* **Circuit Assembly Steps (4 steps):**
  1. *Position Potentiometer:* Insert the 3-pin potentiometer across separate rows on the breadboard.
  2. *Connect Power Rails:* Connect the outer left pin to 5V and outer right pin to the GND rail.
  3. *Route Analog Signal:* Connect the middle wiper pin to Arduino Analog Pin A0.
  4. *Wire PWM Output:* Connect the LED anode through a 220Ω resistor to PWM Pin 9 (~), and cathode to GND.
* **Embedded Arduino C++ Code:** Reads `analogRead(A0)` (0–1023), executes `map(potValue, 0, 1023, 0, 255)` for 8-bit duty cycle conversion, outputs `analogWrite(9, brightness)`, and broadcasts live serial telemetry at 9600 baud.

---

##### Project 3: LED Patterns & Chaser
* **Difficulty Level:** Medium (Purple Theme)
* **Video Duration:** 8 minutes, 45 seconds
* **Conceptual Goal:** Array handling, sequential pin iteration, for-loop automation, and timing-based visual animations.
* **Required Hardware (5 items):**
  * Arduino Uno R3
  * 5x 5mm LEDs (Assorted Colors)
  * 5x 220Ω Resistors
  * Breadboard
  * 7x Jumper Wires
* **Circuit Assembly Steps (4 steps):**
  1. *Align LED Array:* Place 5 LEDs in a row on the breadboard with all anodes oriented consistently.
  2. *Add Individual Resistors:* Connect a 220Ω resistor from each individual cathode to the common ground rail.
  3. *Connect Arduino Digital Pins:* Wire digital pins 2, 3, 4, 5, and 6 to each respective LED anode.
  4. *Flash Animation Code:* Upload the iterative loop script to run forward and reverse scanning patterns.
* **Embedded Arduino C++ Code:** Defines `const int ledPins[] = {2, 3, 4, 5, 6}`, initializes pins in a `setup()` loop, and executes forward and reverse chaser sequences with variable speed delays.

---

##### Project 4: RC Car & Motor Control
* **Difficulty Level:** Hard (Orange Theme)
* **Video Duration:** 14 minutes, 20 seconds
* **Conceptual Goal:** High-current robotics actuation, H-Bridge directional switching, PWM velocity regulation, and skid-steer navigation algorithms.
* **Required Hardware (6 items):**
  * Arduino Uno R3
  * L298N Dual H-Bridge Motor Driver
  * 2x 5V DC Gear Motors & Wheels
  * 7.4V Li-Ion Battery Pack
  * Smart Car Chassis Kit
  * Male-to-Female Jumper Wires
* **Circuit Assembly Steps (4 steps):**
  1. *Mount Motors:* Fasten the dual DC gear motors and wheels to the acrylic chassis with brackets.
  2. *Connect Motor Terminals:* Connect Left Motor leads to OUT1/OUT2 and Right Motor leads to OUT3/OUT4 terminals on the L298N.
  3. *Connect Logic Signals:* Wire L298N inputs IN1, IN2, IN3, IN4 to Arduino digital pins 4, 5, 6, 7; connect PWM enable pins ENA and ENB to pins 9 and 10.
  4. *Connect Power & Test:* Attach the 7.4V battery to the L298N 12V terminal, bond a common ground (GND) with the Arduino, and flash motion logic.
* **Embedded Arduino C++ Code:** Implements structured directional functions (`moveForward(speed)`, `turnLeft(speed)`, `stopCar()`) utilizing PWM speed control on ENA/ENB and digital polarity switching on IN1–IN4.

---

#### 4. Interactive Project Detail Modal
Clicking *Watch Video* or *View Code* opens a comprehensive multi-tab laboratory modal with four views:
* **Tab 1: Video Tutorial:** An embedded, privacy-enhanced YouTube player (`youtube-nocookie.com`) configured with autoplay, alongside the project's full technical summary.
* **Tab 2: Hardware Checklist:** A visual component manifest with completion checkboxes so students can prepare their physical or simulated bench.
* **Tab 3: Circuit Steps:** Numbered, sequential assembly instructions detailing pin designations, breadboard rails, and polarity checks.
* **Tab 4: Arduino C++ Code:** Complete, formatted source code with a one-click *Copy Code* button that writes the sketch directly to the clipboard.

---

### 3.4 Kiosk Presentation Deck (`PresentationPage.tsx`)

The Presentation Page is a dedicated kiosk mode designed for research conferences, academic project defenses, trade shows, and booth exhibitions. It replaces standard website navigation with a full-screen, self-running presentation loop.

#### 1. Route Activation
* Triggered when the browser navigates to `/#presentation` or `/?page=presentation`.
* Can be bookmarked or launched directly on booth tablets, smart TVs, or exhibition laptops.

#### 2. The 5 Presentation Slides

| Slide # | Slide Title | Visual Content & Functional Focus |
| :---: | :--- | :--- |
| **Slide 1** | **AR-DUINO: Core Brand & Vision** | Large brand emblem with full acronym breakdown (*Augmented Reality Driven User Interface for Navigation and Operation of Microcontrollers*), Vuforia AR Engine notice, and core value proposition (zero hardware cost). |
| **Slide 2** | **Choose Your Project** | Side-by-side app mockups: (1) The Pre-Flight Hardware Checklist and (2) Guided Step-by-Step Wiring instructions, demonstrating curriculum progression. |
| **Slide 3** | **Interactive Prototyping Gamified** | Side-by-side 3D simulation mockups: (1) 3D Digital Twin Breadboard Workspace with real-time logic simulation and (2) L298N Robotics Mode for RC car motor wiring. |
| **Slide 4** | **AR Recognition: Point Camera Then Spawn** | Visual walkthrough of the Vuforia tracking pipeline: (1) Target Card Marker Input paired with (2) Live AR camera detection spawning a 3D Arduino board and live GPIO HUD. |
| **Slide 5** | **Scan QR Code to Download AR-DUINO APK** | Live scannable QR code linking directly to the online APK download, accompanied by a 3-step visitor guide: *1. Open Phone Camera → 2. Scan QR Code → 3. Download & Install APK*. |

#### 3. Autoplay Engine & Kiosk Controls
* **Automated Looping Engine:** Slides automatically advance in sequence (1 → 2 → 3 → 4 → 5 → 1) every **5.5 seconds** (`AUTOPLAY_DURATION_MS = 5500`), monitored by a live progress bar.
* **All-in-One Bottom Control Bar:**
  * Quick-jump buttons for Slides 1 through 5.
  * Play / Pause toggle for stopping on a slide during judge inquiries.
  * Previous / Next slide stepping buttons.
  * Live status pill indicating loop countdown or `PAUSED` state.
  * Slide position indicator (`X / 5`).
  * *Restart* button to jump immediately back to Slide 1.
  * *Fullscreen* button (invokes the HTML5 Fullscreen API).
  * *Exit* button (`X`) returning to the standard Landing Page.
* **Keyboard Navigation Support:**
  * `Right Arrow` / `PageDown`: Next slide.
  * `Left Arrow` / `PageUp`: Previous slide.
  * `Spacebar`: Toggle Play/Pause.
  * `F` / `f`: Toggle Fullscreen mode.
  * `Escape`: Exit fullscreen / return to Landing Page.
* **Smart Auto-Hide in Fullscreen:** When in fullscreen mode, the bottom control bar slides off-screen to provide an unobstructed kiosk display. Moving the mouse to the bottom 90px of the screen smoothly brings the controls back into view.

---

### 3.5 Global Navigation Bar (`Navbar.tsx`)

The global floating navbar provides persistent access across all standard views.

#### 1. Header Elements
* **Brand Lockup:** Official AR-DUINO logo and title text. Clicking returns to the Landing Page hero top.
* **Desktop Navigation Links:**
  * `Home`: Navigates to the Landing Page (`#hero`).
  * `Video Tutorials`: Navigates to the Tutorials Page (`TutorialsPage`).
  * `Vuforia Library`: Navigates to the Target Marker Catalog (`ComponentsPage`).
  * `How It Works`: Smoothly scrolls to the 5-step process section on the Landing Page.
  * `Contact`: Smoothly scrolls to the email and feedback section on the Landing Page.
* **Action Button:**
  * `Download App (APK)`: Smooth-scrolls to the Landing Page download section.

#### 2. Adaptive Behavior
* **Directional Scroll Detection:** Automatically hides when scrolling downward past the hero section (120px) to maximize screen real estate, and immediately reappears when scrolling upward.
* **Mobile Drawer Menu:** On smaller screens, collapses into a hamburger toggle button that reveals a vertical touch-friendly navigation drawer.

---

### 3.6 Global Footer (`Footer.tsx`)

The footer sits at the base of the Landing Page, Components Page, and Tutorials Page:
* **Brand Summary Column:** Displays the logo, full expanded acronym, and the *Android Exclusive App* badge.
* **Quick Navigation Column:** Direct links to *Home Page*, *Video Tutorials*, *Vuforia Component Library*, *How It Works*, *App Features*, and *Feedback & Support*.
* **Direct Contact Column:** Official email address (`markyisulat@gmail.com`) and a *Back to top* smooth-scroll button.
* **Copyright Notice:** Current year copyright, project accreditation, and educational disclaimer.

---

## 4. Navigation Architecture & User Flows

### 4.1 Global Navigation State Machine

The website operates on a centralized state coordinator in `App.tsx` that manages the `currentPage` state:

```
                  +----------------------------------------------+
                  |               URL Hash Monitor               |
                  |       (#presentation <---> standard)         |
                  +----------------------+-----------------------+
                                         |
                     +-------------------+-------------------+
                     |                                       |
           [Hash = #presentation]                  [Hash = None / Other]
                     |                                       |
          +----------v-----------+               +-----------v-----------+
          |   PresentationPage   |               |   Current Page State  |
          |  (Fullscreen Kiosk)  |               | ('home'|'components'| |
          +----------+-----------+               |      'tutorials')     |
                     |                           +-----------+-----------+
            (User clicks Exit /                              |
             presses Escape)             +-------------------+-------------------+
                     |                   |                   |                   |
                     +------------->+----v----+        +-----v------+       +----v-----+
                                    |  'home' |        |'components'|       |'tutorials'|
                                    +---------+        +------------+       +----------+
```

---

### 4.2 Cross-Page Navigation Matrix

| Origin | Target | Trigger | Transition Behavior |
| :--- | :--- | :--- | :--- |
| **Any View** | Landing Page (`'home'`) | Navbar "Home" / Logo click / Footer "Home" | Sets page to `'home'`, scrolls to top (or specified section ID) |
| **Any View** | Vuforia Library (`'components'`) | Navbar "Vuforia Library" / Hero button / Footer link | Sets page to `'components'`, resets window scroll to (0,0) |
| **Any View** | Video Tutorials (`'tutorials'`) | Navbar "Video Tutorials" / Footer link | Sets page to `'tutorials'`, resets window scroll to (0,0) |
| **Any View** | Kiosk Presentation (`'presentation'`) | Direct URL hash `#presentation` or `?page=presentation` | Replaces standard layout with the fullscreen presentation deck |
| **Landing Page** | How It Works Section | Navbar "How It Works" / Footer link | Smooth scroll to `#how-it-works` DOM anchor |
| **Landing Page** | Features Section | Footer "App Features" link | Smooth scroll to `#features` DOM anchor |
| **Landing Page** | Download Section | Navbar "Download App" / Hero "Download" | Smooth scroll to `#download` DOM anchor |
| **Landing Page** | Contact Section | Navbar "Contact" / Footer "Feedback" | Smooth scroll to `#contact` DOM anchor |
| **Library Page** | Landing Page (`'home'`) | "Back to Landing Page" button | Transitions page state to `'home'` |
| **Tutorials Page** | Landing Page (`'home'`) | Breadcrumb "Home" button | Transitions page state to `'home'` |
| **Presentation** | Landing Page (`'home'`) | Exit button (`X`) / `Escape` key | Removes `#presentation` hash, transitions to `'home'` |

---

### 4.3 In-Page Modal & State Interactions

1. **Target Image Modal Flow (Library Page):**
   * *Trigger:* Clicking any hardware card in the 29-target grid.
   * *State Change:* `activeModalComponent` is set to the selected component object; body scrolling is locked (`overflow: hidden`).
   * *User Actions:* View the isolated high-contrast image; click *Download High-Res Target* to save the JPG file; click *Open Full Image in New Tab* for dual-screen scanning; click `X` or the backdrop to dismiss.

2. **Project Detail Modal Flow (Tutorials Page):**
   * *Trigger:* Clicking *Watch Video* or *View Code* on any tutorial card.
   * *State Change:* `activeProjectModal` is populated; default active tab is set (`'video'` or `'code'`).
   * *User Actions:* Switch between Video, Hardware, Steps, and Code tabs; copy C++ code to clipboard; click `X` or backdrop to close.

3. **Presentation Deck Flow (Presentation Mode):**
   * *Trigger:* Entering `#presentation` in URL.
   * *State Change:* Mounts isolated fullscreen presentation shell; activates 5.5-second animation timer.
   * *User Actions:* Press Space to pause; use Arrow keys to advance/rewind; click slide pills to jump directly; toggle Fullscreen; press Escape to exit to the website.

---

## 5. External Integrations & Asset Map

The website interfaces with several external resources and static assets:

1. **Direct Application Distribution:**
   * `/AR-DUINO.apk`: The Android application installer served directly from the web root.
   * `/ar-duino-qr.png`: The scannable QR code graphic encoding the download URL.

2. **Optical Target Image Assets:**
   * 29 individual image target files located in `/targets/` (e.g., `/targets/arduino-uno-r3.jpg`, `/targets/l298n-motor-driver.jpg`).

3. **In-App Mobile Screenshots:**
   * 7 high-resolution landscape application captures in `/screenshots/` powering the Hero mockup deck and Presentation slides.

4. **Third-Party Video Streaming:**
   * Embedded YouTube playback via privacy-enhanced domain (`https://www.youtube-nocookie.com/embed/{id}`).
   * Video thumbnail retrieval via YouTube Image CDN (`https://img.youtube.com/vi/{id}/hqdefault.jpg`).

5. **Direct Communication Protocol:**
   * Standard `mailto:` protocol integration triggering system mail clients addressed to `markyisulat@gmail.com`.

---

## 6. Design System: Brand Colors, Typography & Styling Architecture

The AR-DUINO website implements a high-tech "cyber-electronics" design system tailored for Augmented Reality and embedded hardware education. Built on Tailwind CSS v4 and vanilla CSS tokens in `src/index.css`, the aesthetic merges a deep navy dark mode foundation with high-vibrancy neon glowing accents reminiscent of circuit boards and laser projections.

---

### 6.1 Brand Typography System

The platform uses two complementary typefaces imported via Google Fonts in `index.html`:

| Role | Font Family | Weights Used | CSS Token / Class | Application & Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Headings & Brand Display** | **Nunito** (`sans-serif`) | `700` (Bold), `800` (ExtraBold), `900` (Black) | `--font-nunito`<br>`font-nunito` | Applied globally to all `<h1>`–`<h6>` tags, the main **AR-DUINO** brand title, section headlines, project titles, modal headers, and key metric numbers. Rounded geometry provides a modern, approachable maker identity. |
| **Body & User Interface** | **Inter** (`sans-serif`) | `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold) | `--font-inter`<br>`font-inter`<br>`font-body` | Applied as the base `html` font family. Used for all reading copy, component descriptions, step-by-step assembly guides, technical specs, button labels, navigation links, and code captions. High legibility on dark backgrounds. |

---

### 6.2 Brand Color Palette

Colors are declared as CSS design tokens in `src/index.css` under the Tailwind v4 `@theme` directive:

#### 1. Primary Brand Accents
| Color Name | Hex Value | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Electric Blue** | `#35A2F4` | `--color-brand-blue` | **Primary Brand Signature**: Primary CTA buttons, interactive glows, active link states, logo drop-shadows, text selections, and "Easy" difficulty badges. Represents the AR hologram aura. |
| **Hardware Orange** | `#FC904F` | `--color-brand-orange` | **Warm Accent**: Arduino hardware callouts, warm glow ambient lighting, caution/warning notices, and "Hard" difficulty project tags. |
| **Cyber Purple** | `#9B5FF5` | `--color-brand-purple` | **Futuristic Accent**: Secondary gradient stops (`#35A2F4` → `#9B5FF5`), "Medium" difficulty project badges, IoT / ESP32 hardware cards, and presentation accents. |
| **Circuit Green** | `#49F996` | `--color-brand-green` | **Electronics Vitality**: Status dots, live indicator pulses, verification checkmarks, sensor component accents, and gradient endpoints. |

#### 2. Surfaces & Backgrounds (Dark Mode Foundation)
| Surface Layer | Hex Value | CSS Variable | Role & Visual Depth |
| :--- | :--- | :--- | :--- |
| **Base Navy** | `#162133` | `--color-bg-dark` | Primary page canvas and root container background. Deep, cool hue providing high contrast for glowing markers. |
| **Deep Void** | `#0E1724` | `--color-bg-deep` | Deepest surface layer used for modal backdrops, dropdowns, and bottom gradient falloffs. |
| **Card Surface** | `#1C2B3F` / `#1A2942` | `--color-bg-card` | Container fill for component target cards, tutorial cards, search inputs, and modal dialog windows. |
| **Card Hover** | `#24354D` | `--color-bg-card-hover` | Elevated state when cards, list items, or interactive controls receive pointer hover. |

#### 3. Neutrals & Typography
| Tone | Hex Value | CSS Variable | Application |
| :--- | :--- | :--- | :--- |
| **Main Text** | `#F0F4F8` / `#FFFFFF` | `--color-text-main` | High-contrast body text, primary card headings, active tabs, and primary titles. |
| **Muted Text** | `#8A9BB5` | `--color-text-muted` | Secondary labels, descriptions, timestamps, input placeholders, and breadcrumb trails. |

---

### 6.3 Micro-Animations & AR Visual Effects

The design system incorporates custom keyframe animations in `src/index.css` to emulate physical-digital interaction:
* **`animate-glow-pulse` (`glowPulse`):** Alternates cyan, green, and purple multi-layer box shadows to give the AR-DUINO logo and primary badges a breathing neon glow.
* **`animate-scan-line` (`scanLine`):** Animates a vertical scanning laser beam downward across simulated mobile phone viewports, illustrating real-time optical image tracking.
* **`animate-float` (`floatAnim`):** Imparts a subtle 5-second hovering oscillation to 3D hardware illustrations and floating callout badges.

