import { useState } from 'react';
import styles from './NearbyStays.module.css';

const CARDS_PER_PAGE = 5;

const StarIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.123-8.885a1 1 0 0 0-1.818 0z" />
  </svg>
);

function StayCard({ stay, index }) {
  const fallbacks = [
    '/reference/nearby-1.png',
    '/reference/nearby-2.png',
    '/reference/nearby-3.png',
    '/reference/living-room.png',
    '/reference/house.png',
  ];
  const fallbackImg = fallbacks[(index || 0) % fallbacks.length];

  return (
    <article className={styles.card} aria-label={stay.title}>
      <div className={styles.imageWrapper}>
        <img
          src={stay.image}
          alt={stay.title}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallbackApplied) {
              e.currentTarget.dataset.fallbackApplied = 'true';
              e.currentTarget.src = fallbackImg;
            }
          }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{stay.title}</h3>
        </div>
        <p className={styles.priceRow}>
          <span className={styles.price}>₹{stay.price.toLocaleString('en-IN')}</span>
          <span className={styles.ratingInline}>
            <StarIcon />
            {stay.rating.toFixed(2)}
          </span>
        </p>
      </div>
    </article>
  );
}

export default function NearbyStays({ stays = [] }) {
  const [page, setPage] = useState(1);

  if (!stays.length) return null;

  const totalPages = Math.ceil(stays.length / CARDS_PER_PAGE);
  const start = (page - 1) * CARDS_PER_PAGE;
  const visible = stays.slice(start, start + CARDS_PER_PAGE);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className={styles.section} aria-labelledby="nearby-heading">
      <div className={styles.header}>
        <h2 id="nearby-heading" className={styles.heading}>More stays nearby</h2>
        <div className={styles.pagination}>
          <span className={styles.pageLabel} aria-live="polite">
            {page} / {totalPages}
          </span>
          <button
            className={styles.navBtn}
            onClick={goPrev}
            disabled={page === 1}
            aria-label="Previous page of nearby stays"
          >
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              width="14" height="14" aria-hidden="true">
              <path d="M20 6L10 16l10 10" />
            </svg>
          </button>
          <button
            className={styles.navBtn}
            onClick={goNext}
            disabled={page === totalPages}
            aria-label="Next page of nearby stays"
          >
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              width="14" height="14" aria-hidden="true">
              <path d="M12 6l10 10-10 10" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.grid} aria-label="Nearby stays">
        {visible.map((stay, i) => (
          <StayCard key={stay.id} stay={stay} index={start + i} />
        ))}
      </div>
    </section>
  );
}
