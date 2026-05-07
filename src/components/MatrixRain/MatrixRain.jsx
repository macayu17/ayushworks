import { useEffect, useRef, useState } from 'react';
import './MatrixRain.css';
import { areVisualEffectsProfilesEqual, readVisualEffectsProfile } from '../../utils/visualEffects';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [profile, setProfile] = useState(readVisualEffectsProfile);

  useEffect(() => {
    const updateProfile = () => {
      const nextProfile = readVisualEffectsProfile();
      setProfile((currentProfile) => (
        areVisualEffectsProfilesEqual(currentProfile, nextProfile) ? currentProfile : nextProfile
      ));
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const addQueryListener = (query) => {
      if (query.addEventListener) {
        query.addEventListener('change', updateProfile);
        return;
      }

      query.addListener(updateProfile);
    };
    const removeQueryListener = (query) => {
      if (query.removeEventListener) {
        query.removeEventListener('change', updateProfile);
        return;
      }

      query.removeListener(updateProfile);
    };

    window.addEventListener('resize', updateProfile, { passive: true });
    addQueryListener(motionQuery);
    addQueryListener(hoverQuery);

    return () => {
      window.removeEventListener('resize', updateProfile);
      removeQueryListener(motionQuery);
      removeQueryListener(hoverQuery);
    };
  }, []);

  useEffect(() => {
    if (!profile.matrixEnabled) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let animationFrame = 0;
    let lastFrame = 0;
    let isScrolling = false;
    let isVisible = !document.hidden;
    let scrollTimer;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * profile.matrixPixelRatio);
      canvas.height = Math.floor(height * profile.matrixPixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(
        profile.matrixPixelRatio,
        0,
        0,
        profile.matrixPixelRatio,
        0,
        0,
      );
    };
    handleResize();

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    const fontSize = profile.matrixFontSize;
    const columnWidth = fontSize * profile.matrixColumnStep;
    let columns = Math.ceil(window.innerWidth / columnWidth);
    let rainDrops = [];

    const initRain = () => {
      columns = Math.ceil(window.innerWidth / columnWidth);
      rainDrops = [];
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
      }
    };
    initRain();

    const draw = () => {
      // Semi-transparent zinc-900 to create the trailing effect
      ctx.fillStyle = 'rgba(24, 24, 27, 0.07)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Faint zinc-700/600 text
      ctx.fillStyle = 'rgba(82, 82, 91, 0.22)';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * columnWidth, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const animate = (timestamp) => {
      if (isVisible && !isScrolling && timestamp - lastFrame > profile.matrixFrameInterval) {
        draw();
        lastFrame = timestamp;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    const handleWindowResize = () => {
      handleResize();
      initRain();
    };

    const handleScroll = () => {
      isScrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.clearTimeout(scrollTimer);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [profile]);

  if (!profile.matrixEnabled) {
    return null;
  }

  return <canvas ref={canvasRef} className="matrix-canvas"></canvas>;
};

export default MatrixRain;
