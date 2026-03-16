import { useState, useEffect } from 'react';
import './Hero.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';

const texts = ['Based in Bengaluru, India', 'Undergrad pursuing CSE'];

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Fetch and increment page views using a free public counter API
    const fetchViews = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/macayu17/portfolio/up');
        const data = await response.json();
        if (data && data.count) {
          setViews(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };
    fetchViews();
  }, []);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 60);
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

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
          <span>{views > 0 ? views.toLocaleString() : '...'} views</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
