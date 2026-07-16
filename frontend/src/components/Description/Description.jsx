import { useState } from 'react';
import styles from './Description.module.css';

export default function Description({ listing }) {
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  if (!listing) return null;

  const { description } = listing;
  const SHORT_LIMIT = 180;
  const isLong = description.length > SHORT_LIMIT;
  const displayText = expanded || !isLong ? description : description.slice(0, SHORT_LIMIT) + '…';
  const chevronClass = expanded ? styles.chevronOpen : styles.chevron;

  return (
    <section className={styles.section} aria-labelledby="description-heading">
      <h2 id="description-heading" className="sr-only">About this listing</h2>

      {/* Translation notice (from reference) */}
      <div className={styles.translationNote} aria-label="Translation notice">
        <span>Some info has been automatically translated.</span>
        <button
          className={styles.showOriginalBtn}
          onClick={() => setShowOriginal(!showOriginal)}
          aria-pressed={showOriginal}
        >
          {showOriginal ? 'Show translated' : 'Show original'}
        </button>
      </div>

      <div className={styles.text}>
        {displayText.split('\n\n').map((para, i) => (
          <p key={i} className={styles.para}>{para}</p>
        ))}
      </div>

      {isLong && (
        <button
          className={styles.showMore}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Show more'}
          <svg viewBox="0 0 32 32" fill="currentColor" width="14" height="14"
            className={chevronClass}
            aria-hidden="true">
            <path d="M28 12L16 22 4 12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <div className={styles.divider} />
    </section>
  );
}
