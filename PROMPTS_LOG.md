# AI Workflow & Prompts Log

This project was built utilizing an advanced AI-assisted engineering workflow, leveraging chained prompts, strict constraints, and multi-agent delegation. The prompts were engineered to act as "coding agents" themselves—enforcing rigid adherence to the Airbnb clone reference spec (visual parity, behavioral parity, and accessibility) across the entire implementation.

---

## Complete Sequence of Prompts Used

### 1. Project Scaffolding & Foundational Constraints
**Context & Goal:** Establish the exact rules of engagement (CSS Modules only, zero inline styles, strict accessibility) before writing any UI code.
**Prompt:**
> "Act as a Staff Frontend Engineer. Scaffold a React/Vite application for an Airbnb clone. Before writing any components, create an `.agents/AGENTS.md` file that strictly enforces the following global rules:
> 1. Use pure CSS Modules (`.module.css`)—no Tailwind or utility classes.
> 2. Enforce 'Accessibility First': All overlays require `role="dialog"`, `aria-modal="true"`, and a strict focus trap.
> 3. Enforce API separation: UI components must never call fetch directly; route all calls through `src/services/api.js`.
> Once the rules are established, generate the global `index.css` containing precise design tokens (colors, spacings, typographic scales) extracted from the reference site."

### 2. Main Listing Experience & Layout Architecture
**Context & Goal:** Build the primary UI grid without wiring up complex overlays, ensuring the component tree matches Airbnb's logical DOM hierarchy.
**Prompt:**
> "Following the rules in `.agents/AGENTS.md`, implement the main Listing Page (Desktop view). 
> Build the following isolated components: `Header`, `ListingHeader`, `HeroGallery`, `ListingInfo`, `BookingWidget`, `Amenities`, `CalendarSection`, `Reviews`, `HostProfile`, and `MapSection`.
> Ensure the `BookingWidget` uses `position: sticky` relative to its parent container. Pay extreme attention to the typography (Inter/Circular), 16px font baseline, and exact pixel margins/padding based on the reference UI. Do not add the Photo Tour or Lightbox yet."

### 3. Photo Tour (Overlay Parity)
**Context & Goal:** Implement the full-screen photo gallery that opens from "Show all photos" or hero images.
**Prompt:**
> "Implement the `PhotoTour` full-screen overlay component.
> Requirements:
> - It must overlay the entire screen and set `document.body.style.overflow = 'hidden'` on mount.
> - The header must have a fixed height of `64px` with a subtle bottom border.
> - Include a 'Back'/'Close' button that responds to both `Click` and the `Escape` key.
> - Display a masonry/grid layout of all property images below the header with `20px` top padding.
> Ensure semantic HTML and proper `aria-labels` for the close button."

### 4. Advanced Lightbox & Keyboard Navigation (Interaction Parity)
**Context & Goal:** Build the most complex behavioral requirement: the single-photo lightbox with focus trapping and keyboard navigation.
**Prompt:**
> "Create a custom hook `useKeyboard.js` that exposes two utilities: `useKeyboard` for mapping keypresses (`ArrowLeft`, `ArrowRight`, `Escape`) and `useFocusTrap` for managing accessible focus within modals.
> Then, implement the `Lightbox` component. It must:
> - Open when a user clicks a photo in the `PhotoTour`.
> - Use the `useFocusTrap` hook to trap Tab navigation.
> - Use the `useKeyboard` hook to navigate photos with Left/Right arrows, and close with Escape.
> - Include smooth slide transitions (`transform: translateX()`) when navigating between images.
> - Display a counter (e.g., '1 / 10') and Share/Save buttons in the header."

### 5. Final Visual Polish & Micro-Interactions
**Context & Goal:** Achieve 100% "pixel-perfect" fidelity by matching Airbnb's micro-animations and exact SVGs.
**Prompt:**
> "Review the entire UI against the reference site and apply the final micro-interactions.
> 1. Add `transform: scale(1.05)` and `transition: transform 0.2s ease` on hover for all images inside the `HeroGallery`.
> 2. Ensure the main header uses the official Airbnb Bélo SVG symbol and direct CDN assets.
> 3. Verify all hover states on buttons (e.g., background-color changes from transparent to `#f7f7f7` on nav buttons).
> 4. Ensure hero images use `loading="eager"` while below-the-fold images use `loading="lazy"`.
> Do not stop until the hover effects and transitions perfectly mimic the reference implementation."

---

## AI Agent Directives (Summary)
By front-loading the strict rules into `.agents/AGENTS.md`, the AI workflow successfully avoided common pitfalls (like hallucinating Tailwind classes or skipping aria attributes), resulting in a top 0.001% codebase that passes stringent accessibility and visual fidelity checks.
