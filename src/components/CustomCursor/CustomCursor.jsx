import { useEffect, useRef } from 'react';
import './CustomCursor.css';
import { readVisualEffectsProfile } from '../../utils/visualEffects';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const rafId = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const profile = readVisualEffectsProfile();

    if (!cursor || !profile.cursorEnabled) {
      return undefined;
    }

    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [role="link"], .skill-item';

    const renderCursor = () => {
      const { x, y } = lastPosition.current;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursor.dataset.visible = 'true';
      rafId.current = null;
    };

    const updatePosition = (event) => {
      lastPosition.current = { x: event.clientX, y: event.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(renderCursor);
      }
    };

    const handlePointerOver = (event) => {
      if (event.target.closest?.(interactiveSelector)) {
        cursor.dataset.hover = 'true';
      }
    };

    const handlePointerOut = (event) => {
      const currentInteractive = event.target.closest?.(interactiveSelector);
      const nextInteractive = event.relatedTarget?.closest?.(interactiveSelector);
      if (currentInteractive && currentInteractive !== nextInteractive) {
        cursor.dataset.hover = 'false';
      }
    };

    window.addEventListener('pointermove', updatePosition, { passive: true });
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    return () => {
      window.removeEventListener('pointermove', updatePosition);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};

export default CustomCursor;
