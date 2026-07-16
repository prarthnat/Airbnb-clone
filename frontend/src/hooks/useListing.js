import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * useListing — Fetches full listing data from the backend
 */
export function useListing(id = 'villa-azure-1') {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.getListing(id)
      .then(({ data }) => { if (!cancelled) { setListing(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [id]);

  return { listing, loading, error };
}

/**
 * useReviews — Fetches paginated reviews
 */
export function useReviews(listingId = 'villa-azure-1', params = {}) {
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.getReviews(listingId, JSON.parse(paramsKey))
      .then(({ data, meta }) => {
        if (!cancelled) { setReviews(data); setMeta(meta); setLoading(false); }
      })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [listingId, paramsKey]);

  return { reviews, meta, loading, error };
}

/**
 * useHost — Fetches host profile
 */
export function useHost(id = 'host-sophia-1') {
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.getHost(id)
      .then(({ data }) => { if (!cancelled) { setHost(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [id]);

  return { host, loading, error };
}
