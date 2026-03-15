import { useState, useEffect } from 'react';
import './Hero.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';

const Hero = () => {
  const fullText = 'Based in Bengaluru, India';
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
      <div className="hero-left">
        <p className="hero-greeting">Hi, I'm 👋</p>

        <h1 className="hero-name">
          AYUSH
          <svg className="hero-verified" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </h1>

        <p className="hero-subtitle">
          {displayText}
          <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
        </p>
      </div>

      <div className="hero-right">
        <div className="hero-social-box">
          <a href="https://github.com/macayu17" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/anayush14/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://x.com/ayush_174_" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="X">
            <FaXTwitter size={20} />
          </a>
        </div>
        <div className="hero-views-box">
          <FiEye className="hero-views-icon" />
          <span>430 views</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
