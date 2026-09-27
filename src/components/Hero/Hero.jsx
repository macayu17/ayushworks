import { Fragment, useState, useEffect, useRef } from 'react';
import ProfileIntro from './ProfileIntro';
import './Hero.css';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaFileAlt, FaMoon, FaSun } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { NavLink, Link } from 'react-router-dom';
import { getPortfolioViewCount } from '../../utils/viewCounter';
import SocialHoverCard from '../SocialHoverCard/SocialHoverCard';

const texts = ['22 • Bengaluru, India', 'CSE undergrad • AI + full-stack'];
const WORD_MS = 30;

let introWordIndex = 0;
const introLines = [
  { parts: [{ text: 'I build full-stack apps, AI tools, and backend systems.' }] },
  { parts: [{ text: 'I like working on ideas that are just hard enough to be interesting.' }] },
  { parts: [{ text: 'Lately: agents, memory, automation, infra, and product UX.' }] },
  {
    parts: [
      { text: 'Currently building' },
      { text: 'Engram,', strong: true },
      { text: 'Sentinel,', strong: true },
      { text: 'and a few AI-native experiments.' },
    ],
  },
].map((line) => ({
  ...line,
  parts: line.parts.map((part) => ({
    ...part,
    words: part.text.split(' ').map((text) => ({ text, index: introWordIndex++ })),
  })),
}));
const INTRO_WORD_COUNT = introWordIndex;
const StreamingParts = ({ parts }) => parts.map((part, partIndex) => {
  const words = part.words.map(({ text, index }) => (
    <Fragment key={`${text}-${index}`}>
      <span
        className="hero-intro-word"
        style={{ '--word-delay': `${index * WORD_MS}ms` }}
      >
        {text}
      </span>{' '}
    </Fragment>
  ));

  return part.strong ? (
    <strong key={partIndex}>{words}</strong>
  ) : (
    <Fragment key={partIndex}>{words}</Fragment>
  );
});

const AnimatedSubtitle = () => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <p className="hero-subtitle">
      {displayText}
      <span className="cursor animate-blink" />
    </p>
  );
};

const Hero = ({ theme, toggleTheme, onOpenCmdk }) => {
  const [views, setViews] = useState(null);
  const profileRef = useRef(null);

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

  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-identity-row">
          <div className="hero-profile-box" ref={profileRef}>
            <img src="/favicon.png" alt="Ayush Kumar" className="hero-profile-img" />
          </div>
          <div className="hero-name-block">
            <h1 className="hero-name">AYUSH</h1>
            <AnimatedSubtitle />
          </div>
        </div>

        <div className="hero-intro">
          <p><StreamingParts parts={introLines[0].parts} /></p>
          <ul>
            {introLines.slice(1).map((line, index) => (
              <li key={index}><StreamingParts parts={line.parts} /></li>
            ))}
          </ul>
        </div>

        <div className="hero-social-box hero-social-ready" style={{ '--social-delay': `${INTRO_WORD_COUNT * WORD_MS + 250}ms` }}>
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
      <ProfileIntro targetRef={profileRef} />
    </section>
  );
};

export default Hero;
