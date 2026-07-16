import { useEffect } from 'react';

/**
 * useKeyboard — Attaches keyboard event listeners and cleans up automatically.
 * @param {Object} handlers - Map of key names to handler functions
 * @param {boolean} active - Whether the listener is active
 *
 * Usage:
 *   useKeyboard({ ArrowLeft: prevFn, ArrowRight: nextFn, Escape: closeFn }, isOpen)
 */
export function useKeyboard(handlers, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      const handler = handlers[e.key];
      if (handler) {
        e.preventDefault();
        handler(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, active]);
}

/**
 * useFocusTrap — Traps focus within a container element when active.
 * @param {React.RefObject} containerRef - Ref to the container element
 * @param {boolean} active - Whether focus trap is active
 */
export function useFocusTrap(containerRef, active = true) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement;
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const getFocusable = () => Array.from(container.querySelectorAll(focusableSelectors));

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    // Focus first focusable element when trap activates
    const firstFocusable = getFocusable()[0];
    if (firstFocusable) firstFocusable.focus();

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, active]);
}
