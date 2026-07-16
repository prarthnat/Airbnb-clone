const express = require('express');
const { listing } = require('../data/seed');

const router = express.Router();

/**
 * GET /api/listing/:id
 * Returns full listing data (without photos embedded).
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (id !== listing.id) {
    return res.status(404).json({ success: false, error: `Listing '${id}' not found` });
  }

  // Return full listing (photos array is included)
  return res.json({
    success: true,
    data: listing,
  });
});

/**
 * GET /api/listing/:id/photos
 * Returns all photos for a listing, optionally filtered by category.
 * Query params:
 *   ?category=<string>   Filter by photo category
 *   ?featured=true       Return only featured (hero) photos
 */
router.get('/:id/photos', (req, res) => {
  const { id } = req.params;
  const { category, featured } = req.query;

  if (id !== listing.id) {
    return res.status(404).json({ success: false, error: `Listing '${id}' not found` });
  }

  let photos = [...listing.photos];

  if (category) {
    photos = photos.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featured === 'true') {
    photos = photos.filter((p) => p.featured === true);
  }

  const categories = [...new Set(listing.photos.map((p) => p.category))];

  return res.json({
    success: true,
    total: photos.length,
    categories,
    data: photos,
  });
});

module.exports = router;
