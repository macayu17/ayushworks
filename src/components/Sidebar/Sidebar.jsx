import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaUser, FaCode, FaEnvelope, FaFolderOpen } from 'react-icons/fa';
import { GiOwl } from 'react-icons/gi';

const navItems = [
  { path: '/', icon: <FaHome size={15} />, label: 'Home' },
  { path: '/projects', icon: <FaFolderOpen size={15} />, label: 'Projects' },
  { path: '/about', icon: <FaUser size={15} />, label: 'About' },
  { path: '/skill', icon: <FaCode size={15} />, label: 'Skills' },
  { path: 'https://codolio.com/profile/anayush', icon: <GiOwl size={15} />, label: 'Codolio', external: true },
  { path: '/contact', icon: <FaEnvelope size={15} />, label: 'Contact' },
];

export default function Sidebar({ isWideRoute = false }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`sidebar${isWideRoute ? ' sidebar-wide' : ''}`}>
        {/* Logo */}
        <NavLink to="/" className="sidebar-logo" aria-label="Home">
          <img src="/favicon.png" alt="Ayush" className="sidebar-logo-img" />
        </NavLink>

        {/* Nav Items */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(item => {
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-nav-item"
                  title={item.label}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="corner tl"></span>
                  <span className="corner tr"></span>
                  <span className="corner bl"></span>
                  <span className="corner br"></span>
                </a>
              );
            }
            return (
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
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav-inner">
          {navItems.map(item => {
            const handleVibrate = () => {
              if (navigator.vibrate) {
                navigator.vibrate(50);
              }
            };

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-item"
                  aria-label={item.label}
                  onClick={handleVibrate}
                >
                  <div className="icon-wrap">
                    {item.icon}
                  </div>
                  <span className="nav-label">{item.label}</span>
                </a>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                end={item.path === '/'}
                onClick={handleVibrate}
              >
                <div className="icon-wrap">
                  {item.icon}
                </div>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
