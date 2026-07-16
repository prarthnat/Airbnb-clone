import { useState, useEffect } from 'react';
import styles from './ListingHeader.module.css';

export default function ListingHeader({ listing }) {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastActive, setToastActive] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setToastActive(true);
    const timer = setTimeout(() => {
      setToastActive(false);
      const clearTimer = setTimeout(() => setToast(null), 250);
      return () => clearTimeout(clearTimer);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message) => {
    setToast({ id: Date.now(), message });
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Share options'))
      .catch(() => showToast('Share options'));
  };

  const handleSaveClick = () => {
    const nextSaved = !saved;
    setSaved(nextSaved);
    showToast(nextSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  if (!listing) return null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{listing.title}</h1>
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={handleShareClick}
          aria-label="Share this listing"
        >
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"
            width="16" height="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23M6 13l10-10 10 10" />
          </svg>
          Share
        </button>
        <button
          className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
          onClick={handleSaveClick}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={saved}
        >
          <svg
            viewBox="0 0 32 32"
            fill={saved ? 'var(--color-primary)' : 'none'}
            stroke={saved ? 'var(--color-primary)' : 'currentColor'}
            strokeWidth="2.5"
            width="16" height="16"
            aria-hidden="true"
          >
            <path d="M16 28s-14-9.054-14-18a8 8 0 0 1 14-5.292A8 8 0 0 1 30 10c0 8.946-14 18-14 18z" />
          </svg>
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {toast && (
        <div className={`${styles.toast} ${toastActive ? styles.toastActive : ''}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  );
}
