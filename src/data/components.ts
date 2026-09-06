export interface ComponentTarget {
  id: string;
  name: string;
  category: 
    | "Microcontrollers & Boards"
    | "Sensors & Modules"
    | "Inputs & Controls"
    | "Motors & Drivers"
    | "Power & Passives"
    | "Displays & Systems";
  description: string;
  targetFile: string;
  targetIdentifier: string;
  specs?: {
    operatingVoltage?: string;
    interface?: string;
    pinCount?: number | string;
    features?: string[];
  };
  circuitRole: string;
  vuforiaReady: boolean;
}

export const CATEGORIES = [
  "All Hardware",
  "Microcontrollers & Boards",
  "Sensors & Modules",
  "Inputs & Controls",
  "Motors & Drivers",
  "Power & Passives",
  "Displays & Systems",
] as const;

export const COMPONENT_DATA: ComponentTarget[] = [
  // 1. Microcontrollers & Boards (7)
  {
    id: "arduino-uno-r3",
    name: "Arduino Uno R3",
    category: "Microcontrollers & Boards",
    description: "Primary controller brain powered by the ATmega328P microcontroller with 14 digital I/O pins, 6 analog inputs, and 16 MHz quartz crystal.",
    targetFile: "/targets/arduino-uno-r3.jpg",
    targetIdentifier: "arduino-uno-r3",
    circuitRole: "Primary brain; ATmega328P MCU; processes inputs & drives actuators",
    specs: {
      operatingVoltage: "5V (7-12V Input)",
      interface: "USB Type-B / UART",
      pinCount: "14 Digital + 6 Analog",
      features: ["6 PWM Outputs", "16MHz Clock", "32KB Flash Memory", "Optiboot Bootloader"]
    },
    vuforiaReady: true
  },
  {
    id: "arduino-nano",
    name: "Arduino Nano",
    category: "Microcontrollers & Boards",
    description: "Ultra-compact breadboard-friendly microcontroller board based on the ATmega328P with integrated Mini-B USB programming connector.",
    targetFile: "/targets/arduino-nano.jpg",
    targetIdentifier: "arduino-nano",
    circuitRole: "Compact breadboard-friendly ATmega328P board for small footprints",
    specs: {
      operatingVoltage: "5V (7-12V Input)",
      interface: "Mini-USB / UART",
      pinCount: "14 Digital + 8 Analog",
      features: ["Breadboard-Friendly", "32KB Flash Memory", "8 Analog Inputs"]
    },
    vuforiaReady: true
  },
  {
    id: "arduino-r4-wifi",
    name: "Arduino Uno R4 WiFi",
    category: "Microcontrollers & Boards",
    description: "Modern 32-bit Renesas RA4M1 ARM Cortex-M4 MCU with ESP32-S3 module for Wi-Fi and Bluetooth connectivity, plus a bright 12x8 red LED matrix.",
    targetFile: "/targets/arduino-r4-wifi.jpg",
    targetIdentifier: "arduino-r4-wifi",
    circuitRole: "32-bit Renesas RA4M1 MCU; integrated Wi-Fi, BLE, and 12x8 LED matrix",
    specs: {
      operatingVoltage: "5V (6-24V Input)",
      interface: "USB Type-C / Wi-Fi / BLE",
      pinCount: "14 Digital + 6 Analog",
      features: ["12x8 LED Matrix", "ESP32-S3 Co-processor", "48MHz Cortex-M4", "CAN Bus"]
    },
    vuforiaReady: true
  },
  {
    id: "esp32-dev-board",
    name: "ESP32 Development Board",
    category: "Microcontrollers & Boards",
    description: "High-performance dual-core 32-bit Tensilica Xtensa LX6 microcontroller with integrated 2.4 GHz Wi-Fi and Bluetooth LE for modern IoT prototypes.",
    targetFile: "/targets/esp32-dev-board.jpg",
    targetIdentifier: "esp32-dev-board",
    circuitRole: "Dual-core 32-bit MCU with 2.4GHz Wi-Fi/BLE for IoT & automation",
    specs: {
      operatingVoltage: "3.3V (5V USB)",
      interface: "Micro-USB / Wi-Fi / BLE",
      pinCount: "30 or 38 Pins",
      features: ["240MHz Dual-Core", "520KB SRAM", "Touch Sensors", "Hardware Cryptography"]
    },
    vuforiaReady: true
  },
  {
    id: "raspberry-pi",
    name: "Raspberry Pi SBC",
    category: "Microcontrollers & Boards",
    description: "Single-board Linux computer designed for high-level embedded computing, Python automation, computer vision, and network services.",
    targetFile: "/targets/raspberry-pi.jpg",
    targetIdentifier: "raspberry-pi",
    circuitRole: "Single-board Linux computer for advanced robotics and computer vision",
    specs: {
      operatingVoltage: "5V DC via Micro-USB",
      interface: "40-Pin GPIO / HDMI",
      pinCount: "40 Pins",
      features: ["Broadcom SoC", "Full OS Capability", "Camera CSI Port", "Display DSI Port"]
    },
    vuforiaReady: true
  },
  {
    id: "raspberry-pi-3",
    name: "Raspberry Pi 3 Model B",
    category: "Microcontrollers & Boards",
    description: "Quad-core 1.2 GHz 64-bit ARM Cortex-A53 SBC with 1GB LPDDR2 RAM, onboard 802.11n Wi-Fi, and 10/100 Ethernet interface.",
    targetFile: "/targets/raspberry-pi-3.jpg",
    targetIdentifier: "raspberry-pi-3",
    circuitRole: "Quad-core 1.2GHz 64-bit SBC for multimedia processing and IoT hubs",
    specs: {
      operatingVoltage: "5.1V / 2.5A DC",
      interface: "40-Pin GPIO / 4x USB 2.0 / HDMI",
      pinCount: "40 Pins",
      features: ["Quad-Core 64-bit CPU", "1GB RAM", "Built-in Wi-Fi & BLE", "Full HDMI"]
    },
    vuforiaReady: true
  },
  {
    id: "raspberry-pi-zero",
    name: "Raspberry Pi Zero",
    category: "Microcontrollers & Boards",
    description: "Ultra-miniaturized 1 GHz single-core computer measuring only 65mm x 30mm with Mini HDMI and unpopulated 40-pin GPIO header.",
    targetFile: "/targets/raspberry-pi-zero.jpg",
    targetIdentifier: "raspberry-pi-zero",
    circuitRole: "Ultra-small 1GHz single-board computer for embedded IoT devices",
    specs: {
      operatingVoltage: "5V via Micro-USB",
      interface: "40-Pin GPIO / Mini HDMI",
      pinCount: "40 Pins (Unsoldered)",
      features: ["Ultra-Compact", "1GHz Single Core", "512MB RAM", "Low Power Draw"]
    },
    vuforiaReady: true
  },

  // 2. Sensors & Modules (5)
  {
    id: "dht11-sensor",
    name: "DHT11 Temp & Humidity Sensor",
    category: "Sensors & Modules",
    description: "Calibrated digital composite sensor outputting relative humidity and ambient temperature via single-bus proprietary protocol.",
    targetFile: "/targets/dht11-sensor.jpg",
    targetIdentifier: "dht11-sensor",
    circuitRole: "Digital temperature and humidity sensor via single-wire communication",
    specs: {
      operatingVoltage: "3.5V to 5.5V",
      interface: "1-Wire Digital Signal",
      pinCount: 3,
      features: ["Temp: 0-50°C ±2°C", "Humidity: 20-90% ±5% RH", "1Hz Sampling Rate"]
    },
    vuforiaReady: true
  },
  {
    id: "hc-sr04-ultrasonic-sensor",
    name: "HC-SR04 Ultrasonic Sensor",
    category: "Sensors & Modules",
    description: "Non-contact ultrasonic distance measuring module using 40 kHz acoustic burst to compute distance from 2 cm up to 400 cm.",
    targetFile: "/targets/hc-sr04-ultrasonic-sensor.jpg",
    targetIdentifier: "hc-sr04-ultrasonic-sensor",
    circuitRole: "40kHz acoustic rangefinder measuring distances from 2cm to 400cm",
    specs: {
      operatingVoltage: "5V DC",
      interface: "Trigger (Input) / Echo (Output)",
      pinCount: 4,
      features: ["2cm - 400cm Range", "3mm High Accuracy", "15° Measuring Angle", "Echo Time Calculation"]
    },
    vuforiaReady: true
  },
  {
    id: "ir-sensor",
    name: "IR Obstacle Avoidance Sensor",
    category: "Sensors & Modules",
    description: "Infrared emitter and photodiode detector pair with LM393 comparator and onboard sensitivity trim potentiometer for obstacle detection.",
    targetFile: "/targets/ir-sensor.jpg",
    targetIdentifier: "ir-sensor",
    circuitRole: "Infrared reflection sensor for proximity detection and line tracking",
    specs: {
      operatingVoltage: "3.3V - 5V DC",
      interface: "Digital Out (Active LOW)",
      pinCount: 3,
      features: ["Detection Distance: 2-30cm", "35° Detection Angle", "Onboard LM393 Comparator"]
    },
    vuforiaReady: true
  },
  {
    id: "mpu-6050-module",
    name: "MPU-6050 6-Axis IMU",
    category: "Sensors & Modules",
    description: "Integrated 6-axis MotionTracking device combining a 3-axis gyroscope and a 3-axis accelerometer with digital Motion Processor (DMP).",
    targetFile: "/targets/mpu-6050-module.jpg",
    targetIdentifier: "mpu-6050-module",
    circuitRole: "Combined 3-axis accelerometer and 3-axis gyroscope with I2C output",
    specs: {
      operatingVoltage: "3.3V - 5V (Onboard Regulator)",
      interface: "I2C (SCL/SDA)",
      pinCount: 8,
      features: ["16-bit ADC per channel", "±250 to ±2000°/sec Gyro", "±2g to ±16g Accel", "Built-in DMP"]
    },
    vuforiaReady: true
  },
  {
    id: "water-level-sensor",
    name: "Water Level Depth Sensor",
    category: "Sensors & Modules",
    description: "Analog liquid height detection board with exposed parallel conductive traces that translate water immersion depth into variable analog voltage.",
    targetFile: "/targets/water-level-sensor.jpg",
    targetIdentifier: "water-level-sensor",
    circuitRole: "Conductive trace sensor converting immersion depth to analog voltage",
    specs: {
      operatingVoltage: "3.3V - 5V",
      interface: "Analog Voltage Output",
      pinCount: 3,
      features: ["Detection Area: 40x16mm", "Low Power Consumption", "Direct Arduino Analog In"]
    },
    vuforiaReady: true
  },

  // 3. Inputs & Controls (3)
  {
    id: "button",
    name: "Tactile Push Button",
    category: "Inputs & Controls",
    description: "Momentary 4-pin tactile push switch providing clean digital HIGH/LOW state signals when pressed, essential for interactive triggers.",
    targetFile: "/targets/button.jpg",
    targetIdentifier: "button",
    circuitRole: "Momentary switch sending digital HIGH/LOW signals to input pins",
    specs: {
      operatingVoltage: "Up to 12V DC",
      interface: "Digital State (Pull-up / Pull-down)",
      pinCount: 4,
      features: ["Momentary Contact", "Crisp Click Response", "Breadboard Compatible Spacing"]
    },
    vuforiaReady: true
  },
  {
    id: "potentiometer",
    name: "10k Rotary Potentiometer",
    category: "Inputs & Controls",
    description: "Linear 3-terminal variable resistor allowing manual dial rotation to output continuous 0V to 5V analog voltage (0-1023 on Arduino ADC).",
    targetFile: "/targets/potentiometer.jpg",
    targetIdentifier: "potentiometer",
    circuitRole: "Variable resistor outputting 0–1023 analog signals for PWM dimming",
    specs: {
      operatingVoltage: "Up to 5V (Logic Reference)",
      interface: "Analog Voltage Divider",
      pinCount: 3,
      features: ["10kΩ Resistance", "300° Rotation Angle", "Panel or Breadboard Mountable"]
    },
    vuforiaReady: true
  },
  {
    id: "joystick-module",
    name: "Dual-Axis Joystick Module",
    category: "Inputs & Controls",
    description: "Spring-centered analog thumb joystick providing dual X/Y axis potentiometers plus an integrated momentary push switch (Z-axis).",
    targetFile: "/targets/joystick-module.jpg",
    targetIdentifier: "joystick-module",
    circuitRole: "Dual X/Y potentiometric axes plus a digital pushbutton click (Z-axis)",
    specs: {
      operatingVoltage: "5V DC",
      interface: "2x Analog (VRx, VRy) + 1x Digital (SW)",
      pinCount: 5,
      features: ["Auto Center Return", "Dual 10k Potentiometers", "Integrated Push Button"]
    },
    vuforiaReady: true
  },

  // 4. Motors & Drivers (3)
  {
    id: "servo-motor",
    name: "SG90 Micro Servo Motor",
    category: "Motors & Drivers",
    description: "Lightweight 9g high-torque angular actuator capable of precise 0 to 180 degree rotation controlled via standard 50Hz PWM signals.",
    targetFile: "/targets/servo-motor.jpg",
    targetIdentifier: "servo-motor",
    circuitRole: "180° precise angular position actuator driven by PWM signals",
    specs: {
      operatingVoltage: "4.8V to 6V",
      interface: "PWM Signal (Orange) / 5V (Red) / GND (Brown)",
      pinCount: 3,
      features: ["1.8 kg·cm Torque", "0.1 sec/60° Speed", "180° Range", "Nylon Gear Train"]
    },
    vuforiaReady: true
  },
  {
    id: "stepper-motor",
    name: "28BYJ-48 Stepper Motor",
    category: "Motors & Drivers",
    description: "5V unipolar 4-phase geared stepper motor with 64:1 reduction ratio, capable of 4096 discrete steps per revolution when half-stepping.",
    targetFile: "/targets/stepper-motor.jpg",
    targetIdentifier: "stepper-motor",
    circuitRole: "4-phase geared motor rotating in discrete steps for precise positioning",
    specs: {
      operatingVoltage: "5V DC",
      interface: "4-Phase Control (ULN2003 Driver)",
      pinCount: 5,
      features: ["5.625°/64 Stride Angle", "1:64 Gear Reduction", "High Holding Torque"]
    },
    vuforiaReady: true
  },
  {
    id: "l298n-motor-driver",
    name: "L298N Motor Driver Module",
    category: "Motors & Drivers",
    description: "High-power dual H-bridge motor driver capable of driving two bidirectional DC motors or one 4-wire bipolar stepper motor with PWM speed control.",
    targetFile: "/targets/l298n-motor-driver.jpg",
    targetIdentifier: "l298n-motor-driver",
    circuitRole: "Dual H-bridge driver controlling direction and speed of two DC motors",
    specs: {
      operatingVoltage: "5V - 35V DC",
      interface: "Logic IN1-IN4, ENA/ENB PWM jumpers",
      pinCount: "Terminal Blocks + 6 Logic Pins",
      features: ["2A Peak Current per Bridge", "Onboard 5V Regulator", "Large Aluminum Heatsink"]
    },
    vuforiaReady: true
  },

  // 5. Power & Passives (8)
  {
    id: "9v-battery",
    name: "9V Heavy Duty Battery",
    category: "Power & Passives",
    description: "Compact 9V alkaline / zinc-carbon DC battery with snap connector, providing portable untethered power for mobile Arduino circuits.",
    targetFile: "/targets/9v-battery.jpg",
    targetIdentifier: "9v-battery",
    circuitRole: "Portable DC power supply for mobile Arduino and robotic projects",
    specs: {
      operatingVoltage: "9V DC",
      interface: "Standard PP3 Snap Terminal",
      pinCount: 2,
      features: ["Portable Power", "Up to 500mAh", "Feeds Arduino VIN / DC Barrel Jack"]
    },
    vuforiaReady: true
  },
  {
    id: "breadboard",
    name: "Prototyping Breadboard (830 Point)",
    category: "Power & Passives",
    description: "Standard solderless electronic breadboard featuring 630 tie-point terminal matrix plus two 100-point dual power bus rails.",
    targetFile: "/targets/breadboard.jpg",
    targetIdentifier: "breadboard",
    circuitRole: "830-point solderless contact board for temporary circuit connections",
    specs: {
      operatingVoltage: "Up to 300V / 3A max rating",
      interface: "0.1 inch (2.54mm) Standard Pitch",
      pinCount: 830,
      features: ["Solderless Design", "Self-Adhesive Backing", "Interlocking Tabs", "Center Trench for DIP ICs"]
    },
    vuforiaReady: true
  },
  {
    id: "jumper-wire",
    name: "Jumper Wires Set",
    category: "Power & Passives",
    description: "Flexible multi-colored 24 AWG ribbon wire leads with molded male/female dupont header pins for reliable solderless breadboard routing.",
    targetFile: "/targets/jumper-wire.jpg",
    targetIdentifier: "jumper-wire",
    circuitRole: "Flexible male-to-male and male-to-female signal/power conductors",
    specs: {
      operatingVoltage: "Low Voltage Signal / Power",
      interface: "2.54mm Dupont Connectors",
      pinCount: "Assorted (M-M, M-F, F-F)",
      features: ["Color-Coded Insulation", "Flexible Copper Core", "Snug Breadboard Grip"]
    },
    vuforiaReady: true
  },
  {
    id: "resistor",
    name: "Carbon Film Resistor",
    category: "Power & Passives",
    description: "Axial-lead 1/4 watt passive component providing precise electrical resistance for current limitation, LED protection, and voltage division.",
    targetFile: "/targets/resistor.jpg",
    targetIdentifier: "resistor",
    circuitRole: "Current-limiting passive element protecting LEDs and dividing voltage",
    specs: {
      operatingVoltage: "Up to 250V / 0.25W Power",
      interface: "Axial 2-Lead Through-Hole",
      pinCount: 2,
      features: ["4-Band Color Code", "±5% Tolerance", "Essential LED Current Limiter"]
    },
    vuforiaReady: true
  },
  {
    id: "cylindric-capacitor",
    name: "Cylindrical Capacitor",
    category: "Power & Passives",
    description: "Polarized radial-lead electrolytic capacitor engineered for DC power rail filtering, noise decoupling, and voltage transient smoothing.",
    targetFile: "/targets/cylindric-capacitor.jpg",
    targetIdentifier: "cylindric-capacitor",
    circuitRole: "Electrolytic energy storage component for filtering and voltage smoothing",
    specs: {
      operatingVoltage: "16V - 50V Rated",
      interface: "Radial Leads (Long Anode / Striped Cathode)",
      pinCount: 2,
      features: ["Electrolytic Dielectric", "High Capacitance per Volume", "Power Rail Ripple Reduction"]
    },
    vuforiaReady: true
  },
  {
    id: "single-inline-package",
    name: "SIP Header Pin Strip",
    category: "Power & Passives",
    description: "Single-row breakaway 2.54mm pitch male/female pin header strip for PCB interconnects, sensor modularity, and breadboard mating.",
    targetFile: "/targets/single-inline-package.jpg",
    targetIdentifier: "single-inline-package",
    circuitRole: "Modular pin strip connectors for PCBs, sensors, and expansion boards",
    specs: {
      operatingVoltage: "Up to 250V / 3A",
      interface: "2.54mm Standard Header Pitch",
      pinCount: "Breakaway Strip (Up to 40 Pins)",
      features: ["Gold/Tin Plated Contacts", "Easy Snap-to-Length", "Square Contact Posts"]
    },
    vuforiaReady: true
  },
  {
    id: "to-220-package",
    name: "TO-220 Transistor / Regulator",
    category: "Power & Passives",
    description: "Through-hole semiconductor power package with metal mounting tab for heat sinking, common in LM7805 5V regulators and power MOSFETs.",
    targetFile: "/targets/to-220-package.jpg",
    targetIdentifier: "to-220-package",
    circuitRole: "Power semiconductor package for MOSFETs and LM7805 voltage regulators",
    specs: {
      operatingVoltage: "Up to 35V Input (LM7805)",
      interface: "3 Through-Hole Leads + Metal Thermal Tab",
      pinCount: 3,
      features: ["High Heat Dissipation", "Heatsink Hole Included", "Standard Power Package"]
    },
    vuforiaReady: true
  },
  {
    id: "usb-cable",
    name: "USB Type-A to Type-B Cable",
    category: "Power & Passives",
    description: "High-speed shielded USB 2.0 printer/programming cable providing robust serial communication and clean 500mA power from host PC to Uno.",
    targetFile: "/targets/usb-cable.jpg",
    targetIdentifier: "usb-cable",
    circuitRole: "Programming and 5V power cable connecting PC to Arduino Uno",
    specs: {
      operatingVoltage: "5V USB VBUS (500mA max)",
      interface: "USB 2.0 Type-A Male to Type-B Male",
      pinCount: 4,
      features: ["Foil & Braid Shielding", "Transfers Arduino Hex Code", "Supplies 5V USB Power"]
    },
    vuforiaReady: true
  },

  // 6. Displays & Systems (3)
  {
    id: "lcd-display",
    name: "16x2 Alphanumeric LCD",
    category: "Displays & Systems",
    description: "Standard dot-matrix liquid crystal display capable of rendering 16 characters across 2 rows, often coupled with an I2C backpack interface.",
    targetFile: "/targets/lcd-display.jpg",
    targetIdentifier: "lcd-display",
    circuitRole: "Liquid crystal screen displaying 32 characters via HD44780 controller",
    specs: {
      operatingVoltage: "5V DC",
      interface: "I2C (4 Pins: VCC, GND, SDA, SCL) or 16-Pin Parallel",
      pinCount: "4 (I2C) or 16 (Parallel)",
      features: ["16x2 Character Matrix", "Blue/Yellow LED Backlight", "Custom Symbol Generator"]
    },
    vuforiaReady: true
  },
  {
    id: "rgb-module",
    name: "3-Color RGB LED Module",
    category: "Displays & Systems",
    description: "Integrated full-color 5mm LED module combining Red, Green, and Blue diodes with current limiting resistors for millions of mixed PWM colors.",
    targetFile: "/targets/rgb-module.jpg",
    targetIdentifier: "rgb-module",
    circuitRole: "Multi-color LED mixing Red, Green, and Blue PWM channels",
    specs: {
      operatingVoltage: "3.3V - 5V",
      interface: "3x PWM Digital Inputs (R, G, B) + Common Cathode/Anode",
      pinCount: 4,
      features: ["Full Color Spectrum", "Direct Arduino PWM Connection", "Compact Breakout PCB"]
    },
    vuforiaReady: true
  },
  {
    id: "rc-car",
    name: "Smart Robot RC Car Chassis",
    category: "Displays & Systems",
    description: "Complete 2WD/4WD educational robotics platform featuring dual DC gear motors, rubber traction wheels, caster wheel, and clear laser-cut chassis.",
    targetFile: "/targets/rc-car.jpg",
    targetIdentifier: "rc-car",
    circuitRole: "2WD/4WD mobile platform with gear motors, wheels, and acrylic chassis",
    specs: {
      operatingVoltage: "3V - 9V DC Motor Rating",
      interface: "Dual DC Motor Terminals + Chassis Mounts",
      pinCount: "Multiple Mounting Points",
      features: ["High-Torque Gearmotors", "Traction Rubber Tires", "Pre-drilled Sensor & Arduino Mounts"]
    },
    vuforiaReady: true
  }
];
