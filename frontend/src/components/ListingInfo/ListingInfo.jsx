import styles from './ListingInfo.module.css';

const LaurelLeft = () => (
  <svg viewBox="0 0 26 38" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="38" aria-hidden="true">
    <path d="M18.5 3.5C11.4 9.2 7.8 17 8.2 25.5c.2 4.1 1.5 7 3.8 9" strokeLinecap="round" />
    <path d="M13.8 8.7c-4.1-.1-6.9 1.4-8.1 4.5 3.5.5 6.2-.9 8.1-4.5zM10.1 15.1c-4.2.6-6.6 2.7-7.2 6 3.6-.1 6-2.2 7.2-6zM8.8 22.5c-3.8 1.3-5.7 3.7-5.7 7 3.3-.8 5.2-3.1 5.7-7zM10.7 29.4c-2.7 2.1-3.6 4.6-2.8 7.4 2.5-1.5 3.4-4 2.8-7.4z" fill="currentColor" stroke="none" />
  </svg>
);

const LaurelRight = () => (
  <svg viewBox="0 0 26 38" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="38" aria-hidden="true" className={styles.flippedIcon}>
    <path d="M18.5 3.5C11.4 9.2 7.8 17 8.2 25.5c.2 4.1 1.5 7 3.8 9" strokeLinecap="round" />
    <path d="M13.8 8.7c-4.1-.1-6.9 1.4-8.1 4.5 3.5.5 6.2-.9 8.1-4.5zM10.1 15.1c-4.2.6-6.6 2.7-7.2 6 3.6-.1 6-2.2 7.2-6zM8.8 22.5c-3.8 1.3-5.7 3.7-5.7 7 3.3-.8 5.2-3.1 5.7-7zM10.7 29.4c-2.7 2.1-3.6 4.6-2.8 7.4 2.5-1.5 3.4-4 2.8-7.4z" fill="currentColor" stroke="none" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" width="10" height="10" aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.123-8.885a1 1 0 0 0-1.818 0z" />
  </svg>
);

const HIGHLIGHT_ICONS = {
  outdoor: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24">
      <path d="M6 26h20M8 26l1.5-10h13L24 26M10 16l6-8 6 8M13 21h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11h8" strokeLinecap="round" />
    </svg>
  ),
  cool: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24">
      <circle cx="16" cy="16" r="2.4" />
      <path d="M16 4c2.8 3.2 2.8 5.8 0 9-2.8-3.2-2.8-5.8 0-9zM16 19c2.8 3.2 2.8 5.8 0 9-2.8-3.2-2.8-5.8 0-9zM4 16c3.2-2.8 5.8-2.8 9 0-3.2 2.8-5.8 2.8-9 0zM19 16c3.2-2.8 5.8-2.8 9 0-3.2 2.8-5.8 2.8-9 0z" strokeLinejoin="round" />
    </svg>
  ),
  checkin: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" width="24" height="24">
      <path d="M9 5h14v22H9zM5 27h22M14 5v22" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.5" cy="16" r=".8" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function ListingInfo({ listing, host }) {
  if (!listing) return null;

  const { subtitle, stats, rating, reviewCount, badges, highlights } = listing;
  const isGuestFav = badges?.some((b) => b.id === 'guest-favorite');

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{subtitle}</h2>
      <p className={styles.subtitle}>
        {stats.guests} guests · {stats.bedrooms} bedroom · {stats.beds} bed · {stats.bathrooms} bathroom
      </p>

      {isGuestFav && (
        <div className={styles.guestFavBanner} aria-label="Guest favourite">
          <div className={styles.gfLeft}>
            <img src="/guest-favourite-logo.png" alt="Guest favourite" className={styles.gfLogoImg} />
          </div>
          <p className={styles.gfDesc}>
            One of the most loved homes on Airbnb, according to guests
          </p>
          <div className={styles.gfRight}>
            <div className={styles.gfRating}>
              <span className={styles.gfRatingNum}>{rating}</span>
              <div className={styles.gfStars} aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
            </div>
            <span className={styles.gfDivider} aria-hidden="true" />
            <a href="#reviews" className={styles.gfReviews}>
              <span className={styles.gfReviewCount}>{reviewCount}</span>
              <span className={styles.gfReviewText}>Reviews</span>
            </a>
          </div>
        </div>
      )}

      {host && (
        <div className={styles.hostRow}>
          <img src={host.avatar} alt="" className={styles.hostAvatar} loading="lazy" />
          <div className={styles.hostInfo}>
            <p className={styles.hostedBy}>
              Hosted by <strong>{host.name}</strong>
            </p>
            <p className={styles.hostTenure}>{host.yearsHosting} years hosting</p>
          </div>
        </div>
      )}

      <div className={styles.divider} />

      <ul className={styles.highlights} aria-label="Property highlights">
        {highlights?.map((h) => (
          <li key={h.id} className={styles.highlight}>
            <span className={styles.highlightIcon} aria-hidden="true">
              {HIGHLIGHT_ICONS[h.icon] || HIGHLIGHT_ICONS.outdoor}
            </span>
            <div className={styles.highlightText}>
              <strong className={styles.highlightTitle}>{h.title}</strong>
              <span className={styles.highlightDesc}>{h.description}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.divider} />
    </div>
  );
}
