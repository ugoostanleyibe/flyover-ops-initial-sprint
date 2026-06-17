# Flyover Ops — Day 1 & Day 2 Deliverables
## Full-Stack Engineer Cockpit
**Prepared by:** Stanley Ibe  
**Current Date:** June 16, 2026

Welcome to the **Flyover Ops MVP Design & Spacing Cockpit**. This repository contains the interactive deliverables for Day 1 and Day 2 of the 12-day MVP Sprint, created to align, map, and architect the frontend structural interfaces before the implementation phase on Day 3.

---

## 🚀 Overview of Deliverables

### Day 1: UI/UX Layout Mapping & Structural Sketches
1. **Platform User Journeys (Interactive Flowcharts):** 
   Detailed operational paths mapping how different actors move through the Flyover Ops ecosystem:
   * **African Remote Workers:** Discovery ➔ Role-specific Registration ➔ Admin Verification ➔ Dashboard Login ➔ Training modules ➔ Gig completions ➔ Earnings log.
   * **Diaspora Partners:** Discovery ➔ KYC business document uploads ➔ Project post submission ➔ Remote team monitoring ➔ Commission auditing.
   * **Company Clients:** Landing ➔ Corporate profile signup ➔ Custom talent requests ➔ Active team trackers.
   * **Platform Admins:** Registrations approvals manager ➔ Project matching control ➔ Task audit queue ➔ Financial ledgers.
2. **High-Level Structural Layout Flow Vectors:**
   Overlay mapping indicating primary focus shifts, trigger points, and API destinations.

### Day 2: Wireframe Framework & Interface Spacing Architecture
1. **Low-Fidelity Wireframes (7 Key Application Pages):**
   Structural blueprints representing:
   * **Homepage:** Hero area, multi-persona Call-To-Actions, services breakdown grid, client advantages, and footers.
   * **Login Page:** Centered secure authentication box, password recovery flows, and router links.
   * **Registration Page:** Dynamic role-based signups changing form inputs based on Worker, Diaspora Partner, or Company Client selections.
   * **Worker Dashboard:** Layout for managing personal profile, training modules, task lists, CV uploads, and earnings.
   * **Diaspora Dashboard:** Form to dispatch projects, monitors for active execution progress, and commission charts.
   * **Company Dashboard:** Forms to request talent profiles and tables to monitor assigned remote worker statistics.
   * **Admin Dashboard:** Central command with platform-wide stats counters and rows for reviewing pending signups.
2. **Interface Spacing Architectures (8px Grid Standard):**
   Precise pixel mappings specifying layout grid structures, containers, margins, paddings, and flex/grid gaps.

---

## 🛠️ How to Run & Explore the Cockpit

The cockpit is built using a lightweight, premium tech stack of **Semantic HTML5, Vanilla CSS3, and Javascript (ES6)**. It runs entirely in the browser with zero external dependencies.

### Option A: Local Browser Launch
Simply double-click the index.html file or open it in any modern browser

### Option B: Hosted Site On Vercel (Recommended)
Simply visit https://flyover-ops-initial-sprint.vercel.app to take a look

### Option C: Local Web Server
If you want, you can also run a local dev server using Node (such as Live Server)

---

## 🎛️ Interactive Controls Guide

Inside the cockpit UI, you will find a floating **Controls Bar** allowing you to review the specifications:
1. **View Mode Toggles:** 
   * **Visual Mockup:** Renders the page using rich aesthetics, modern gradients, glassmorphism, and dark-mode styling.
   * **Low-Fi Wireframe:** Strips away visual styling, replacing elements with structural outline blocks, X-placeholders, and gray labels to review structural integrity.
2. **Architectural Overlays:**
   * **12-Col Grid:** Displays a semi-transparent red grid showing how components snap to the 12-column standard (1140px viewport, 24px gutters).
   * **Spacing & Margins:** Lights up margin blocks in **neon orange** (`spacer-v`/`spacer-h`) and padding blocks in **neon green**, indicating their exact pixel dimensions (e.g., `8px`, `16px`, `24px`, `32px`, `48px`, `64px`).
   * **Flow Vectors:** Draws animated dashed arrow paths indicating user mouse-flows, API triggers, and database routing vectors (e.g. login action routing ➔ dashboard nodes).
3. **Draggable Sidebars (Resizable Widths):**
   * Hover over the vertical borders separating the sidebar or the inspector panel from the main canvas.
   * Drag the handles left or right to dynamically resize their widths (sidebar range: 180px–400px, inspector range: 220px–450px).
4. **Responsive Layouts (Tablet & Mobile Toggles):**
   * On screens below 1200px (tablet), the inspector collapses into a right slide-in overlay drawer triggered by an info `ℹ️` button in the header.
   * On screens below 900px (mobile), the sidebar collapses into a left slide-in drawer triggered by a menu `☰` button in the header.
   * Grid elements, stats layout boxes, and list items collapse into a single-column layout for optimized readability on smaller screens.

---

## 📁 Repository Structure
* **index.html:** The entry point containing the main workspace structure and static assets.
* **styles.css:** Design system definitions, visual classes, wireframe-mode overrides, and spacer animations.
* **app.js:** Interactive routers, dynamic templates for the 7 pages, flow mapping drawers, and inspector bindings.
