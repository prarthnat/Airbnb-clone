import styles from './HeroGallery.module.css';

export default function HeroGallery({ photos = [], onShowAll, onPhotoClick }) {
  if (!photos.length) return null;

  // Explicitly map each layout position to its new -v2.jpg URL to guarantee exact visual structure
  const mainHero = { ...(photos[0] || {}), url: '/reference/hero-main-v2.jpg', caption: 'Main photo' };
  const sofaCloseup = { ...(photos[1] || {}), url: '/reference/bathtub-v2.jpg', caption: 'Sofa closeup' };
  const bathtub = { ...(photos[2] || {}), url: '/reference/bedroom-v2.jpg', caption: 'Bathtub' };
  const bedroom = { ...(photos[3] || {}), url: '/reference/building-v2.jpg', caption: 'Bedroom' };
  const building = { ...(photos[4] || {}), url: '/reference/sofa-closeup-v2.jpg', caption: 'Building' };

  const assetVersion = 'gallery-layout-v3';
  const getUrl = (photoObj) => {
    if (!photoObj?.url) return '';
    return `${photoObj.url}?v=${assetVersion}`;
  };

  return (
    <section className={styles.gallery} aria-label="Property photos">
      <div className={styles.heroGallery}>
        {/* Left Column: One large image (Main Hero) */}
        <button
          className={styles.cellMain}
          onClick={() => onPhotoClick?.(0)}
          aria-label={`Photo 1: ${mainHero?.caption || 'Property main photo'}`}
        >
          <img
            src={getUrl(mainHero)}
            alt={mainHero?.caption || 'Property main photo'}
            className={`${styles.img} ${styles.imgMain}`}
            loading="eager"
            width="560"
            height="460"
          />
        </button>

        {/* Right Column: 2x2 grid containing 4 thumbnails */}
        <div className={styles.rightGrid}>
          {/* Top Left Thumbnail: Sofa Closeup */}
          <button
            className={styles.cell}
            onClick={() => onPhotoClick?.(1)}
            aria-label={`Photo 2: ${sofaCloseup?.caption || 'Sofa closeup'}`}
          >
            <img
              src={getUrl(sofaCloseup)}
              alt={sofaCloseup?.caption || 'Sofa closeup'}
              className={`${styles.img} ${styles.imgSofa}`}
              loading="lazy"
              width="280"
              height="230"
            />
          </button>

          {/* Top Right Thumbnail: Bathtub (Jacuzzi close-up) */}
          <button
            className={styles.cell}
            onClick={() => onPhotoClick?.(2)}
            aria-label={`Photo 3: ${bathtub?.caption || 'Bathtub'}`}
          >
            <img
              src={getUrl(bathtub)}
              alt={bathtub?.caption || 'Bathtub'}
              className={`${styles.img} ${styles.imgBathtub}`}
              loading="lazy"
              width="280"
              height="230"
            />
          </button>

          {/* Bottom Left Thumbnail: Bedroom */}
          <button
            className={styles.cell}
            onClick={() => onPhotoClick?.(3)}
            aria-label={`Photo 4: ${bedroom?.caption || 'Bedroom'}`}
          >
            <img
              src={getUrl(bedroom)}
              alt={bedroom?.caption || 'Bedroom'}
              className={`${styles.img} ${styles.imgBedroom}`}
              loading="lazy"
              width="280"
              height="230"
            />
          </button>

          {/* Bottom Right Thumbnail: Building */}
          <button
            className={styles.cell}
            onClick={() => onPhotoClick?.(4)}
            aria-label={`Photo 5: ${building?.caption || 'Building'}`}
          >
            <img
              src={getUrl(building)}
              alt={building?.caption || 'Building'}
              className={`${styles.img} ${styles.imgBuilding}`}
              loading="lazy"
              width="280"
              height="230"
            />
          </button>
        </div>
      </div>

      {/* Show all photos button */}
      <button
        className={styles.showAll}
        onClick={() => onShowAll?.()}
        aria-label={`Show all ${photos.length} photos`}
        aria-expanded="false"
      >
        <span className={styles.showAllIcon} aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} />
          ))}
        </span>
        Show all photos
      </button>
    </section>
  );
}
