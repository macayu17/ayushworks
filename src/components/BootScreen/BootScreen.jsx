import { useState, useEffect } from 'react';
import './BootScreen.css';

const bootSequence = [
  { text: "INITIALIZING AYUSH_ME v2.0.4...", delay: 300 },
  { text: "Loading kernel modules... ", status: "OK", delay: 150 },
  { text: "Mounting virtual filesystems... ", status: "OK", delay: 100 },
  { text: "Starting network interfaces... ", status: "OK", delay: 200 },
  { text: "Checking memory allocation... ", status: "OK", delay: 100 },
  { text: "Loading graphics drivers: matrix_overlay.ko... ", status: "OK", delay: 300 },
  { text: "Establishing secure connection to mainframe... ", status: "WARN", delay: 400 },
  { text: "Retrying connection... ", status: "OK", delay: 200 },
  { text: "Decrypting user profile data... ", delay: 300 },
  { text: "Access Granted. Welcome, Visitor.", delay: 500 }
];

const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    let timeoutId;
    let isCancelled = false;
    
    const renderNextLine = () => {
      if (isCancelled) return;
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        let nextDelay = bootSequence[currentLine].delay;
        currentLine++;
        timeoutId = setTimeout(renderNextLine, nextDelay);
      } else {
        // Boot sequence finished, trigger fade out
        timeoutId = setTimeout(() => {
          if (isCancelled) return;
          setIsFading(true);
          timeoutId = setTimeout(() => {
            if (!isCancelled) onComplete();
          }, 800); // Wait for fade out CSS transition
        }, 500);
      }
    };

    timeoutId = setTimeout(renderNextLine, 500);
    
    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="scanlines"></div> {/* Reuse global scanlines if available */}
      <div className="boot-content">
        {lines.filter(Boolean).map((line, idx) => (
          <div key={idx} className="boot-line">
            {line?.status && (
              <span className={`boot-status ${line.status === 'WARN' ? 'warn' : ''}`}>
                [{line.status.padStart(4, ' ')}] 
              </span>
            )}
            {!line?.status && line?.text?.includes('INITIALIZING') ? (
              <strong>{line.text}</strong>
            ) : (
              <span> {line?.text}</span>
            )}
          </div>
        ))}
        {!isFading && <div className="boot-cursor"></div>}
      </div>
    </div>
  );
};

export default BootScreen;
