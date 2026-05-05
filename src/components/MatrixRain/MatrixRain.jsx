import { useEffect, useRef } from 'react';
import './MatrixRain.css';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let lastFrame = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let rainDrops = [];

    const initRain = () => {
      columns = canvas.width / fontSize;
      rainDrops = [];
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
      }
    };
    initRain();

    const draw = () => {
      // Semi-transparent zinc-900 to create the trailing effect
      ctx.fillStyle = 'rgba(24, 24, 27, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Faint zinc-700/600 text
      ctx.fillStyle = 'rgba(82, 82, 91, 0.25)';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const animate = (timestamp) => {
      if (timestamp - lastFrame > 42) {
        draw();
        lastFrame = timestamp;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion.matches) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    const handleWindowResize = () => {
      handleResize();
      initRain();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas"></canvas>;
};

export default MatrixRain;
