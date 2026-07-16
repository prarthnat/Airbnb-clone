import { useState } from 'react';
import styles from './BookingWidget.module.css';

function formatDateUS(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${m}/${d}/${y}`;
}

export default function BookingWidget({ listing, onOpenCalendar, showToast, setShowToast }) {
  const [checkIn, setCheckIn] = useState(listing?.pricing?.checkIn || '2026-10-18');
  const [checkOut, setCheckOut] = useState(listing?.pricing?.checkOut || '2026-10-23');
  const [guests, setGuests] = useState(1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  if (!listing) return null;

  const { pricing, stats } = listing;
  const nights = pricing.nights || 5;
  const totalPrice = pricing.totalPrice || 28499;
  const freeCancelBefore = pricing.freeCancelBefore || '17 October';
  const chevronClass = showGuestPicker ? styles.chevronOpen : styles.chevron;

  const handleReserve = (e) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <div className={styles.stack}>
      <div className={styles.promoBanner} role="note" aria-label="Promotional offer">
        <div className={styles.promoIcon} aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="#008A05" strokeWidth="2">
            <path d="M4 6v9.5L16.5 28 28 16.5 15.5 4H6a2 2 0 0 0-2 2z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10.5" cy="10.5" r="2" fill="#008A05" stroke="none" />
          </svg>
        </div>
        <div className={styles.promoText}>
          <span>Get <strong>10% off</strong> your next stay.</span>
          <button className={styles.promoLink} aria-label="View terms for 10% discount">Terms apply</button>
        </div>
        <button className={styles.claimBtn} aria-label="Claim your 10% discount">Claim</button>
      </div>

      <aside className={styles.widget} aria-label="Booking widget">
        <div className={styles.priceHeader}>
          <span className={styles.price}>
            <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
            <span className={styles.perNight}> for {nights} nights</span>
          </span>
        </div>

        <form className={styles.form} onSubmit={handleReserve}>
          <fieldset className={styles.datesFieldset}>
            <legend className={styles.srOnly}>Select dates and guests</legend>
            <div className={styles.dateGrid}>
              <div className={styles.dateField} onClick={onOpenCalendar}>
                <label htmlFor="checkin" className={styles.fieldLabel}>CHECK-IN</label>
                <input
                  id="checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className={styles.dateInput}
                  aria-label="Check-in date"
                />
                <span className={styles.dateDisplay} aria-hidden="true">{formatDateUS(checkIn)}</span>
              </div>
              <div className={styles.fieldDivider} aria-hidden="true" />
              <div className={styles.dateField} onClick={onOpenCalendar}>
                <label htmlFor="checkout" className={styles.fieldLabel}>CHECKOUT</label>
                <input
                  id="checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn}
                  className={styles.dateInput}
                  aria-label="Check-out date"
                />
                <span className={styles.dateDisplay} aria-hidden="true">{formatDateUS(checkOut)}</span>
              </div>
            </div>

            <div className={styles.guestField}>
              <div className={styles.guestFieldInner}>
                <button
                  type="button"
                  className={styles.guestTrigger}
                  onClick={() => setShowGuestPicker(!showGuestPicker)}
                  aria-expanded={showGuestPicker}
                >
                  <span className={styles.guestTriggerText}>
                    <span className={styles.fieldLabel}>GUESTS</span>
                    <span className={styles.guestCount}>{guests} guest{guests > 1 ? 's' : ''}</span>
                  </span>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" className={chevronClass}>
                    <path d="M6 10l10 10 10-10" />
                  </svg>
                </button>

                {showGuestPicker && (
                  <div className={styles.guestDropdown}>
                    <div className={styles.guestRow}>
                      <div>
                        <p className={styles.guestType}>Adults</p>
                        <p className={styles.guestSubtype}>Age 13+</p>
                      </div>
                      <div className={styles.counter}>
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}
                          className={styles.counterBtn} aria-label="Decrease guests" disabled={guests <= 1}>−</button>
                        <span className={styles.counterVal} aria-live="polite">{guests}</span>
                        <button type="button" onClick={() => setGuests(Math.min(stats.guests, guests + 1))}
                          className={styles.counterBtn} aria-label="Increase guests" disabled={guests >= stats.guests}>+</button>
                      </div>
                    </div>
                    <p className={styles.guestMax}>Maximum {stats.guests} guests</p>
                    <button type="button" className={styles.closeGuests}
                      onClick={() => setShowGuestPicker(false)}>Close</button>
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          <div className={styles.cancelNote} aria-label="Cancellation policy">
            Free cancellation before <strong>{freeCancelBefore}</strong>
          </div>

          <button type="submit" className={styles.reserveBtn} aria-label="Reserve now">
            Reserve
          </button>
        </form>

        <p className={styles.noCharge}>You won't be charged yet</p>
      </aside>

      <div className={styles.reportWrapper}>
        <button className={styles.reportBtn} aria-label="Report this listing">
          <img src="/reference/flag-icon.png" alt="" className={styles.flagIcon} aria-hidden="true" />
          Report this listing
        </button>
      </div>

      <div className={`${styles.toast} ${showToast ? styles.toastActive : ''}`} role="status" aria-live="polite">
        You won't be charged yet
      </div>
    </div>
  );
}
