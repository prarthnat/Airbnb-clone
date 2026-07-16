import { useState } from 'react';
import styles from './Reviews.module.css';

// ─── Review filter chips (matching reference exactly) ─────────────────────────
const FILTER_CHIPS = [
  { label: 'Comfort', count: 6, emoji: '🛋️' },
  { label: 'Accuracy', count: 5, emoji: '✅' },
  { label: 'Hot tub', count: 5, emoji: '🛁' },
  { label: 'Condition', count: 4, emoji: '📅' },
  { label: 'Hospitality', count: 8, emoji: '🎁' },
  { label: 'Cleanliness', count: 4, emoji: '🧹' },
  { label: 'Amenities', count: 2, emoji: '🏠' },
  { label: 'Photos', count: null, emoji: '🖼️' },
];

// ─── Category icons matching reference ───────────────────────────────────────
const CATEGORY_ICONS = {
  Cleanliness: (
    <img src="/reference/cleanliness-icon.png" alt="" width="30" height="30" className={styles.containIcon} aria-hidden="true" />
  ),
  Accuracy: (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="16" cy="16" r="13"/>
      <path d="M10 16l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Check-in': (
    <img src="/reference/checkin-icon.png" alt="" width="30" height="30" className={styles.containIcon} aria-hidden="true" />
  ),
  Communication: (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M28 8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v11a4 4 0 0 0 4 4h6l5 5v-5h5a4 4 0 0 0 4-4V8z" strokeLinejoin="round"/>
    </svg>
  ),
  Location: (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M4 7l8-3 8 3 8-3v21l-8 3-8-3-8 3V7z" strokeLinejoin="round"/>
      <path d="M12 4v21M20 7v21" strokeLinecap="round"/>
    </svg>
  ),
  Value: (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 5h12l10 10-12 12L5 17V5z" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
};

function Laurel({ side }) {
  const src = side === 'left' ? '/laurel-left.png' : '/laurel-right.png';
  return (
    <img
      src={src}
      className={`${styles.laurel} ${side === 'right' ? styles.laurelRight : ''}`}
      alt=""
      aria-hidden="true"
    />
  );
}

// ─── Time ago helper ─────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / (7 * 86400000));
  const months = Math.floor(diff / (30 * 86400000));
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  if (months < 12) {
    // Show month name and year for older reviews
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }
  return `${months} month${months !== 1 ? 's' : ''} ago`;
}

// ─── Author tenure helper ─────────────────────────────────────────────────────
function getTenure(review) {
  if (review.yearsOnAirbnb) {
    return `${review.yearsOnAirbnb} year${review.yearsOnAirbnb !== 1 ? 's' : ''} on Airbnb`;
  }
  if (review.monthsOnAirbnb) {
    return `${review.monthsOnAirbnb} month${review.monthsOnAirbnb !== 1 ? 's' : ''} on Airbnb`;
  }
  return '2 months on Airbnb';
}

// ─── Single star icon ─────────────────────────────────────────────────────────
const Star = ({ filled }) => (
  <svg viewBox="0 0 32 32" width="12" height="12"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={filled ? 0 : 2} aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.123-8.885a1 1 0 0 0-1.818 0z" />
  </svg>
);

// ─── Avatar component (handles both image and initial) ────────────────────────
function ReviewAvatar({ review }) {
  if (review.initial) {
    return (
      <div
        className={styles.avatarInitial}
        style={{ background: review.initialColor || '#b0c4d8' }}
        aria-hidden="true"
      >
        {review.initial}
      </div>
    );
  }
  if (review.avatar) {
    return (
      <img
        src={review.avatar}
        alt={`${review.author}'s profile photo`}
        className={styles.avatar}
        loading="lazy"
      />
    );
  }
  // Fallback: generate initial from author name
  const initial = review.author?.[0]?.toUpperCase() || '?';
  return (
    <div className={`${styles.avatarInitial} ${styles.defaultAvatarBg}`} aria-hidden="true">
      {initial}
    </div>
  );
}

