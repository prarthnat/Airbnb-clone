import { useEffect } from 'react';
import styles from './SaveModal.module.css';

export default function SaveModal({ listing, onClose, onSave }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const thumbPhoto = listing?.photos?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=120&q=80';

  const handleSelectWishlist = () => {
    onSave();
    onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close save modal"
          >
            <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 6 20 20M26 6 6 26" />
            </svg>
          </button>
          <h2 id="save-modal-title" className={styles.headerTitle}>Save to wishlist</h2>
        </header>

        <div className={styles.body}>
          <div className={styles.wishlistCard} onClick={handleSelectWishlist}>
            <div className={styles.wishlistLeft}>
              <img src={thumbPhoto} alt="" className={styles.wishlistThumb} loading="lazy" />
              <div className={styles.wishlistInfo}>
                <span className={styles.wishlistTitle}>Goa Stays</span>
                <span className={styles.wishlistSubtitle}>Saved places</span>
              </div>
            </div>
            <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
              <path d="M16 28s-14-9.054-14-18a8 8 0 0 1 14-5.292A8 8 0 0 1 30 10c0 8.946-14 18-14 18z" />
            </svg>
          </div>

          <button className={styles.createWishlistBtn} onClick={handleSelectWishlist}>
            Create new wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
