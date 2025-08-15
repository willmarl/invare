import React, { useEffect, useRef, useState } from "react";
import { Boxes, BrainCircuit, BookOpen, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Info.css";

const codeSnippets = [
  {
    label: "Arduino C++",
    code: `#include <Servo.h>\n\nint servoPin = 6;\nServo myServo;\n\nvoid setup() {\n  myServo.attach(servoPin);\n}\n\nvoid loop() {\n  myServo.write(x);\n}`,
    language: "cpp",
  },
  {
    label: "MicroPython",
    code: `from machine import Pin, PWM\n\ndef setup():\n    global servo\n    servo = PWM(Pin(15))\n    servo.freq(50)  # 50Hz for standard servos\n\ndef set_servo_angle(angle):\n    min_duty = 1000  # 1ms pulse (0°)\n    max_duty = 9000  # 2ms pulse (180°)\n    duty = int(min_duty + (angle / 180) * (max_duty - min_duty))\n    servo.duty_u16(duty)\n\nset_servo_angle(angle)`,
    language: "python",
  },
];

const TOGGLE_INTERVAL = 4000; // ms

function Info() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef();
  const timerRef = useRef();

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 100 / (TOGGLE_INTERVAL / 50);
      });
    }, 50);
    timerRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % codeSnippets.length);
    }, TOGGLE_INTERVAL);
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [active, paused]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
  const handleManualToggle = (idx) => {
    setActive(idx);
    setProgress(0);
  };

  return (
    <section className="about-info">
      <h2 className="about-info__heading">What It Does</h2>
      <ul className="about-info__features">
        <li className="about-info__feature">
          <span className="about-info__icon">
            <Boxes size={22} />
          </span>
          <strong>Inventory Manager:</strong> Add modules, track quantity, type,
          and usage.
        </li>
        <li className="about-info__feature">
          <span className="about-info__icon">
            <BrainCircuit size={22} />
          </span>
          <strong>AI Assistant:</strong> Ask questions about your inventory, get
          GPT-powered answers.
        </li>
        <li className="about-info__feature">
          <span className="about-info__icon">
            <BookOpen size={22} />
          </span>
          <strong>Wiki Page:</strong> Browse a library of modules with pinouts,
          power info, and code.
        </li>
        <li className="about-info__feature">
          <span className="about-info__icon">
            <Code2 size={22} />
          </span>
          <strong>Example Code:</strong> Quick-start snippets in Arduino C++ and
          MicroPython.
        </li>
      </ul>
      <div
        className="about-info__snippet"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="about-info__snippet-block">
          <div className="about-info__snippet-label">
            {codeSnippets[active].label}
          </div>
          <SyntaxHighlighter
            language={codeSnippets[active].language}
            style={vscDarkPlus}
            customStyle={{
              background: "#f8fafc",
              color: "#0f172a",
              fontSize: "1.01rem",
              borderRadius: "0.5rem",
              padding: "0.7rem 0.5rem 0.7rem 0.7rem",
              margin: 0,
              lineHeight: 1.5,
              fontFamily: "'Fira Mono', 'Consolas', 'Menlo', monospace",
              boxShadow: "none",
            }}
            showLineNumbers={false}
          >
            {codeSnippets[active].code}
          </SyntaxHighlighter>
        </div>
        <div className="about-info__snippet-controls">
          <button
            className="about-info__snippet-btn"
            onClick={() => handleManualToggle(0)}
            aria-pressed={active === 0}
            tabIndex={0}
          >
            Arduino
          </button>
          <button
            className="about-info__snippet-btn"
            onClick={() => handleManualToggle(1)}
            aria-pressed={active === 1}
            tabIndex={0}
          >
            MicroPython
          </button>
        </div>
        <div className="about-info__snippet-timer">
          <div
            className="about-info__snippet-timer-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default Info;
