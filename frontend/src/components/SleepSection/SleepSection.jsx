import styles from './SleepSection.module.css';

// Bedroom cards from listing photos (Bedroom category)
export default function SleepSection({ listing, photos = [] }) {
  if (!listing) return null;

  const spaces = listing.sleepSpaces?.map((space, idx) => ({
    id: space.id,
    name: space.name,
    description: space.description,
    photo: photos.find((photo) => photo.category === space.photoCategory) || photos[idx + 1] || photos[0],
  })) || [];

  return (
    <section className={styles.section} aria-labelledby="sleep-heading">
      <h2 id="sleep-heading" className={styles.heading}>Where you'll sleep</h2>
      <div className={styles.grid}>
        {spaces.map((room) => (
          <article key={room.id} className={styles.card} aria-label={room.name}>
            {room.photo ? (
              <div className={styles.imgWrapper}>
                <img
                  src={room.photo.url}
                  alt={room.photo.caption || room.name}
                  className={styles.img}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className={styles.imgPlaceholder} aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
                  <path d="M2 16V8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v8M2 24v4M30 24v4M2 24h28M2 20h10a2 2 0 0 0 0-4H8a2 2 0 0 0-2 2v2M30 20h-8a2 2 0 0 1 0-4h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
            )}
            <div className={styles.info}>
              <h3 className={styles.roomName}>{room.name}</h3>
              <p className={styles.roomDesc}>{room.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.divider} />
    </section>
  );
}
