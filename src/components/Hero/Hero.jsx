import { useState, useEffect } from 'react';
import './Hero.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Hero = () => {
  const fullText = 'Computer Science Student';
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="hero" id="home">
      <p className="hero-greeting">Hi, I'm 👋</p>

      <h1 className="hero-name">
        AYUSH
        <svg className="hero-verified" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </h1>

      <p className="hero-subtitle">
        {displayText}
        <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
      </p>

      <div className="hero-bottom-row">
        <div className="hero-socials">
          <a href="https://github.com/macayu17" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/anayush14/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <FaLinkedinIn size={18} />
          </a>
          <a href="https://x.com/ayush_174_" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="X">
            <FaXTwitter size={18} />
          </a>
        </div>

        <div className="hero-status">
          <span className="hero-status-dot"></span>
          Based in Bengaluru
        </div>
      </div>
    </section>
  );
};

export default Hero;
