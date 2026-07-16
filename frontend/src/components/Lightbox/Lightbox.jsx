import { useRef, useEffect, useCallback, useState } from 'react';
import styles from './Lightbox.module.css';
import { useKeyboard, useFocusTrap } from '../../hooks/useKeyboard';

/**
 * Lightbox — Single-photo viewer with prev/next navigation.
 * Opened from the Photo Tour.
 * Keyboard: ← → to navigate, Escape to close.
 */
export default function Lightbox({ photos = [], currentIndex, isOpen, onClose, onNavigate }) {
  const containerRef = useRef(null);
  const [direction, setDirection] = useState(null); // 'left' | 'right'
  const [animating, setAnimating] = useState(false);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;
  const currentPhoto = photos[currentIndex];

  const navigate = useCallback((dir) => {
    if (animating) return;
    const newIndex = dir === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= photos.length) return;

    setDirection(dir === 'prev' ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      onNavigate?.(newIndex);
      setAnimating(false);
      setDirection(null);
    }, 200);
  }, [animating, currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useKeyboard(
    {
      ArrowLeft: () => navigate('prev'),
      ArrowRight: () => navigate('next'),
      Escape: onClose,
    },
    isOpen
  );

  // Focus trap
  useFocusTrap(containerRef, isOpen);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  if (!isOpen || !currentPhoto) return null;

  const animClass = direction ? (direction === 'left' ? styles.slideOutLeft : styles.slideOutRight) : '';

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${photos.length}: ${currentPhoto.caption}`}
      ref={containerRef}
    >
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg viewBox="0 0 32 32" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M25.333 8.549 23.451 6.667 16 14.118 8.549 6.667 6.667 8.549 14.118 16l-7.451 7.451 1.882 1.882L16 17.882l7.451 7.451 1.882-1.882L17.882 16z" />
          </svg>
        </button>

        {/* Counter */}
        <div className={styles.counter} aria-live="polite" aria-atomic="true">
          <span className={styles.counterCurrent}>{currentIndex + 1}</span>
          <span className={styles.counterSep}>/</span>
          <span className={styles.counterTotal}>{photos.length}</span>
        </div>

        {/* Share / Save */}
        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Share this photo">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <circle cx="24" cy="6" r="3" />
              <circle cx="8" cy="16" r="3" />
              <circle cx="24" cy="26" r="3" />
              <path d="M10.8 14.6l10.4-5.2M10.8 17.4l10.4 5.2" />
            </svg>
            Share
          </button>
          <button className={styles.actionBtn} aria-label="Save photo">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M16 28s-14-9.054-14-18a8 8 0 0 1 14-5.292A8 8 0 0 1 30 10c0 8.946-14 18-14 18z" />
            </svg>
            Save
          </button>
        </div>
      </div>

      {/* Main photo area */}
      <div className={styles.main}>
        {/* Prev button */}
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => navigate('prev')}
          disabled={!hasPrev}
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            width="18" height="18" aria-hidden="true">
            <path d="M20 6L10 16l10 10" />
          </svg>
        </button>

        {/* Photo */}
        <div className={styles.imageWrapper}>
          <img
            key={currentIndex}
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className={`${styles.image} ${animClass}`}
            loading="eager"
          />
        </div>

        {/* Next button */}
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => navigate('next')}
          disabled={!hasNext}
          aria-label="Next photo"
        >
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            width="18" height="18" aria-hidden="true">
            <path d="M12 6l10 10-10 10" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      <div className={styles.footer}>
        <p className={styles.caption}>{currentPhoto.caption}</p>
        <p className={styles.category}>{currentPhoto.category}</p>
      </div>

      {/* Keyboard hint */}
      <div className={styles.keyboardHint} aria-hidden="true">
        <kbd>←</kbd> <kbd>→</kbd> Navigate &nbsp;&nbsp; <kbd>Esc</kbd> Close
      </div>
    </div>
  );
}
