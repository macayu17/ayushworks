import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaUser, FaCode, FaEnvelope } from 'react-icons/fa';
import { GiOwl } from 'react-icons/gi';

const navItems = [
  { path: '/', icon: <FaHome size={20} />, label: 'Home' },
  { path: '/about', icon: <FaUser size={20} />, label: 'About' },
  { path: '/skill', icon: <FaCode size={20} />, label: 'Skills' },
  { path: '/contact', icon: <FaEnvelope size={20} />, label: 'Contact' },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <NavLink to="/" className="sidebar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="12" y="16" width="12" height="12" rx="5" />
            <path d="M24 16v12" />
          </svg>
        </NavLink>

        {/* Nav Items */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              title={item.label}
              aria-label={item.label}
              end={item.path === '/'}
            >
              {item.icon}
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
            </NavLink>
          ))}
          
          <a
            href="https://codolio.com/profile/anayush"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-nav-item"
            title="Codolio Profile"
            aria-label="Codolio Profile"
          >
            <GiOwl size={20} />
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
          </a>
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav-inner">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              aria-label={item.label}
              end={item.path === '/'}
            >
              <div className="icon-wrap">
                {item.icon}
              </div>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
          
          <a
            href="https://codolio.com/profile/macayu17"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-item"
            aria-label="Codolio Profile"
          >
            <div className="icon-wrap">
              <GiOwl size={20} />
            </div>
            <span className="nav-label">Codolio</span>
          </a>
        </div>
      </nav>
    </>
  );
}
