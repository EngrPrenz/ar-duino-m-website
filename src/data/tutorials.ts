export interface HardwareItem {
  name: string;
  count: number | string;
  targetId?: string;
  description?: string;
}

export interface CircuitStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface ProjectTutorial {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  videoDurationSeconds: number;
  thumbnail: string;
  summary: string;
  conceptualGoal: string;
  hardware: HardwareItem[];
  steps: CircuitStep[];
  code: string;
  codeExplanation: string;
  youtubeId?: string; // Optional YouTube ID or undefined for "Coming Soon"
}

export const TUTORIALS_DATA: ProjectTutorial[] = [
  {
    id: "blinking-led",
    title: "Blinking LED (Hello World)",
    difficulty: "Easy",
    duration: "4m 15s",
    videoDurationSeconds: 255,
    thumbnail: "/screenshots/ar-workspace-led.png",
    summary: "The foundational 'Hello World' of microcontroller electronics. Learn how digital output pins toggle electrical states and control current.",
    conceptualGoal: "Digital output pin configuration (pinMode OUTPUT), binary HIGH/LOW logic states, voltage switching (0V vs 5V), and timing loops using delay().",
    hardware: [
      { name: "Arduino Uno R3", count: 1, targetId: "arduino-uno-r3", description: "Main microcontroller development board" },
      { name: "5mm Red LED", count: 1, description: "Standard light emitting diode (Forward voltage ~2.0V)" },
      { name: "220Ω Resistor", count: 1, targetId: "resistor", description: "Current limiting resistor to prevent LED burnout" },
      { name: "Prototyping Breadboard", count: 1, targetId: "breadboard", description: "Half or full size solderless breadboard" },
      { name: "Jumper Wires", count: 2, targetId: "jumper-wire", description: "Male-to-male flexible wires" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Insert LED into Breadboard",
        instruction: "Place the 5mm LED across two separate rows on the breadboard. Note the longer leg is the Anode (+) and the shorter leg is the Cathode (-). Place the Anode into row 10 and Cathode into row 11.",
        tip: "Never connect an LED directly between 5V and GND without a resistor, or it will immediately burn out!"
      },
      {
        stepNumber: 2,
        title: "Add 220Ω Current Limiting Resistor",
        instruction: "Insert one lead of the 220Ω resistor into row 11 (connected to the LED's cathode), and insert the other lead into the blue negative ground rail (-) of the breadboard.",
        tip: "Resistors are non-polar; either orientation works identically."
      },
      {
        stepNumber: 3,
        title: "Wire to Arduino Uno Pins",
        instruction: "Use a jumper wire to connect Arduino Digital Pin 13 to row 10 (LED Anode). Then use a second jumper wire to connect Arduino GND pin to the breadboard negative rail (-).",
        tip: "Pin 13 also has an onboard surface-mount LED on the Uno board that will blink in sync."
      },
      {
        stepNumber: 4,
        title: "Connect USB and Upload Sketch",
        instruction: "Plug the USB Type-A to Type-B cable into your computer, open the Arduino IDE (or AR-DUINO app simulator), choose the COM port, and upload the code.",
        tip: "In the AR-DUINO app, you can simply aim your camera at the Arduino Uno target to verify the simulated circuit!"
      }
    ],
    code: `/*
  AR-DUINO-M Project 1: Blinking LED
  Turns on an LED on for one second, then off for one second, repeatedly.
*/

const int LED_PIN = 13; // Built-in LED on pin 13

void setup() {
  // Initialize digital pin LED_PIN as an output
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);   // Turn the LED on (HIGH is the voltage level 5V)
  delay(1000);                   // Wait for a second (1000 milliseconds)
  digitalWrite(LED_PIN, LOW);    // Turn the LED off by making the voltage LOW (0V)
  delay(1000);                   // Wait for a second
}`,
    codeExplanation: "pinMode(13, OUTPUT) informs the ATmega328P microcontroller to configure the internal transistor gate as a low-impedance output driver. digitalWrite toggles the voltage between 5V and 0V, causing current to flow through the diode."
  },
  {
    id: "potentiometer-control",
    title: "Potentiometer Control & PWM Dimming",
    difficulty: "Medium",
    duration: "6m 30s",
    videoDurationSeconds: 390,
    thumbnail: "/screenshots/step-instructions.png",
    summary: "Acquire continuous analog signals and translate human dial input into dynamic Pulse Width Modulation (PWM) LED brightness.",
    conceptualGoal: "Analog-to-digital conversion (ADC), 10-bit resolution (0-1023), map() mathematical range scaling, and 8-bit PWM duty cycles (0-255).",
    hardware: [
      { name: "Arduino Uno R3", count: 1, targetId: "arduino-uno-r3", description: "Microcontroller with 10-bit ADC channels" },
      { name: "10k Rotary Potentiometer", count: 1, targetId: "potentiometer", description: "3-terminal variable voltage divider" },
      { name: "5mm LED", count: 1, description: "Any color LED for brightness dimming" },
      { name: "220Ω Resistor", count: 1, targetId: "resistor", description: "Current limiting protection resistor" },
      { name: "Prototyping Breadboard", count: 1, targetId: "breadboard", description: "Standard solderless breadboard" },
      { name: "Jumper Wires", count: 5, targetId: "jumper-wire", description: "Male-to-male jumper wires" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Position Potentiometer on Breadboard",
        instruction: "Insert the 3 pins of the 10k potentiometer into three separate vertical columns on the breadboard (e.g., pins at rows 20, 22, and 24).",
        tip: "Ensure the potentiometer legs firmly snap into the breadboard clips without bending."
      },
      {
        stepNumber: 2,
        title: "Power Rails and Reference Voltages",
        instruction: "Connect the outer left pin to the +5V rail, and the outer right pin to the GND rail. Connect Arduino 5V and GND to the breadboard side rails.",
        tip: "Swapping the outer pins simply reverses the clockwise/counter-clockwise direction of the dial."
      },
      {
        stepNumber: 3,
        title: "Route Analog Wiper Signal",
        instruction: "Connect a jumper wire from the potentiometer center wiper pin (row 22) to Arduino Analog Pin A0.",
        tip: "Analog pins on Arduino Uno sample voltages from 0V to 5V and convert them to integer values between 0 and 1023."
      },
      {
        stepNumber: 4,
        title: "Wire PWM Output to LED",
        instruction: "Place an LED on the breadboard. Connect its anode (+) through a 220Ω resistor to Arduino PWM Pin 9 (~). Connect its cathode (-) to GND.",
        tip: "PWM pins are marked with a tilde (~) on the Arduino Uno silk screen: 3, 5, 6, 9, 10, 11."
      }
    ],
    code: `/*
  AR-DUINO-M Project 2: Potentiometer Control & PWM Dimming
  Reads an analog input on pin 0, maps the result to 0-255, and dims an LED on pin 9.
*/

const int POT_PIN = A0;  // Analog input pin connected to the potentiometer wiper
const int LED_PIN = 9;   // PWM digital output pin connected to LED

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);    // Initialize serial communication for telemetry
}

void loop() {
  int sensorValue = analogRead(POT_PIN);          // Read 0 to 1023
  int brightness = map(sensorValue, 0, 1023, 0, 255); // Map to 8-bit PWM (0-255)
  
  analogWrite(LED_PIN, brightness);              // Output PWM wave

  // Print telemetry to Serial Monitor
  Serial.print("Raw ADC: ");
  Serial.print(sensorValue);
  Serial.print(" -> Brightness: ");
  Serial.println(brightness);

  delay(15); // Small delay for ADC stabilization
}`,
    codeExplanation: "The microcontroller's built-in ADC reads the variable voltage from the wiper. Since analogRead outputs 0-1023 (10 bits) and analogWrite accepts 0-255 (8 bits), the map() function scales the input smoothly to control the PWM duty cycle."
  },
  {
    id: "led-patterns-chaser",
    title: "LED Patterns & Sequence Chaser",
    difficulty: "Medium",
    duration: "8m 45s",
    videoDurationSeconds: 525,
    thumbnail: "/screenshots/project-details.png",
    summary: "Master array programming and sequential digital actuation to construct a knight-rider fluid light chaser display.",
    conceptualGoal: "C++ array data structures, for-loop iteration, sequential pin manipulation, and mathematical indexing for timing patterns.",
    hardware: [
      { name: "Arduino Uno R3", count: 1, targetId: "arduino-uno-r3", description: "Microcontroller board" },
      { name: "5mm LEDs (Assorted)", count: 5, description: "5 different or matching colored LEDs" },
      { name: "220Ω Resistors", count: 5, targetId: "resistor", description: "Individual current-limiting resistors" },
      { name: "Prototyping Breadboard", count: 1, targetId: "breadboard", description: "Standard solderless breadboard" },
      { name: "Jumper Wires", count: 7, targetId: "jumper-wire", description: "Color-coded jumper wires" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Align the 5 LEDs in Series",
        instruction: "Mount 5 LEDs in a neat row on the breadboard, spaced 2-3 rows apart. Keep all longer anode leads on the left and cathode leads on the right.",
        tip: "Consistent orientation makes debugging complex multi-component circuits fast and intuitive."
      },
      {
        stepNumber: 2,
        title: "Insert Cathode Resistors",
        instruction: "For each LED, insert a 220Ω resistor connecting the cathode lead to the breadboard negative ground rail (-).",
        tip: "Always use independent resistors for each LED to ensure uniform brightness regardless of how many LEDs are on simultaneously."
      },
      {
        stepNumber: 3,
        title: "Connect Arduino Digital Pins 2 to 6",
        instruction: "Wire Arduino digital pins 2, 3, 4, 5, and 6 to each respective LED anode row on the breadboard.",
        tip: "Use rainbow jumper wires matching the LED positions to keep track of the sequential index."
      },
      {
        stepNumber: 4,
        title: "Complete Ground Return and Upload",
        instruction: "Connect Arduino GND to the negative power rail of the breadboard, then upload the animated chaser sketch.",
        tip: "Try adjusting the delay variable in the source code to alter the speed of the scan pattern!"
      }
    ],
    code: `/*
  AR-DUINO-M Project 3: LED Patterns & Sequence Chaser
  Demonstrates arrays, for loops, and bidirectional knight-rider scan patterns.
*/

const int LED_PINS[] = {2, 3, 4, 5, 6};
const int NUM_LEDS = 5;
const int DELAY_MS = 80;

void setup() {
  // Configure all pins in the array as OUTPUT
  for (int i = 0; i < NUM_LEDS; i++) {
    pinMode(LED_PINS[i], OUTPUT);
  }
}

void loop() {
  // Forward scan
  for (int i = 0; i < NUM_LEDS; i++) {
    digitalWrite(LED_PINS[i], HIGH);
    delay(DELAY_MS);
    digitalWrite(LED_PINS[i], LOW);
  }

  // Reverse scan (excluding endpoints to prevent double-flash)
  for (int i = NUM_LEDS - 2; i > 0; i--) {
    digitalWrite(LED_PINS[i], HIGH);
    delay(DELAY_MS);
    digitalWrite(LED_PINS[i], LOW);
  }
}`,
    codeExplanation: "The pins are defined in an array `LED_PINS[]`. A `for` loop cycles sequentially through indices 0 to 4 turning each pin HIGH, waiting, and resetting to LOW, followed by a reverse pass to produce the sweep animation."
  },
  {
    id: "rc-car-motor-control",
    title: "Smart RC Car & L298N Robotics",
    difficulty: "Hard",
    duration: "14m 20s",
    videoDurationSeconds: 860,
    thumbnail: "/screenshots/ar-workspace-rccar.png",
    summary: "Architect a dual-motor mobile robotics platform using the L298N Dual H-Bridge driver with independent directional steering and PWM velocity control.",
    conceptualGoal: "High-current inductive load switching, H-Bridge polarity inversion, separate logic vs motor power decoupling, and skid-steer differential drive kinematics.",
    hardware: [
      { name: "Arduino Uno R3", count: 1, targetId: "arduino-uno-r3", description: "Brain executing navigation logic" },
      { name: "L298N Motor Driver", count: 1, targetId: "l298n-motor-driver", description: "Dual H-Bridge driver module with heatsink" },
      { name: "2x DC Gearmotors & Wheels", count: 2, description: "3-6V high-torque DC gearmotors" },
      { name: "Smart Robot Car Chassis", count: 1, targetId: "rc-car", description: "Laser-cut acrylic robot platform" },
      { name: "7.4V / 9V Battery Pack", count: 1, targetId: "9v-battery", description: "External motor power supply" },
      { name: "Male-to-Female Jumper Wires", count: 8, targetId: "jumper-wire", description: "Connects Arduino headers to L298N pins" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Mount Motors and Chassis",
        instruction: "Fasten the dual DC gear motors to the smart robot chassis using the acrylic mounting tabs and nuts. Attach the rubber wheels to the motor shafts.",
        tip: "Orient the motor wire solder tabs inward toward the center to protect them during obstacle impacts."
      },
      {
        stepNumber: 2,
        title: "Wire Motors to L298N Screw Terminals",
        instruction: "Connect the Left Motor leads to screw terminal block OUT1 & OUT2. Connect the Right Motor leads to screw terminal block OUT3 & OUT4.",
        tip: "If a motor spins backward during software tests, simply reverse its two wire leads in the screw terminal block."
      },
      {
        stepNumber: 3,
        title: "Connect Arduino Logic and PWM Signals",
        instruction: "Remove the jumpers on ENA and ENB. Connect Arduino Pin 9 (PWM) to ENA, Pin 10 (PWM) to ENB. Connect Arduino Pins 4, 5, 6, 7 to IN1, IN2, IN3, IN4.",
        tip: "ENA and ENB control motor velocity via analogWrite(), while IN1-IN4 dictate clockwise vs counter-clockwise rotation."
      },
      {
        stepNumber: 4,
        title: "Power Supply and Common Ground",
        instruction: "Connect battery positive (+) to the L298N 12V terminal, and battery negative (-) to L298N GND. Crucially, connect an extra jumper from L298N GND to Arduino GND.",
        tip: "WARNING: A shared common ground between the external battery, motor driver, and Arduino is strictly mandatory for logic reference!"
      }
    ],
    code: `/*
  AR-DUINO-M Project 4: Smart RC Car & L298N Motor Control
  Differential drive robotics with PWM speed control and state functions.
*/

// Motor A (Left)
const int ENA = 9;  // Speed control (PWM)
const int IN1 = 4;  // Direction 1
const int IN2 = 5;  // Direction 2

// Motor B (Right)
const int ENB = 10; // Speed control (PWM)
const int IN3 = 6;  // Direction 1
const int IN4 = 7;  // Direction 2

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  
  stopCar();
}

void loop() {
  // Routine: Forward -> Stop -> Spin Left -> Spin Right -> Stop
  moveForward(200);
  delay(2000);
  
  stopCar();
  delay(500);

  spinLeft(180);
  delay(1000);

  stopCar();
  delay(500);

  spinRight(180);
  delay(1000);

  stopCar();
  delay(3000);
}

void moveForward(int speed) {
  analogWrite(ENA, speed);
  analogWrite(ENB, speed);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void spinLeft(int speed) {
  analogWrite(ENA, speed);
  analogWrite(ENB, speed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH); // Left reverse
  digitalWrite(IN3, HIGH); // Right forward
  digitalWrite(IN4, LOW);
}

void spinRight(int speed) {
  analogWrite(ENA, speed);
  analogWrite(ENB, speed);
  digitalWrite(IN1, HIGH); // Left forward
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);  // Right reverse
  digitalWrite(IN4, HIGH);
}

void stopCar() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}`,
    codeExplanation: "The L298N driver houses two H-Bridge circuits. Setting IN1=HIGH and IN2=LOW connects OUT1 to positive voltage and OUT2 to ground. Reversing the inputs reverses the magnetic coil polarity, spinning the motor in reverse. The PWM signals on ENA and ENB slice the voltage at high frequency to throttle motor velocity."
  }
];
