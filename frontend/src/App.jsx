import { useState, useCallback, useEffect } from 'react';
import './App.css';

// Components
import Header from './components/Header/Header';
import SectionNav from './components/SectionNav/SectionNav';
import ListingHeader from './components/ListingHeader/ListingHeader';
import HeroGallery from './components/HeroGallery/HeroGallery';
import ListingInfo from './components/ListingInfo/ListingInfo';
import Description from './components/Description/Description';
import BookingWidget from './components/BookingWidget/BookingWidget';
import SleepSection from './components/SleepSection/SleepSection';
import Amenities from './components/Amenities/Amenities';
import CalendarSection from './components/CalendarSection/CalendarSection';
import Reviews from './components/Reviews/Reviews';
import HostProfile from './components/HostProfile/HostProfile';
import MapSection from './components/MapSection/MapSection';
import ThingsToKnow from './components/ThingsToKnow/ThingsToKnow';
import NearbyStays from './components/NearbyStays/NearbyStays';
import PhotoTour from './components/PhotoTour/PhotoTour';
import Lightbox from './components/Lightbox/Lightbox';

// Hooks
import { useListing, useReviews, useHost } from './hooks/useListing';

function LoadingState() {
  return (
    <div className="loading-container" aria-label="Loading listing" aria-busy="true">
      <div className="loading-gallery skeleton" />
      <div className="loading-content">
        <div className="loading-main">
          <div className="skeleton loading-title" />
          <div className="skeleton loading-meta" />
          <div className="skeleton loading-body" />
          <div className="skeleton loading-body" />
        </div>
        <div className="loading-widget skeleton" />
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="error-container" role="alert">
      <h2>Unable to load listing</h2>
      <p>{message}</p>
      <p>Make sure the backend is running: <code>cd backend &amp;&amp; npm run dev</code></p>
    </div>
  );
}

export default function App() {
  const { listing, loading: listingLoading, error: listingError } = useListing('villa-azure-1');
  const { reviews, loading: reviewsLoading } = useReviews('villa-azure-1');
  const { host, loading: hostLoading } = useHost(listing?.hostId || 'host-sophia-1');

  // ── Overlay State ─────────────────────────────────────────────────────────
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showReserveToast, setShowReserveToast] = useState(false);

  useEffect(() => {
    if (!showReserveToast) return;
    const timer = setTimeout(() => setShowReserveToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showReserveToast]);

  const photos = listing?.photos || [];
  const nearbyStays = listing?.nearbyStays || [];

  const handleShowAll = useCallback(() => setPhotoTourOpen(true), []);
  const handleHeroPhotoClick = useCallback(() => setPhotoTourOpen(true), []);
  const handlePhotoTourPhotoClick = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);
  const handlePhotoTourClose = useCallback(() => setPhotoTourOpen(false), []);
  const handleLightboxClose = useCallback(() => setLightboxOpen(false), []);
  const handleLightboxNavigate = useCallback((index) => setLightboxIndex(index), []);

  // Show toast when "Reserve" is clicked in SectionNav
  const handleSectionNavReserve = () => {
    setShowReserveToast(true);
  };

  // ── Loading / Error ─────────────────────────────────────────────────────
  if (listingLoading) return (
    <>
      <Header />
      <main className="main"><LoadingState /></main>
    </>
  );

  if (listingError) return (
    <>
      <Header />
      <main className="main"><ErrorState message={listingError} /></main>
    </>
  );

  return (
    <>
      <Header />
      <SectionNav listing={listing} onReserve={handleSectionNavReserve} />

      <main className="main" id="main-content">
        {/* Title + Share/Save — above gallery */}
        <ListingHeader listing={listing} />

        {/* Hero Gallery — anchored for section nav */}
        <div id="hero-gallery">
          <HeroGallery
            photos={photos}
            onShowAll={handleShowAll}
            onPhotoClick={handleHeroPhotoClick}
          />
        </div>

        {/* Two-column layout (Listing details + Sticky Booking Widget) */}
        <div className="listing-layout container">
          {/* Left Column */}
          <div className="listing-left">
            <ListingInfo listing={listing} host={host} />
            <Description listing={listing} />
            <SleepSection listing={listing} photos={photos} />
            <div id="amenities">
              <Amenities amenities={listing?.amenities} />
            </div>
            <CalendarSection />
          </div>

          {/* Right Column — Sticky Booking Widget */}
          <aside className="listing-right" id="booking-widget">
            <BookingWidget
              listing={listing}
              showToast={showReserveToast}
              setShowToast={setShowReserveToast}
            />
          </aside>
        </div>

        {/* Full-width bottom sections (Reviews, Map, Host, Things to know, Nearby) */}
        <div className="container">
          {!reviewsLoading && <Reviews reviews={reviews} listing={listing} />}
          <div id="map">
            <MapSection location={listing?.location} />
          </div>
          {!hostLoading && <HostProfile host={host} />}
          <ThingsToKnow listing={listing} />

          {nearbyStays.length > 0 && (
            <div className="nearby-section">
              <NearbyStays stays={nearbyStays} />
            </div>
          )}
        </div>
      </main>

      {/* ── Overlays ──────────────────────────────────────────────────── */}
      <PhotoTour
        photos={photos}
        isOpen={photoTourOpen}
        onClose={handlePhotoTourClose}
        onPhotoClick={handlePhotoTourPhotoClick}
      />
      <Lightbox
        photos={photos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
    </>
  );
}
