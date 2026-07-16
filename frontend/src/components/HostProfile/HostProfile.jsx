import styles from './HostProfile.module.css';


// ─── Icon: Balloon (Born in the 80s) ─────────────────────────────────────────
const BalloonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
    <ellipse cx="16" cy="12" rx="9" ry="11"/>
    <path d="M16 23c0 3 2 5 2 7M14 30h4" strokeLinecap="round"/>
  </svg>
);

// ─── Icon: Lightbulb (Born in the 80s) ───────────────────────────────────────
const LightbulbIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
    <path d="M16 3c-5.5 0-10 4.5-10 10 0 3.3 1.6 6.2 4 8v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5c2.4-1.8 4-4.7 4-8 0-5.5-4.5-10-10-10z" strokeLinejoin="round" />
    <path d="M11 30h10" strokeLinecap="round" />
  </svg>
);

// ─── Icon: Graduation cap (School) ───────────────────────────────────────────
const SchoolIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
    <path d="M2 12l14-7 14 7-14 7-14-7z" strokeLinejoin="round"/>
    <path d="M8 15v8c0 2 3.5 5 8 5s8-3 8-5v-8" strokeLinecap="round"/>
    <path d="M28 12v8" strokeLinecap="round"/>
  </svg>
);

// ─── Icon: Shield (safety note) ──────────────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
    <path d="M16 3L4 8v10c0 7 12 12 12 12S28 25 28 18V8L16 3z" strokeLinejoin="round"/>
    <path d="M16 3v27" />
  </svg>
);

// ─── CoHost avatar ────────────────────────────────────────────────────────────
function CoHostAvatar({ cohost }) {
  if (cohost.avatar) {
    return (
      <img
        src={cohost.avatar}
        alt={cohost.name}
        className={styles.coHostAvatar}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={styles.coHostInitial}
      style={{ background: cohost.color || '#e0e0e0' }}
      aria-hidden="true"
    >
      {cohost.initial || cohost.name?.[0]?.toUpperCase()}
    </div>
  );
}

export default function HostProfile({ host }) {
  if (!host) return null;

  const personalIconMap = {
    balloon: <BalloonIcon />,
    school: <SchoolIcon />,
    lightbulb: <LightbulbIcon />,
  };

  return (
    <section className={styles.section} aria-labelledby="host-heading">
      <h2 id="host-heading" className={styles.sectionHeading}>Meet your host</h2>

      <div className={styles.layout}>
        {/* ── Left Column: Card + Personal Info ───────────────────────────── */}
        <div className={styles.leftCol}>
          <div className={styles.hostCard}>
            <div className={styles.cardLeft}>
              <div className={styles.avatarWrapper}>
                <img
                  src="/reference/mirashya-logo-verified.png"
                  alt={`${host.name} host logo`}
                  className={styles.avatar}
                  loading="lazy"
                />
              </div>
              <h3 className={styles.hostName}>{host.name}</h3>
              <p className={styles.hostRole}>Host</p>
            </div>

            <div className={styles.cardRight}>
              <div className={styles.cardStat}>
                <strong className={styles.cardStatValue}>{host.totalReviews.toLocaleString()}</strong>
                <span className={styles.cardStatLabel}>Reviews</span>
              </div>
              <div className={styles.cardStat}>
                <strong className={styles.cardStatValue}>
                  {host.rating}
                  <svg viewBox="0 0 32 32" fill="currentColor" width="12" height="12" className={styles.statStar} aria-hidden="true">
                    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.123-8.885a1 1 0 0 0-1.818 0z" />
                  </svg>
                </strong>
                <span className={styles.cardStatLabel}>Rating</span>
              </div>
              <div className={styles.cardStat}>
                <strong className={styles.cardStatValue}>{host.yearsHosting}</strong>
                <span className={styles.cardStatLabel}>Years hosting</span>
              </div>
            </div>
          </div>

          {/* Personal Info underneath the card */}
          {host.personalInfo?.length > 0 && (
            <ul className={styles.personalInfo}>
              {host.personalInfo.map((item, i) => (
                <li key={i} className={styles.personalInfoItem}>
                  <span className={styles.personalInfoIcon} aria-hidden="true">
                    {personalIconMap[item.icon] || <LightbulbIcon />}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Right Column: Details (excluding personal info) ──────────────── */}
        <div className={styles.details}>
          {/* Co-Hosts */}
          {host.coHosts?.length > 0 && (
            <div className={styles.coHostsSection}>
              <h3 className={styles.coHostsHeading}>Co-Hosts</h3>
              <div className={styles.coHostsGrid}>
                {host.coHosts.map((cohost, i) => (
                  <div key={i} className={styles.coHostItem}>
                    <CoHostAvatar cohost={cohost} />
                    <span className={styles.coHostName}>{cohost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host details */}
          <div className={styles.hostDetails}>
            <h3 className={styles.hostDetailsHeading}>Host details</h3>
            <p className={styles.hostDetailLine}>Response rate: {host.responseRate}%</p>
            <p className={styles.hostDetailLine}>Responds {host.responseTime.toLowerCase()}</p>
          </div>

          {/* Message host button */}
          <button
            className={styles.messageBtn}
            aria-label={`Message ${host.firstName}`}
          >
            Message host
          </button>

          {/* Safety note */}
          <div className={styles.safetyNote}>
            <ShieldIcon />
            <p className={styles.safetyText}>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.divider} />
    </section>
  );
}