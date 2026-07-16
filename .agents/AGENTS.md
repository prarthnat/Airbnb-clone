# Airbnb Clone — Agent Rules
# These rules govern AI-assisted development for this project.

## Code Quality Rules

1. **Component Isolation**: Each component lives in its own folder with a `.jsx` file and a `.module.css` file. No inline styles.

2. **Accessibility First**: Every interactive element must have an `aria-label` or `aria-labelledby`. Overlays must include `role="dialog"` and `aria-modal="true"`. Focus traps must be implemented for all modal overlays.

3. **CSS Modules Only**: Never use Tailwind, styled-components, or inline styles. All styles go in `*.module.css` files co-located with the component.

4. **API Layer Separation**: Components never call `fetch` directly. All API calls go through `src/services/api.js`.

5. **Hook-Based Data Fetching**: Data fetching logic lives in `src/hooks/`. Components are purely presentational.

6. **Keyboard Navigation**: All overlays (PhotoTour, Lightbox, modals) must support Escape to close. The Lightbox must support ← → for navigation.

7. **Error Boundaries**: Handle loading and error states for all async data.

8. **Image Optimization**: Always add `loading="lazy"` to non-critical images. Hero images use `loading="eager"`.

9. **No Magic Numbers**: Colors, spacings, and font sizes come from CSS custom properties defined in `index.css`.

10. **Semantic HTML**: Use appropriate HTML5 semantic elements (`<header>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<nav>`, `<footer>`).

## File Naming Conventions

- Components: `PascalCase` (e.g., `BookingWidget.jsx`)
- CSS Modules: `PascalCase.module.css`
- Hooks: `useCamelCase.js`
- Services: `camelCase.js`

## Backend Rules

1. All routes follow RESTful conventions
2. All responses include `success: true` on success
3. All error responses include an `error` string
4. Never hardcode port — use `process.env.PORT`
5. CORS is configured to allow only known origins

## Git Rules

1. Never commit `.env` files
2. Commit messages use conventional format: `feat:`, `fix:`, `style:`, `docs:`
