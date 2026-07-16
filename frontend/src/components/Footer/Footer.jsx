import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span>© 2026 Airbnb, Inc.</span>
          <span className={styles.dot}>·</span>
          <a href="/" className={styles.link}>Privacy</a>
          <span className={styles.dot}>·</span>
          <a href="/" className={styles.link}>Terms</a>
          <span className={styles.dot}>·</span>
          <a href="/" className={styles.link}>Sitemap</a>
          <span className={styles.dot}>·</span>
          <a href="/" className={styles.link}>Company details</a>
        </div>

        <div className={styles.right}>
          <button className={styles.langBtn} aria-label="Choose language, currently English (IN)">
            <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5H6.05a6.6 6.6 0 0 0 .15 2.58 11.23 11.23 0 0 0 1.8 1.42 11.2 11.2 0 0 0 1.8-1.42c.1-.63.15-1.49.15-2.58zm-2.03 4c-.58-.33-1.07-.84-1.47-1.5H3.66a6.3 6.3 0 0 0 4.26 1.5zm2.84-1.5c-.4.66-.89 1.17-1.47 1.5a6.3 6.3 0 0 0 4.26-1.5h-2.79zM8 1.75a6.3 6.3 0 0 0-4.26 1.5h2.79c.4-.66.89-1.17 1.47-1.5zm0 0c.58.33 1.07.84 1.47 1.5h2.79a6.3 6.3 0 0 0-4.26-1.5zm1.95 5.5H6.05c0 1.09-.05 1.95-.15 2.58H9.8c.1-.63.15-1.49.15-2.58z" />
            </svg>
            <span>English (IN)</span>
          </button>
          <button className={styles.currencyBtn} aria-label="Choose currency, currently Indian Rupee">
            <span>₹</span>
            <span>INR</span>
          </button>
          <a href="/" className={styles.supportLink} aria-label="Support & resources">
            <span>Support & resources</span>
            <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
              <path d="M5 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
