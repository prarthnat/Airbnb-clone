/**
 * api.js — Frontend API service layer
 * All calls go to the Node.js backend at localhost:3001
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  /** GET /api/listing/:id — Full listing with embedded photos */
  getListing: (id = 'villa-azure-1') => apiFetch(`/api/listing/${id}`),

  /** GET /api/listing/:id/photos — All photos, optionally filtered */
  getPhotos: (id = 'villa-azure-1', params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/api/listing/${id}/photos${qs ? `?${qs}` : ''}`);
  },

  /** GET /api/reviews/:listingId — Paginated reviews */
  getReviews: (listingId = 'villa-azure-1', params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/api/reviews/${listingId}${qs ? `?${qs}` : ''}`);
  },

  /** GET /api/host/:id — Host profile */
  getHost: (id = 'host-sophia-1') => apiFetch(`/api/host/${id}`),

  /** GET /health — Backend health check */
  health: () => apiFetch('/health'),
};
