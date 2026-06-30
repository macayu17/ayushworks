import { useState, useEffect } from 'react';
import './Hero.css';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaFileAlt, FaMoon, FaSun } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { NavLink, Link } from 'react-router-dom';
import { getPortfolioViewCount } from '../../utils/viewCounter';
import SocialHoverCard from '../SocialHoverCard/SocialHoverCard';

const texts = ['22 • Bengaluru, India', 'CSE undergrad • AI + full-stack'];

const Hero = ({ theme, toggleTheme, onOpenCmdk }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [views, setViews] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchViews = async () => {
      try {
        const nextViews = await getPortfolioViewCount({
          isViteDev: import.meta.env.DEV,
        });

        if (isActive) {
          setViews(nextViews);
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };

    fetchViews();

    return () => {
      isActive = false;
    };
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
        <div className="hero-identity-row">
          <div className="hero-profile-box">
            <img src="/favicon.png" alt="Ayush Kumar" className="hero-profile-img" />
          </div>
          <div className="hero-name-block">
            <h1 className="hero-name">AYUSH</h1>
            <p className="hero-subtitle">
              {displayText}
              <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
            </p>
          </div>
        </div>

        <div className="hero-intro">
          <p>I build full-stack apps, AI tools, and backend systems.</p>
          <ul>
            <li>I like working on ideas that are just hard enough to be interesting.</li>
            <li>Lately: agents, memory, automation, infra, and product UX.</li>
            <li>
              Currently building <strong>Engram</strong>, <strong>Sentinel</strong>, and a few AI-native experiments.
            </li>
          </ul>
        </div>

        <div className="hero-social-box">
          <SocialHoverCard socialName="GitHub">
            <a href="https://github.com/macayu17" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
              <FaGithub size={16} />
            </a>
          </SocialHoverCard>
          <SocialHoverCard socialName="LinkedIn">
            <a href="https://www.linkedin.com/in/anayush14/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <FaLinkedinIn size={16} />
            </a>
          </SocialHoverCard>
          <SocialHoverCard socialName="X">
            <a href="https://x.com/ayush_174_" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="X">
              <FaXTwitter size={16} />
            </a>
          </SocialHoverCard>
          <Link to="/resume" className="hero-social-link" aria-label="Resume">
            <FaFileAlt size={16} />
          </Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-top-actions">
          <button type="button" className="hero-cmdk-btn" onClick={onOpenCmdk} aria-label="Command palette">
            <kbd>⌘K</kbd>
          </button>
          <button type="button" className="hero-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FaSun size={12} /> : <FaMoon size={12} />}
          </button>
        </div>
        <NavLink to="/contact" className="hero-contact-box" aria-label="Go to contact page">
          <FaEnvelope className="hero-contact-icon" />
          <span>Contact Me</span>
        </NavLink>
        <div className="hero-views-box">
          <FiEye className="hero-views-icon" />
          <span>{typeof views === 'number' ? views.toLocaleString() : '...'} views</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
