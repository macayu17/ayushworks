import { useEffect, useState } from 'react';
import './DecryptedText.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function DecryptedText({ text, className = '', speed = 50, showCursor = true }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval;

    const animate = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }

        iteration += 1 / 3;
      }, speed);
    };

    animate();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [text, speed]);

  return (
    <span className={`decrypted-text ${isComplete ? 'complete' : ''} ${className}`}>
      {displayText}
      {showCursor && <span className="cursor">|</span>}
    </span>
  );
}
