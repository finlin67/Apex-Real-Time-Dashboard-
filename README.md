# Apex Real-Time Dashboard (Experiment Engine v2.0)

## 🧠 Context & Creative Strategy
The Apex Dashboard bridges the gap between high-velocity performance data and executive-level clarity. Designed for real-time visualization, it uses mock organic jitter and socket state simulations to demonstrate how a live marketing environment behaves under active optimization.

## 🎯 Purpose & Value Proposition
Provides growth teams with a high-fidelity "at-a-glance" command center. By visualizing momentum rather than just static numbers, it drives faster decision-making for multi-channel demand generation campaigns.

## 🚀 Ideal Use Cases
- **Marketing Command Centers:** Monitoring active A/B tests in real-time.
- **Executive Reporting:** High-impact visual summaries for weekly stakeholder syncs.
- **Analytic Demos:** Demonstrating advanced platform capabilities with live-simulated data.

## 👤 Target Audience
- **Growth Engineers:** Monitoring experiment stability and velocity.
- **Marketing VPs:** Requiring high-level summaries of ROI and CPL efficiency.
- **Product Managers:** Visualizing feature-flag impact on conversion lift.

## 🎨 Design Philosophy
- **Glassmorphism:** Subtle blurs and semi-transparent layers for a premium, modern feel.
- **Industrial Contrast:** A dark charcoal base paired with neon cyan and purple accents.
- **Tactile Motion:** Spring physics and array-based keyframes ensure animations feel organic and responsive.

## 🛠️ Tech Stack
- **Framework:** React 18 / 19 (Strict mode enabled)
- **Animation:** Framer Motion (v12+ syntax)
- **Styling:** Tailwind CSS (extended custom theme)
- **Icons:** Lucide React

## ⚙️ Usage
- **React Component:** Import `DemandGenMarketing` from `DemandGen-Marketing.tsx`.
- **Stand-alone Build:** Open `DemandGen-Marketing.html` in any modern browser.
- **Gallery Integration:** Root container is strictly 1:1 aspect ratio for grid compatibility.

## 🌈 Color Palette
| Token | Hex Code | Role |
| :--- | :--- | :--- |
| **Charcoal** | `#0f171a` | Base Background |
| **Primary** | `#20bfdf` | Growth Metrics & Strategy |
| **Accent** | `#9333ea` | Efficiency & Secondary Stats |
| **Success** | `#0bda54` | Live Socket Status |

## ✨ Key Features
- **Socket Simulation:** Mimics active connection states (Connected, Reconnecting, Connecting).
- **Interactive Sparklines:** Hover-to-zoom bars with real-time peak detail tooltips.
- **Radial Efficiency Ring:** SVG-based gauge ring for acquisition health.
- **Winning Strategy HUD:** Summarizes qualitative insights alongside numeric data.
- **Organic Jitter:** Randomized update cycles that mimic real-world network fluctuations.

## 📂 Project Structure
- `index.html`: Entry point configuration with Tailwind CSS and ES Module import maps.
- `index.tsx`: React application root where the main dashboard component is rendered.
- `DemandGen-Marketing.tsx`: The core business logic and UI for the real-time simulation dashboard.
- `metadata.json`: Contains application descriptive metadata and security/frame permissions.
- `README.md`: Full documentation of the project's strategy, technical stack, and architecture.