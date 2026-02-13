# Apex Real-Time Dashboard

## Description
The Apex Real-Time Dashboard is a high-fidelity, data-driven UI component designed to visualize critical demand generation metrics. It features a sophisticated glassmorphism aesthetic ("glass-morphism") with organic, self-updating data simulations that mimic live WebSocket connections. The dashboard displays key performance indicators such as Growth ROI, Total Leads, and CPL Reduction using animated sparklines, radial gauges, and progress bars. It is engineered as a single-file React component, making it instantly portable for Next.js or Vite landing pages.

## Tech Stack
*   **Core:** React 19
*   **Styling:** Tailwind CSS (Configured with custom color extension)
*   **Animation:** Framer Motion (Complex layout transitions and SVG animations)
*   **Icons:** Lucide React

## Usage
### Standalone
Simply open `index.html` in a browser to view the component in its isolated environment.

### Integration (Next.js / Vite)
1.  Copy `DemandGen-Marketing.tsx` into your project's components directory.
2.  Install the required dependencies:
    ```bash
    npm install framer-motion lucide-react clsx tailwind-merge
    ```
3.  Import the component into your page or layout:
    ```tsx
    import DemandGenMarketing from './components/DemandGen-Marketing';

    export default function Page() {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#0f171a]">
          <DemandGenMarketing />
        </main>
      )
    }
    ```
4.  Ensure your Tailwind configuration matches the custom colors below if not using the provided inline script.

## Color Palette
The application uses a specific dark-mode palette optimized for high contrast and data readability:

| Color Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Charcoal** | `#0f171a` | Main background and card base |
| **Primary** | `#20bfdf` | Primary data points, sparklines, branding |
| **Accent** | `#9333ea` | Secondary metrics, gradients |
| **Surface** | `rgba(26, 38, 41, 0.75)` | Glassmorphism card background |
| **Success** | `#0bda54` | Status indicators (Live Scaling) |

## App Name
**Apex Real-Time Dashboard** (Experiment Engine v2.0)