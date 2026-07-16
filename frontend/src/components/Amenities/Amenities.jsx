import { useEffect, useRef, useState } from 'react';
import styles from './Amenities.module.css';
import { useFocusTrap, useKeyboard } from '../../hooks/useKeyboard';

// Icon components for common amenities
const AmenityIcon = ({ name }) => {
  const icons = {
    kitchen: <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z" />,
    fridge: <><rect x="8" y="2" width="16" height="28" rx="2" strokeWidth="2" fill="none"/><path d="M8 12h16M11 5v4M11 15v5" strokeWidth="2" fill="none" /></>,
    freezer: <><rect x="6" y="4" width="20" height="24" rx="2" strokeWidth="2" fill="none"/><path d="M6 10h20M16 10v18" strokeWidth="2" fill="none" /></>,
    microwave: <><rect x="4" y="8" width="24" height="16" rx="2" strokeWidth="2" fill="none"/><rect x="7" y="11" width="12" height="10" rx="1" strokeWidth="2" fill="none"/><path d="M23 12v2M23 18v2M23 15v.01" strokeWidth="2" fill="none" strokeLinecap="round" /></>,
    'cooking-basics': <path d="M6 16a6 6 0 0 0 12 0H6zM18 16h6a2 2 0 0 0 0-4h-6M12 16v12" strokeWidth="2" fill="none" />,
    crockery: <><circle cx="12" cy="16" r="8" strokeWidth="2" fill="none"/><path d="M24 6v14a4 4 0 0 1-4 4M24 16h-4M22 6v10M26 6v10" strokeWidth="2" fill="none" /></>,
    kettle: <path d="M20 12h4a2 2 0 0 1 2 2v6M8 8h12v18H8zM6 14h2M14 2v6" strokeWidth="2" fill="none" />,
    'coffee-maker': <path d="M8 6h14v20H8V6zm14 4h4a2 2 0 0 1 0 4h-4M12 2v4M16 2v4M10 18h10M12 14v4M18 14v4" strokeWidth="2" fill="none" />,
    wine: <path d="M10 6h12l-4 10a2 2 0 0 1-4 0L10 6zM16 16v10M12 26h8" strokeWidth="2" fill="none" />,
    toaster: <><rect x="6" y="14" width="20" height="12" rx="2" strokeWidth="2" fill="none"/><path d="M8 14V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M2 18h4" strokeWidth="2" fill="none" /></>,
    blender: <><rect x="12" y="20" width="8" height="10" rx="1" strokeWidth="2" fill="none"/><path d="M10 4h12l-2 16h-8zM14 4V2h4v2" strokeWidth="2" fill="none" /></>,
    cooker: <><rect x="4" y="6" width="24" height="20" rx="2" strokeWidth="2" fill="none"/><circle cx="10" cy="12" r="2" strokeWidth="2" fill="none"/><circle cx="22" cy="12" r="2" strokeWidth="2" fill="none"/><circle cx="10" cy="20" r="2" strokeWidth="2" fill="none"/><circle cx="22" cy="20" r="2" strokeWidth="2" fill="none"/></>,
    entrance: <><rect x="8" y="4" width="16" height="24" rx="2" strokeWidth="2" fill="none"/><circle cx="14" cy="16" r="1.5" fill="currentColor"/></>,
    patio: <path d="M4 28h24M8 28V14M24 28V14M8 14h16M14 14V4h4v10M10 20h12" strokeWidth="2" fill="none" />,
    'outdoor-dining': <path d="M4 24h24M8 24V14h16v10M6 14h20M12 24v-6M20 24v-6M12 10h8" strokeWidth="2" fill="none" />,
    car: <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z" />,
    pool: <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z" />,
    'hot-tub': <path d="M9.5 2a4.5 4.5 0 0 1 3.53 7.3c.6.21 1.17.54 1.66.98l.19.19L17.4 13H31v2h-2v14a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15H1v-2h2.1a5 5 0 0 1 2.96-3.6A4.5 4.5 0 0 1 9.5 2zm7.08 13H5v14h22V15h-7.59l3.3 3.3-1.42 1.4zM9.5 4a2.5 2.5 0 0 0-1 4.8V11H8a3 3 0 0 0-2.83 2h9.41l-1.12-1.12a3 3 0 0 0-1.92-.87l-.2-.01h-.84V8.8a2.5 2.5 0 0 0-1-4.8zm15.49-3a6.96 6.96 0 0 1-1.8 4.07l-.45.46A8.97 8.97 0 0 0 20.35 11h-2a10.97 10.97 0 0 1 3.2-7.12A4.96 4.96 0 0 0 22.97 1zm2 0h2a10.96 10.96 0 0 1-3.2 7.12A4.97 4.97 0 0 0 24.38 11h-2a6.97 6.97 0 0 1 1.8-4.06l.44-.47A8.96 8.96 0 0 0 26.99 1z" />,
    gym: <path d="M4 16h24M6 10v12M26 10v12M10 12v8M22 12v8" strokeWidth="2" fill="none" />,
    pets: <path d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />,
    cleaning: <path d="M12 10h8v18h-8zM14 10V6a2 2 0 0 0-2-2H8M22 6h-6M12 16h8" strokeWidth="2" fill="none" />,
    calendar: <><rect x="6" y="8" width="20" height="20" rx="2" strokeWidth="2" fill="none"/><path d="M10 4v8M22 4v8M6 16h20M10 22h4" strokeWidth="2" fill="none" /></>,
    'self-checkin': <><rect x="6" y="4" width="20" height="24" rx="2" strokeWidth="2" fill="none"/><rect x="18" y="14" width="4" height="6" rx="1" strokeWidth="2" fill="none"/><path d="M12 16h2" strokeWidth="2" fill="none" /></>,
    camera: <path d="M23 3a2 2 0 0 1 2 1.85v1.67l5-2v11.96l-5-2V16a2 2 0 0 1-1.85 2H16.9a5 5 0 0 1-3.98 3.92A5 5 0 0 1 8.22 26H4v4H2V20h2v4h4a3 3 0 0 0 2.87-2.13A5 5 0 0 1 7.1 18H4a2 2 0 0 1-2-1.85V5a2 2 0 0 1 1.85-2H4zM12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm11-9H4v11h3.1a5 5 0 0 1 9.8 0H23zm5 2.48-3 1.2v3.64l3 1.2zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />,
    'co-alarm-crossed': <path d="M2.05 6.3 4 8.23V25a3 3 0 0 0 2.82 3h16.94l1.95 1.95c-.16.02-.33.04-.5.04L25 30H7a5 5 0 0 1-5-4.78V7c0-.24.02-.48.05-.7zm1.66-4 26 26-1.42 1.4-26-26 1.42-1.4zM25 2a5 5 0 0 1 5 4.78V25a5 5 0 0 1-.05.7L28 23.77V7a3 3 0 0 0-2.82-3H8.24L6.3 2.05c.16-.02.33-.04.5-.04L7 2h18zM11.1 17a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />,
    'smoke-alarm-crossed': <path d="m3.49 7.73 1.44 1.44A12.94 12.94 0 0 0 3 16a13 13 0 0 0 19.82 11.07l1.45 1.44A14.93 14.93 0 0 1 16 31 15 15 0 0 1 3.49 7.73zm.22-5.44 26 26-1.42 1.42-26-26 1.42-1.42zM16 1a15 15 0 0 1 12.52 23.27l-1.45-1.45A12.94 12.94 0 0 0 29 16 13 13 0 0 0 16 3a12.94 12.94 0 0 0-6.83 1.93L7.74 3.5A14.93 14.93 0 0 1 16 1zm-4.9 16a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />,
    wifi: <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z" />,
    workspace: <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z" />,
    shower: <path d="M14 4a6 6 0 0 1 6 6M4 28l14-14M18 10l-4 4M20 22s-4 2-4 6h12c0-4-4-6-4-6" strokeWidth="2" fill="none" />,

    hairdryer: <path d="M8 8h10a4 4 0 0 1 4 4v4H8V8zm6 8v10M10 26h8" strokeWidth="2" fill="none" />,
    shampoo: <path d="M10 8h12v18H10zM12 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" strokeWidth="2" fill="none" />,
    'hot-water': <><path d="M4 22h24a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" strokeWidth="2" fill="none" /><path d="M10 14c0-2-2-4-2-6M16 14c0-2-2-4-2-6M22 14c0-2-2-4-2-6" strokeWidth="2" fill="none" /></>,
    'shower-gel': <><rect x="10" y="10" width="12" height="18" rx="2" strokeWidth="2" fill="none"/><path d="M14 10V6h4v4M10 6h12M16 2v4" strokeWidth="2" fill="none" /></>,
    washer: <><rect x="6" y="4" width="20" height="24" rx="2" strokeWidth="2" fill="none"/><circle cx="16" cy="16" r="6" strokeWidth="2" fill="none"/></>,
    hangers: <path d="M16 6a4 4 0 0 1 4 4h-8a4 4 0 0 1 4-4zm-8 8h16l-8-8-8 8z" strokeWidth="2" fill="none" />,
    'bed-linen': <><path d="M6 10h20v12H6z" strokeWidth="2" fill="none"/><path d="M6 14h20M6 18h20" strokeWidth="2" fill="none"/></>,
    blinds: <path d="M6 6h20v18H6zM6 10h20M6 14h20M6 18h20M16 24v4" strokeWidth="2" fill="none" />,
    iron: <path d="M6 22h20l-4-10H10l-4 10zM14 12V6a2 2 0 0 1 2-2h4" strokeWidth="2" fill="none" />,
    wardrobe: <><rect x="6" y="4" width="20" height="24" rx="2" strokeWidth="2" fill="none"/><path d="M16 4v24M12 14v4M20 14v4" strokeWidth="2" fill="none"/></>,
    cot: <><rect x="4" y="10" width="24" height="14" rx="2" strokeWidth="2" fill="none"/><path d="M8 10v14M12 10v14M16 10v14M20 10v14M24 10v14M4 28v-4M28 28v-4" strokeWidth="2" fill="none"/></>,
    tv: <><rect x="4" y="8" width="24" height="16" rx="2" strokeWidth="2" fill="none"/><path d="M10 24l-2 4M22 24l2 4M12 28h8" strokeWidth="2" fill="none"/></>,
    ac: <><path d="M16 4v24M4 16h24M8.46 8.46l15.08 15.08M23.54 8.46L8.46 23.54" strokeWidth="2" fill="none" /></>,
    fan: <><circle cx="16" cy="16" r="4" strokeWidth="2" fill="none"/><path d="M16 12C16 6 22 4 22 4s2 6-6 8M16 20c0 6-6 8-6 8s-2-6 6-8M12 16c-6 0-8-6-8-6s6-2 8 6M20 16c6 0 8 6 8 6s-6 2-8-6" strokeWidth="2" fill="none"/></>
  };

  const pathData = icons[name] || <path d="M6 16h20M16 6v20" strokeWidth="2" strokeLinecap="round" />;

  const strokedIcons = new Set([
    'fridge', 'freezer', 'microwave', 'cooking-basics', 'crockery', 'kettle',
    'coffee-maker', 'wine', 'toaster', 'blender', 'cooker', 'entrance', 'patio',
    'outdoor-dining', 'gym', 'cleaning', 'calendar', 'self-checkin',
    'shower', 'hairdryer', 'shampoo', 'hot-water', 'shower-gel', 'washer',
    'hangers', 'bed-linen', 'blinds', 'iron', 'wardrobe', 'cot', 'tv', 'ac', 'fan'
  ]);
  const isStroked = strokedIcons.has(name);

  return (
    <svg
      viewBox="0 0 32 32"
      fill={isStroked ? 'none' : 'currentColor'}
      stroke={isStroked ? 'currentColor' : 'none'}
      width="24"
      height="24"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {pathData}
    </svg>
  );
};

