# Airbnb Listing Clone

A desktop Airbnb listing-page clone for the take-home task. It includes the required **Listing Page**, **Photo Tour**, and **Lightbox** views, using bundled reference assets so the UI is reliable in review.

---

## Quick Start

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
# API running at http://localhost:3001
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

### 3. Open in browser
Visit: [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
airbnb-clone/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── data/             # Mock seed data
│   │   └── server.js         # Express app entry point
│   ├── POSTMAN_GUIDE.txt     # Postman testing instructions
│   └── package.json
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/       # UI components (Header, HeroGallery, etc.)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service layer
│   │   ├── App.jsx           # Root component
│   │   └── index.css         # Global design system
│   └── package.json
│
├── .agents/                  # AI agent configuration
│   └── AGENTS.md             # Agent rules
│
├── ARCHITECTURE.md           # Production architecture notes
├── ARCHITECTURE_DIAGRAM.svg  # Production architecture diagram
├── PROMPTS_LOG.md            # AI prompt/workflow log
└── README.md                 # This file
```

---

## Features

### Three Views
1. **Listing Page** — Full property page with sticky booking widget, amenities, reviews, host profile, and map
2. **Photo Tour** — Full-screen overlay with all photos organized by category (click "Show all photos")
3. **Lightbox** — Single-photo viewer with prev/next navigation (click any Photo Tour image)

### Interactions
- ← → keyboard navigation in the Lightbox
- Escape key closes any overlay
- Animated transitions between photos and hover states
- Sticky booking widget on scroll
- Expandable description text
- Guest count picker
- "Show all amenities" modal
- Hover zoom on hero gallery photos
- Wishlist toggle

### Accessibility
- ARIA roles and labels throughout
- Focus trap in modals
- Keyboard-navigable overlays and controls
- Skip-to-main-content link
- Screen reader announcements for dynamic content

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/listing/:id` | Full listing data |
| GET | `/api/listing/:id/photos` | Photos (filterable by category) |
| GET | `/api/reviews/:listingId` | Paginated reviews |
| GET | `/api/host/:id` | Host profile |

See `backend/POSTMAN_GUIDE.txt` for full testing instructions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS (CSS Modules) |
| Backend | Node.js + Express |
| Data | In-memory (JSON) |
| Fonts | Inter (Google Fonts) |
| Maps | OpenStreetMap (iframe) |
| Images | Bundled task/reference assets |

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [ARCHITECTURE_DIAGRAM.svg](./ARCHITECTURE_DIAGRAM.svg) for the production-scale vacation-rental marketplace architecture.

---

## Testing

### Backend (Postman)
Follow the step-by-step guide in `backend/POSTMAN_GUIDE.txt`.

### cURL Quick Test
```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/listing/villa-azure-1
curl http://localhost:3001/api/reviews/villa-azure-1
curl http://localhost:3001/api/host/host-sophia-1
```
