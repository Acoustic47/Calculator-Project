# 🧮 Sky Blue Glassmorphism Calculator

A sleek, modern web calculator built with vanilla HTML, CSS, and JavaScript. Featuring a vibrant sky blue glassmorphic aesthetic, animated button feedback, keyboard shortcuts, and an interactive background history drawer.

---

## ✨ Features

- **Modern Glassmorphism Design:** Sky blue gradient backdrop, blurred elements, and glowing input screen.
- **Interactive History Drawer:** Tap the **H** button to slide open a past-calculations drawer. Click any past result to load it back into the calculator display.
- **Tactile Animations:** Includes custom button keyframes with click-jiggle effects.
- **Full Keyboard Support:** Compute expressions using physical keys seamlessly (Numbers, Operators, `Enter`, `Backspace`, `Esc`, `H`).
- **Input Guardrails:** Smart regex checks to prevent duplicate operators (`++`, `//`) and multiple decimal points in a single number.
- **Safe Evaluation:** Built using strict non-eval parsing for secure runtime calculation execution.

---

## 📁 File Structure

```text
├── index.html   # Calculator structure & history modal elements
├── CaL.css      # Glassmorphism design, keyframe animations, & sky blue styling
└── first.js     # State management, history handlers, keyboard input logic
