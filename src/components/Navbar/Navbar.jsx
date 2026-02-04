import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Check if at bottom of page or contact section is visible
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        if (isAtBottom || contactRect.top <= window.innerHeight / 2) {
          setActiveSection('contact');
          return;
        }
      }

      // Check other sections
      const sections = ['projects', 'about', 'home'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            return;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const navStyle = {
    position: 'fixed',
    top: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    background: scrolled ? 'rgba(17, 17, 17, 0.6)' : 'rgba(17, 17, 17, 0.4)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '50px',
    padding: '0.6rem 1.5rem',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
  };

  const logoStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'JetBrains Mono', monospace"
  };

  const bracketStyle = {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: 'rgba(255, 255, 255, 0.5)'
  };

  const textStyle = {
    fontSize: '1.1rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const menuStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '0.25rem',
    alignItems: 'center',
    margin: 0,
    padding: 0
  };

  const linkStyle = (isActive) => ({
    background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    border: 'none',
    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => scrollToSection('home')}>
        <span style={bracketStyle}>{`{`}</span>
        <span style={textStyle}>ayush</span>
        <span style={bracketStyle}>{`}`}</span>
      </div>
      <ul style={menuStyle}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              style={linkStyle(activeSection === item.id)}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                }
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
