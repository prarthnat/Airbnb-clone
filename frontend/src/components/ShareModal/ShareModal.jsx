import { useEffect, useState } from 'react';
import styles from './ShareModal.module.css';

export default function ShareModal({ listing, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const previewPhoto = listing?.photos?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=120&q=80';

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close share modal"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 6 20 20M26 6 6 26" />
            </svg>
          </button>
          <h2 id="share-modal-title" className={styles.headerTitle}>Share this experience</h2>
        </header>

        <div className={styles.body}>
          <div className={styles.listingPreview}>
            <img src={previewPhoto} alt="" className={styles.previewImage} loading="lazy" />
            <div className={styles.previewText}>
              <span className={styles.previewTitle}>{listing?.title || 'Listing'}</span>
              <span className={styles.previewSubtitle}>{listing?.subtitle || 'Entire place'}</span>
            </div>
          </div>

          <div className={styles.shareGrid}>
            <button className={styles.shareOption} onClick={handleCopyLink} aria-label="Copy link">
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 8h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-6" />
                  <path d="M18 16 4 30M4 16h14v14" />
                </svg>
              </span>
              <span>{copied ? 'Link copied!' : 'Copy Link'}</span>
            </button>

            <button
              className={styles.shareOption}
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`, '_blank')}
              aria-label="Share via WhatsApp"
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 3C8.82 3 3 8.82 3 16c0 2.38.65 4.61 1.78 6.52L3 29l6.68-1.74A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" />
                </svg>
              </span>
              <span>WhatsApp</span>
            </button>

            <button
              className={styles.shareOption}
              onClick={() => window.open(`mailto:?subject=${encodeURIComponent(listing?.title || 'Check out this stay')}&body=${encodeURIComponent(window.location.href)}`)}
              aria-label="Share via Email"
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="6" width="26" height="20" rx="3" />
                  <path d="m4 8 12 9 12-9" />
                </svg>
              </span>
              <span>Email</span>
            </button>

            <button
              className={styles.shareOption}
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              aria-label="Share via X"
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l24 24M28 4L4 28" />
                </svg>
              </span>
              <span>X</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