// ─── Overall rating histogram bar ─────────────────────────────────────────────
function HistogramBar({ star, pct }) {
  return (
    <div className={styles.histRow}>
      <span className={styles.histStar}>{star}</span>
      <div className={styles.histTrack} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${star} stars`}>
        <div className={styles.histFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Category score card ──────────────────────────────────────────────────────
function CategoryScore({ label, value }) {
  return (
    <div className={styles.catScore}>
      <div className={styles.catTop}>
        <span className={styles.catLabel}>{label}</span>
        <span className={styles.catValue}>{value.toFixed(1)}</span>
      </div>
      <div className={styles.catIcon}>
        {CATEGORY_ICONS[label] || CATEGORY_ICONS.Accuracy}
      </div>
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const SHORT = 200;
  const isLong = review.text.length > SHORT;
  const displayText = expanded ? review.text : review.text.slice(0, SHORT);

  return (
    <article className={styles.card} aria-label={`Review by ${review.author}`}>
      <header className={styles.cardHeader}>
        <ReviewAvatar review={review} />
        <div className={styles.authorInfo}>
          <p className={styles.authorName}>{review.author}</p>
          <p className={styles.authorMeta}>{getTenure(review)}</p>
        </div>
      </header>
      <div className={styles.cardMeta}>
        <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>
              <Star filled={i < review.rating} />
            </span>
          ))}
        </div>
        <span className={styles.dot} aria-hidden="true">·</span>
        <span className={styles.timeAgo}>{timeAgo(review.date)}</span>
      </div>
      <p className={styles.text}>
        {displayText}{!expanded && isLong && '…'}
      </p>
      {isLong && (
        <button
          className={styles.showMore}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </article>
  );
}

// ─── Main Reviews Component ───────────────────────────────────────────────────
export default function Reviews({ reviews = [], listing }) {
  const [activeChip, setActiveChip] = useState(null);

  if (!reviews.length || !listing) return null;

  const { rating, reviewCount } = listing;

  const ratingCategories = [
    { label: 'Cleanliness', value: 5.0 },
    { label: 'Accuracy', value: 5.0 },
    { label: 'Check-in', value: 5.0 },
    { label: 'Communication', value: 5.0 },
    { label: 'Location', value: 4.8 },
    { label: 'Value', value: 4.8 },
  ];

  // Histogram distribution (mostly 5-star)
  const histogram = [
    { star: 5, pct: 94 },
    { star: 4, pct: 4 },
    { star: 3, pct: 1 },
    { star: 2, pct: 0.5 },
    { star: 1, pct: 0.5 },
  ];

  return (
    <section id="reviews" className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.reviewHero}>
        <div className={styles.bigRating} aria-label={`${rating} out of 5`}>
          <Laurel side="left" />
          <h2 id="reviews-heading">{rating}</h2>
          <Laurel side="right" />
        </div>
        <p className={styles.guestFavTitle}>Guest favourite</p>
        <p className={styles.guestFavCopy}>
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button type="button" className={styles.howReviews}>How reviews work</button>
      </div>

      {/* ── Overall rating + Category scores row ───────────────────────── */}
      <div className={styles.statsRow}>
        {/* Histogram */}
        <div className={styles.histogram}>
          <p className={styles.histTitle}>Overall rating</p>
          {histogram.map(({ star, pct }) => (
            <HistogramBar key={star} star={star} pct={pct} />
          ))}
        </div>

        {/* Category scores */}
        <div className={styles.catGrid}>
          {ratingCategories.map((cat) => (
            <CategoryScore key={cat.label} label={cat.label} value={cat.value} />
          ))}
        </div>
      </div>

      <div className={styles.chips} aria-label="Review highlights">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className={`${styles.chip} ${activeChip === chip.label ? styles.chipActive : ''}`}
            onClick={() => setActiveChip(activeChip === chip.label ? null : chip.label)}
          >
            <span aria-hidden="true">{chip.emoji}</span>
            <span>{chip.label}</span>
            {chip.count !== null && <span className={styles.chipCount}>{chip.count}</span>}
          </button>
        ))}
      </div>

      {/* ── Review Cards ──────────────────────────────────────────────────── */}
      <div className={styles.cards}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* ── Show All Reviews Button ───────────────────────────────────────── */}
      <button
        className={styles.showAllReviews}
        aria-label={`Show all ${reviewCount} reviews`}
      >
        Show all {reviewCount} reviews
      </button>

      <div className={styles.divider} />
    </section>
  );
}