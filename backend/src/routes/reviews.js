const express = require('express');
const { reviews } = require('../data/seed');

const router = express.Router();

/**
 * GET /api/reviews/:listingId
 * Returns reviews for a listing.
 * Query params:
 *   ?page=<number>   Page number (default: 1)
 *   ?limit=<number>  Results per page (default: 6, max: 50)
 *   ?sort=recent|rating  Sort order (default: recent)
 */
router.get('/:listingId', (req, res) => {
  const { listingId } = req.params;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 6));
  const sort = req.query.sort === 'rating' ? 'rating' : 'recent';

  const listingReviews = reviews.filter((r) => r.listingId === listingId);

  if (listingReviews.length === 0) {
    return res.status(404).json({ success: false, error: `No reviews found for listing '${listingId}'` });
  }

  // Sort
  const sorted = [...listingReviews].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating;
    return new Date(b.date) - new Date(a.date); // most recent first
  });

  // Paginate
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginated = sorted.slice(startIndex, startIndex + limit);

  // Aggregate ratings
  const avgRating = (
    listingReviews.reduce((sum, r) => sum + r.rating, 0) / listingReviews.length
  ).toFixed(2);

  return res.json({
    success: true,
    meta: {
      total,
      page,
      limit,
      totalPages,
      sort,
      avgRating: parseFloat(avgRating),
    },
    data: paginated,
  });
});

module.exports = router;
