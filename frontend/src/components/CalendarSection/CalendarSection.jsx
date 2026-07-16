import styles from './CalendarSection.module.css';

const MONTH_1_DAYS = [
  // October 2026: starts Thursday (4 blank lead days: Sun-Wed)
  null, null, null, null,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];

const MONTH_2_DAYS = [
  // November 2026: starts Sunday (0 blank lead days)
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CalendarSection() {
  return (
    <section className={styles.section} aria-label="Availability calendar">
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>5 nights in Candolim</h2>
          <p className={styles.subtitle}>18 Oct 2026 - 23 Oct 2026</p>
        </div>
      </div>

      <div className={styles.monthsGrid}>
        {/* October 2026 */}
        <div className={styles.month}>
          <div className={styles.monthHeader}>
            <button type="button" className={styles.navBtn} aria-label="Previous month">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" aria-hidden="true">
                <path d="M20 8 12 16l8 8" />
              </svg>
            </button>
            <h3 className={styles.monthTitle}>October 2026</h3>
            <div className={styles.placeholderBtn} />
          </div>
          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => (
              <span key={d} className={styles.weekday}>{d}</span>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {MONTH_1_DAYS.map((day, idx) => {
              if (day === null) {
                return <span key={`m1-empty-${idx}`} className={styles.emptyDay} aria-hidden="true" />;
              }
              const isCheckIn = day === 18;
              const isCheckOut = day === 23;
              const isInRange = day > 18 && day < 23;
              const dayClass = [
                styles.dayBtn,
                isCheckIn || isCheckOut ? styles.daySelected : '',
                isInRange ? styles.dayInRange : '',
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={`m1-${day}`}
                  type="button"
                  className={dayClass}
                  aria-label={`October ${day}, 2026`}
                  aria-pressed={isCheckIn || isCheckOut}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* November 2026 */}
        <div className={styles.month}>
          <div className={styles.monthHeader}>
            <div className={styles.placeholderBtn} />
            <h3 className={styles.monthTitle}>November 2026</h3>
            <button type="button" className={styles.navBtn} aria-label="Next month">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" aria-hidden="true">
                <path d="m12 8 8 8-8 8" />
              </svg>
            </button>
          </div>
          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => (
              <span key={d} className={styles.weekday}>{d}</span>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {MONTH_2_DAYS.map((day) => (
              <button
                key={`m2-${day}`}
                type="button"
                className={styles.dayBtn}
                aria-label={`November ${day}, 2026`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.keyboardLink} aria-label="Keyboard shortcuts">
          <img src="/reference/keyboard-icon.png" alt="" className={styles.keyboardIcon} aria-hidden="true" />
        </button>
        <button type="button" className={styles.clearBtn} aria-label="Clear dates">
          Clear dates
        </button>
      </div>
    </section>
  );
}
