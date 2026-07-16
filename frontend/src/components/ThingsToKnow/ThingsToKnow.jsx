import styles from './ThingsToKnow.module.css';

// ─── Icon: Cancellation (calendar with X) ────────────────────────────────────
const CancellationIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" aria-hidden="true">
    <rect x="4" y="6" width="24" height="22" rx="2" strokeLinejoin="round"/>
    <path d="M4 12h24M10 4v4M22 4v4" strokeLinecap="round"/>
    <path d="M12 18l8 4M20 18l-8 4" strokeLinecap="round"/>
  </svg>
);

// ─── Icon: House rules (magnifying glass) ────────────────────────────────────
const HouseRulesIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" aria-hidden="true">
    <circle cx="14" cy="14" r="9"/>
    <path d="m21 21 7 7" strokeLinecap="round"/>
  </svg>
);

// ─── Icon: Safety (shield) ───────────────────────────────────────────────────
const SafetyIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" aria-hidden="true">
    <path d="M16 3L4 8v10c0 7 12 12 12 12S28 25 28 18V8L16 3z" strokeLinejoin="round"/>
    <path d="M16 3v27" />
  </svg>
);

export default function ThingsToKnow({ listing }) {
  if (!listing) return null;

  const { houseRules, cancellationPolicy, safetyInfo } = listing;

  return (
    <section className={styles.section} aria-labelledby="things-to-know-heading">
      <h2 id="things-to-know-heading" className={styles.heading}>Things to know</h2>

      <div className={styles.grid}>
        {/* ── Cancellation Policy ─────────────────────────────────────────── */}
        <div className={styles.column}>
          <div className={styles.columnIcon} aria-hidden="true">
            <CancellationIcon />
          </div>
          <h3 className={styles.columnTitle}>Cancellation policy</h3>
          <p className={styles.columnText}>{cancellationPolicy}</p>
          <button className={styles.learnMore} aria-label="Learn more about the cancellation policy">
            Learn more
          </button>
        </div>

        {/* ── House Rules ─────────────────────────────────────────────────── */}
        <div className={styles.column}>
          <div className={styles.columnIcon} aria-hidden="true">
            <HouseRulesIcon />
          </div>
          <h3 className={styles.columnTitle}>House rules</h3>
          <ul className={styles.rulesList}>
            {houseRules?.map((rule, i) => (
              <li key={i} className={styles.ruleItem}>{rule}</li>
            ))}
          </ul>
          <button className={styles.learnMore} aria-label="Learn more about house rules">
            Learn more
          </button>
        </div>

        {/* ── Safety & Property ───────────────────────────────────────────── */}
        <div className={styles.column}>
          <div className={styles.columnIcon} aria-hidden="true">
            <SafetyIcon />
          </div>
          <h3 className={styles.columnTitle}>Safety & property</h3>
          <ul className={styles.rulesList}>
            {safetyInfo?.map((item, i) => (
              <li key={i} className={styles.ruleItem}>{item}</li>
            ))}
          </ul>
          <button className={styles.learnMore} aria-label="Learn more about safety and property">
            Learn more
          </button>
        </div>
      </div>

      <div className={styles.divider} />
    </section>
  );
}
