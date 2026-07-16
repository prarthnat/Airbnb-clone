import styles from './MapSection.module.css';

export default function MapSection({ location }) {
  if (!location) return null;

  const { neighborhood, directions, neighbourhoodHighlights } = location;

  return (
    <section className={styles.section} aria-labelledby="map-heading">
      <h2 id="map-heading" className={styles.heading}>Where you'll be</h2>
      <p className={styles.location}>{neighborhood}</p>

      <div className={styles.mapWrapper}>
        <div className={styles.map} role="img" aria-label="Stylised approximate map of Candolim">
          <div className={styles.water} />
          <div className={styles.parkOne} />
          <div className={styles.parkTwo} />
          <div className={styles.pin} aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 27V13l9-7 9 7v14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 27v-8h8v8M5 27h22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <button className={styles.searchBtn} aria-label="Search nearby">
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="14" cy="14" r="8" />
              <path d="m20 20 7 7" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.zoomControls} aria-hidden="true">
            <button type="button">+</button>
            <button type="button">−</button>
          </div>
        </div>
      </div>

      <p className={styles.exactLocation}>{directions}</p>

      <div className={styles.directions}>
        <h3 className={styles.directionsTitle}>Neighbourhood highlights</h3>
        <p className={styles.directionsText}>{neighbourhoodHighlights}</p>
        <button className={styles.showMore} type="button">
          Show more
          <svg viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m12 6 10 10-10 10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.divider} />
    </section>
  );
}
