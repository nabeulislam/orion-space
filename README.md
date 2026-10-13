# Orion Space — NASA Space Apps Challenge 2026

> **Challenge:** *Be An Earth System Trend Detective!*  
> **Team:** Orion Space (Barisal, Bangladesh)  
> **Repository:** [github.com/nabeulislam/orion-space](https://github.com/nabeulislam/orion-space)

---

## 🚀 Overview

**Orion Space** is an autonomous Earth intelligence platform developed for the NASA Space Apps Challenge 2026. It investigates 25 years of NASA MERRA-2 and satellite observations to solve planetary climate mysteries, featuring:

1. **Modern Web Portal (`app/`)**:
   - Celestial reference UI matching NASA mission standards.
   - **React Bits** text and motion system (`SplitText`, `TrueFocus`, `DecryptedText`, `ShinyText`, `SpotlightCard`).
   - **Lenis** momentum smooth scrolling.
   - **Earth Detective Academy**: STEAM learning mini-games for kids and students (Late-Monsoon Paradox, FIRMS Infrared Hotspot Hunt, Polar Albedo Sim).
   - **Intelligence Dossiers**: Interactive 3D classified case files with statistical proof (Mann-Kendall p=0.00007, Benjamini-Hochberg FDR correction).
   - **Autonomous Telemetry Cockpit**: Natural language query terminal + 25-year climate matrix.

2. **3D Cesium Digital Twin Engine (`orion-space/`)**:
   - Photorealistic 3D Earth globe powered by CesiumJS.
   - Live streaming NASA GIBS cloud reflectance (MODIS / VIIRS).
   - Live NASA FIRMS active wildfire thermal anomaly detection layers.
   - Five sensor presets: Normal, FLIR Thermal, Noir, Night Vision (NVG), Tactical CRT.
   - Voice and conversational autonomous AI Map Agent harness (`Spacebar` toggle).

---

## 📁 Repository Structure

```
orion-space/
├── app/                  # React 19 + Vite + TypeScript Web Portal
│   ├── src/
│   │   ├── pages/        # Route pages: Home, Dossiers, Games, Cockpit, About, Agent
│   │   ├── sections/     # Modular sections: Navbar, Hero, Events, Proshow, Contact
│   │   ├── components/   # Shadcn UI + React Bits (SplitText, TrueFocus, Folder, etc.)
│   │   └── hooks/        # Lenis smooth scroll and interaction hooks
│   ├── public/agent/     # Pre-built 3D Cesium Digital Twin embedded runtime
│   └── tests/            # Playwright end-to-end testing suite
│
└── orion-space/          # Standalone 3D Cesium Digital Twin Source Engine
    ├── src/              # CesiumJS layers, shaders, autonomous agent harness
    ├── tools/            # Cartographic & satellite data processing tools
    └── package.json      # Standalone build scripts
```

---

## 🛠️ Quickstart

### 1. Run the Web Portal (`app`)
```bash
cd app
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run the 3D Cesium Engine (`orion-space`)
```bash
cd orion-space
npm install
npm run dev
```

### 3. Run End-to-End Tests
```bash
cd app
npx playwright test
```

---

## 📜 Scientific Methodology & Data Attribution
- **NASA GSFC GMAO MERRA-2 (T2M)**: 2-meter air temperature reanalysis (2001–2025).
- **NASA EOSDIS GIBS**: Global Imagery Browse Services (MODIS / VIIRS WMTS).
- **NASA FIRMS**: Fire Information for Resource Management System.
- **Statistical Pipeline**: Two-sided Mann-Kendall trend test, Theil-Sen robust slope estimator, and Benjamini-Hochberg False Discovery Rate (FDR) control at \(q = 0.05\).

---

## 👥 Authors
- **Md Mushfiqur Rahim** — Team Lead & Spatial Systems
- **Nabeul Islam** — Frontend Engineering & UI/UX Design
- **Team Orion Space** — Barisal, Bangladesh
