# About Invare

**Invare** is a modular inventory and assistant app designed for makers, hobbyists, and hardware tinkerers. Whether you're working with Arduino, Raspberry Pi, ESP32, or other microcontroller ecosystems, Invare helps you track your components and get AI-powered support while building projects.

Invare runs as a **self-hosted web app**, typically in a Docker container. It's designed to work fully **offline on your local network**, but can optionally be **exposed securely via port forwarding** if you want to share access with friends or collaborate remotely.

---

## 🔧 What It Does

- **📦 Inventory Manager**  
  Add modules from a built-in library or create custom entries. Track quantity, type, and usage with ease.

- **🧠 AI Assistant**  
  Ask questions like _“Do I have a module to power a servo?”_ or _“What sensors do I own for temperature?”_ — GPT responds based on your actual inventory.

- **📘 Wiki Page**  
  Browse a growing library of common modules like LEDs, buttons, sensors, and servos. Each entry includes:

  - A short description
  - Pinout info
  - Power requirements
  - Example code snippets

- **💻 Example Code Snippets**  
  View and copy quick-start code in both **Arduino C++** and **MicroPython** formats.

  ```cpp
  #include <Servo.h>

  int servoPin = 6;
  Servo myServo;

  void setup() {
    myServo.attach(servoPin);
  }

  void loop() {
    myServo.write(x);
  }
  ```

````

```python
from machine import Pin, PWM

def setup():
    global servo
    servo = PWM(Pin(15))
    servo.freq(50)  # 50Hz for standard servos

# Helper function: set servo angle
def set_servo_angle(angle):
    min_duty = 1000  # 1ms pulse (0°)
    max_duty = 9000  # 2ms pulse (180°)
    duty = int(min_duty + (angle / 180) * (max_duty - min_duty))
    servo.duty_u16(duty)

set_servo_angle(angle)
````

---

## 🛠️ Built With

- **Frontend:** React + Vite, React Hook Form + Yup, Ky, Zustand, BEM styling
- **Backend:** Node.js + Express + MongoDB
- **AI:** OpenAI GPT API (inventory-aware prompts)
- **Deployment:** Docker-friendly for local or public hosting

---

## 🧾 Project Philosophy

Invare is built with the **DIY mindset** in mind:

- ✅ Developer-extendable
- ✅ Minimal
- ✅ Future-focused (project planning, compatibility analysis, code generation)

---

## 📍 Source Code & License

This project is open-source and available on GitHub:

- [Frontend Repo](https://github.com/willmarl/invare)
- [Backend Repo](https://github.com/willmarl/invare-api)

MIT License — free to use, self-host, and improve.

---

## 🌱 What's Coming

- 📑 Snippet toggle between Arduino / MicroPython
- 📄 Wiki page with expandable module details
- 💡 Project planner mode: “What can I build with what I have?”

---

> 💬 Built for makers. Powered by code. Organized by you.
