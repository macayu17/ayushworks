import { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { id: 'home', icon: <FaHome size={20} />, label: 'Home' },
  { id: 'about', icon: <FaUser size={20} />, label: 'About' },
  { id: 'skills', icon: <FaCode size={20} />, label: 'Skills' },
  { id: 'projects', icon: <FaProjectDiagram size={20} />, label: 'Projects' },
  { id: 'contact', icon: <FaEnvelope size={20} />, label: 'Contact' },
];

export default function Sidebar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      const scrollY = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el && section.el.offsetTop <= scrollY) {
          setActive(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo" onClick={() => scrollTo('home')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 14v12" />
            <path d="M12 20a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v6" />
          </svg>
        </div>

        {/* Nav Items */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav-inner">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
            >
              <div className="icon-wrap">
                {item.icon}
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