export default function Amenities({ amenities = [] }) {
  const [showAll, setShowAll] = useState(false);
  const modalRef = useRef(null);

  useKeyboard({ Escape: () => setShowAll(false) }, showAll);
  useFocusTrap(modalRef, showAll);

  useEffect(() => {
    if (!showAll) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [showAll]);

  if (!amenities.length) return null;

  // Group by category
  const grouped = amenities.reduce((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  const displayed = amenities.slice(0, 10);

  return (
    <section id="amenities" className={styles.section} aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className={styles.heading}>What this place offers</h2>

      <ul className={styles.grid} aria-label="Amenity list">
        {displayed.map((a) => (
          <li key={a.id} className={`${styles.item} ${a.available === false ? styles.unavailable : ''}`}>
            <span className={styles.icon}>
              <AmenityIcon name={a.icon} />
            </span>
            <span className={styles.name}>{a.name}</span>
          </li>
        ))}
      </ul>

      {amenities.length > 10 && (
        <button
          className={styles.showAllBtn}
          onClick={() => setShowAll(true)}
          aria-label="Show all 50 amenities"
          aria-expanded={showAll ? "true" : "false"}
        >
          Show all 50 amenities
        </button>
      )}

      {/* Modal */}
      {showAll && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="amenities-modal-heading"
          onClick={(e) => e.target === e.currentTarget && setShowAll(false)}
          ref={modalRef}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <button
                className={styles.closeBtn}
                onClick={() => setShowAll(false)}
                aria-label="Close amenities"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M25.333 8.549 23.451 6.667 16 14.118 8.549 6.667 6.667 8.549 14.118 16l-7.451 7.451 1.882 1.882L16 17.882l7.451 7.451 1.882-1.882L17.882 16z" />
                </svg>
              </button>
              <h3 id="amenities-modal-heading" className={styles.modalTitle}>
                What this place offers
              </h3>
            </div>

            <div className={styles.modalBody}>
              {Object.keys(grouped).sort().map((category) => (
                <div key={category} className={styles.categoryGroup}>
                  <h4 className={styles.categoryTitle}>{category}</h4>
                  <ul className={styles.categoryList}>
                    {grouped[category].map((a) => (
                      <li key={a.id} className={`${styles.modalItem} ${a.available === false ? styles.unavailable : ''}`}>
                        <span className={styles.icon}>
                          <AmenityIcon name={a.icon} />
                        </span>
                        <span className={styles.name}>{a.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.divider} />
    </section>
  );
}
