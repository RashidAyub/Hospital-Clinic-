# 🏥 ApexCare Health — Premium Hospital & Clinic Portal

> **A luxury, modern, state-of-the-art Hospital & Clinic web platform** built with high-end healthcare branding, Three.js 3D medical visualization, GSAP ScrollTrigger animations, interactive appointment booking, and responsive architecture.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)

---

## 🌟 Live Demo & Preview

* **GitHub Repository:** [https://github.com/RashidAyub/Hospital-Clinic-.git](https://github.com/RashidAyub/Hospital-Clinic-.git)
* **Vercel Ready:** Seamless one-click deployment via `vercel.json`.

---

## ✨ Key Features

### 💎 Luxury Medical Branding & Aesthetics
- **Curated Medical Palette:** Deep Midnight Navy (`#060B18`), Sapphire Blue (`#0052FF`), Cyber Cyan (`#00D2FF`), Pure White, and Champagne Gold accents.
- **Glassmorphism & Glow:** Subtle frosted glass cards, glow effects, and modern elevation depth.
- **Fluid Typography:** Google Fonts `Plus Jakarta Sans` for clean clinical readability and `Outfit` for display headings.

### 🧬 Interactive Three.js 3D Medical Scene
- Holographic **DNA double-helix structure** paired with an abstract medical coordinate sphere and floating molecular particles.
- Mouse-driven interactive parallax on desktop with automatic throttling and performance scaling.
- Viewport visibility detection (pauses render loop when not in view to optimize GPU/CPU).
- Full compliance with `prefers-reduced-motion`.

### ⚡ GSAP ScrollTrigger & Micro-Interactions
- Smooth entrance choreography for hero badges, typography, and live telemetry cards.
- Viewport-triggered **animated statistical counters** (25+ Years, 150+ Specialists, 50K+ Patients, 99.4% Precision).
- Interactive card lift elevations and subtle button glow sweeps.

### 🏥 Comprehensive Medical Features
- **Sticky Blur Navbar:** Transparent over hero with smooth frosted blur transition upon scroll, active section spy, and mobile drawer.
- **Quick Action Bar:** Find Specialists, Online Booking, 24/7 Emergency ICU dispatch, and Lab Results.
- **8+ Specialized Clinical Departments:** Filterable tabs for Cardiology, Neurosurgery, Orthopedics, Oncology, Pediatrics, Trauma, Diagnostics, and Women's Health.
- **Medical Technology Suite:** Showcasing the Da Vinci Xi Robotic Suite, Magnetom 3.0T MRI, and AI Genomic Sequencing.
- **Distinguished Specialists Grid:** Department faculty with clinical credentials, ratings, and instant booking triggers.
- **Patient Stories Carousel:** Interactive testimonial slider with star ratings, touch/swipe gestures, and automatic slideshow.
- **Structured Health Plans:** Essential Care, Executive Comprehensive (Featured), and Platinum Longevity.
- **Animated FAQ Accordion:** Accessible accordion with animated toggle controls.
- **Interactive Appointment Booking Form:** Complete with live field validation, auto-doctor preselection, and confirmation toast notifications.
- **Emergency & Map Contact Center:** Clear 24/7 emergency hotlines, campus address, and JCI / HIPAA certifications.

---

## 📱 Responsive Breakpoint Architecture

The layout transitions fluidly across four dedicated breakpoint tiers:

| Breakpoint Tier | Viewport Range | Layout Configuration |
|---|---|---|
| **Mobile** | `0px – 480px` | Single-column stacked layout, full-screen slide-down drawer, touch-optimized tap targets, optimized 3D particle count, zero horizontal overflow. |
| **Tablet / Large Mobile** | `481px – 768px` | Adaptive 2-column grids for services, doctors, and stats; tablet-friendly navigation; balanced card spacing. |
| **Laptop / Small Desktop** | `769px – 1279px` | Full desktop navigation with glass transitions, 2-column hero, 2 to 3-column service grid, expanded visual stage. |
| **Large Desktop** | `1280px+` | Premium widescreen composition (max-width 1380px), large hero typography, immersive 3D particle stage, generous luxury whitespace. |

---

## 🛠️ Technology Stack

- **Markup:** HTML5 (Semantic, Accessible, W3C Compliant)
- **Styling:** Vanilla CSS3 (Custom Design System, CSS Variables, Flexbox, CSS Grid)
- **Scripting:** Vanilla JavaScript (ES6+ Modular Architecture)
- **3D Graphics:** [Three.js r128](https://threejs.org/)
- **Animations:** [GSAP 3.12](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Typography:** [Google Fonts](https://fonts.google.com/) (`Plus Jakarta Sans`, `Outfit`)
- **Icons:** [Font Awesome 6 Free](https://fontawesome.com/)
- **Hosting / Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Folder Structure

```text
Hospital-Clinic/
├── index.html            # Main semantic HTML5 single-page application
├── favicon.svg           # Scalable luxury medical SVG favicon
├── vercel.json           # Vercel production routing, clean URLs & security headers
├── README.md             # Project documentation & deployment guide
│
├── css/
│   ├── style.css         # Design system tokens, components, typography & themes
│   └── responsive.css    # Fluid media queries for 4 distinct breakpoint ranges
│
└── js/
    ├── main.js           # Navigation, filters, carousel, FAQ & form validation
    ├── animations.js     # GSAP ScrollTrigger timelines & animated number counters
    └── three-scene.js    # Interactive Three.js 3D medical DNA & particle scene
```

---

## 🚀 Local Development Setup

No complex Node.js build steps required. The application runs natively in any modern web browser.

### 1. Clone the repository
```bash
git clone https://github.com/RashidAyub/Hospital-Clinic-.git
cd Hospital-Clinic
```

### 2. Run with a local live server

Using **VS Code Live Server**:
- Open the folder in VS Code, right-click `index.html` and click **"Open with Live Server"**.

Using **Python 3**:
```bash
# Start local HTTP server on port 8000
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

Using **Node.js (npx serve)**:
```bash
npx serve .
```

---

## ☁️ Vercel Deployment Instructions

Deploying to Vercel takes less than 1 minute:

### Option 1: Automatic GitHub Integration (Recommended)
1. Log into your [Vercel Dashboard](https://vercel.com/).
2. Click **"Add New Project"** and import the repository `RashidAyub/Hospital-Clinic-`.
3. Keep default settings (Framework Preset: **Other**, Root Directory: `./`).
4. Click **"Deploy"**. Vercel will automatically read `vercel.json` and deploy the site with HTTPS.

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy directly from project root
vercel --prod
```

---

## ♿ Accessibility & Performance

- **ARIA Attributes:** Full `aria-label` and `aria-expanded` attributes on interactive accordions, mobile drawer, and carousels.
- **Keyboard Navigation:** Focus states and semantic button tags throughout.
- **Image Optimization:** High-definition photography with `loading="lazy"` to minimize initial bandwidth.
- **Motion Safety:** Automatic reduction of animations when `prefers-reduced-motion` is active.

---

## 📄 License

This project is licensed under the MIT License — feel free to use and customize it for your healthcare solutions.