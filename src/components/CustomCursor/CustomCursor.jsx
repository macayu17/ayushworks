import { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(null);
  const boundElementsRef = useRef(new Set());
  const observerRef = useRef(null);

  const updatePosition = useCallback((e) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  const bindElement = useCallback((el) => {
    if (!boundElementsRef.current.has(el)) {
      boundElementsRef.current.add(el);
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    }
  }, [handleMouseEnter, handleMouseLeave]);

  const unbindElement = useCallback((el) => {
    if (boundElementsRef.current.has(el)) {
      boundElementsRef.current.delete(el);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    // Check if device supports hover (i.e., not touch-only)
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    window.addEventListener('mousemove', updatePosition, { passive: true });

    const bindAllClickables = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      clickables.forEach(bindElement);
    };

    const unbindAll = () => {
      boundElementsRef.current.forEach(unbindElement);
      boundElementsRef.current.clear();
    };

    bindAllClickables();

    let debounceTimer;
    observerRef.current = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        unbindAll();
        bindAllClickables();
      }, 100);
    });
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      unbindAll();
      observerRef.current?.disconnect();
      clearTimeout(debounceTimer);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updatePosition, bindElement, unbindElement]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out',
        mixBlendMode: 'difference',
        backgroundColor: '#ffffff',
        left: position.x,
        top: position.y,
        width: isHovering ? '24px' : '16px',
        height: isHovering ? '24px' : '16px',
        transform: 'translate(-50%, -50%)',
        opacity: isHovering ? 1 : 0.4
      }}
    />
  );
};

export default CustomCursor;
