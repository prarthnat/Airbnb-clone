const express = require('express');
const { host } = require('../data/seed');

const router = express.Router();

/**
 * GET /api/host/:id
 * Returns host profile information.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (id !== host.id) {
    return res.status(404).json({ success: false, error: `Host '${id}' not found` });
  }

  return res.json({
    success: true,
    data: host,
  });
});

module.exports = router;
