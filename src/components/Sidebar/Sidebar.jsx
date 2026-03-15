import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { path: '/', icon: <FaHome size={20} />, label: 'Home' },
  { path: '/about', icon: <FaUser size={20} />, label: 'About' },
  { path: '/skill', icon: <FaCode size={20} />, label: 'Skills' },
  { path: '/chat', icon: <FaEnvelope size={20} />, label: 'Chat' },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <NavLink to="/" className="sidebar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 14v12" />
            <path d="M12 20a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v6" />
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
        </div>
      </nav>
    </>
  );
}
