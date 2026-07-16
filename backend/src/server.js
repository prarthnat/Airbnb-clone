require('dotenv').config();
const express = require('express');
const cors = require('cors');

const listingRoutes = require('./routes/listing');
const reviewsRoutes = require('./routes/reviews');
const hostRoutes = require('./routes/host');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ──────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/listing', listingRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/host', hostRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'airbnb-clone-backend',
    version: '1.0.0',
  });
});

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Airbnb Clone API',
    endpoints: {
      health: 'GET /health',
      listing: 'GET /api/listing/:id',
      listingPhotos: 'GET /api/listing/:id/photos',
      reviews: 'GET /api/reviews/:listingId',
      host: 'GET /api/host/:id',
    },
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Airbnb Clone API running at http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
