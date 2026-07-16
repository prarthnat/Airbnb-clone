import { useState, useEffect, useRef } from 'react';
import styles from './SectionNav.module.css';

const SECTIONS = [
  { id: 'photos', label: 'Photos', href: '#hero-gallery' },
  { id: 'amenities', label: 'Amenities', href: '#amenities' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'location', label: 'Location', href: '#map' },
];

/**
 * SectionNav — Sticky horizontal nav that appears after scrolling past the hero.
 * Highlights the active section. Right side shows mini price + Reserve CTA.
 */
export default function SectionNav({ listing, onReserve }) {
  const [activeSection, setActiveSection] = useState('photos');
  const [visible, setVisible] = useState(false);
  const navRef = useRef(null);

  // Show nav after scrolling past hero section
  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero-gallery');
      if (heroEl) {
        setVisible(heroEl.getBoundingClientRect().bottom <= 80);
      } else {
        setVisible(window.scrollY > 680);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active section based on scroll position
  useEffect(() => {
    const sectionIds = [
      { id: 'hero-gallery', navId: 'photos' },
      { id: 'amenities', navId: 'amenities' },
      { id: 'reviews', navId: 'reviews' },
      { id: 'map', navId: 'location' },
    ];

    const onScroll = () => {
      let current = 'photos';
      const scrollAnchor = window.scrollY + 128;

      for (const { id, navId } of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const sectionTop = el.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollAnchor) current = navId;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!listing) return null;

  const nights = listing.pricing?.nights || 5;
  const totalPrice = listing.pricing?.totalPrice || 28499;

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${visible ? styles.visible : ''}`}
      aria-label="Page sections"
    >
      <div className={styles.inner}>
        {/* Section Tabs */}
        <ul className={styles.tabs}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                aria-current={activeSection === s.id ? 'true' : undefined}
                className={`${styles.tab} ${activeSection === s.id ? styles.tabActive : ''}`}
                onClick={() => { setActiveSection(s.id); scrollTo(s.href); }}
                aria-label={`Go to ${s.label} section`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mini price + Reserve CTA */}
        <div className={styles.miniPrice}>
          <div className={styles.priceInfo}>
            <div className={styles.priceLine}>
              <span className={styles.amount}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className={styles.forNights}> for {nights} nights</span>
            </div>
            <div className={styles.ratingMini}>
              <svg viewBox="0 0 32 32" fill="currentColor" width="11" height="11" aria-hidden="true">
                <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.123-8.885a1 1 0 0 0-1.818 0z" />
              </svg>
              <span>{listing.rating} · {listing.reviewCount} reviews</span>
            </div>
          </div>
          <button
            className={styles.reserveBtn}
            onClick={onReserve}
            aria-label="Reserve this property"
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}
