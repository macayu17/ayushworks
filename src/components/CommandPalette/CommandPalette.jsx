import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaEnvelope, FaFolderOpen, FaFileAlt, FaMoon, FaSun, FaSearch, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GiOwl } from 'react-icons/gi';
import './CommandPalette.css';

const buildCommands = (navigate, toggleTheme, theme) => [
  { id: 'home', label: 'Go to Home', icon: <FaHome size={14} />, action: () => navigate('/') },
  { id: 'projects', label: 'Go to Projects', icon: <FaFolderOpen size={14} />, action: () => navigate('/projects') },
  { id: 'about', label: 'Go to About', icon: <FaUser size={14} />, action: () => navigate('/about') },
  { id: 'skills', label: 'Go to Skills', icon: <FaCode size={14} />, action: () => navigate('/skill') },
  { id: 'contact', label: 'Go to Contact', icon: <FaEnvelope size={14} />, action: () => navigate('/contact') },
  { id: 'resume', label: 'Go to Resume', icon: <FaFileAlt size={14} />, action: () => navigate('/resume') },
  { id: 'github', label: 'Open GitHub', icon: <FaGithub size={14} />, action: () => window.open('https://github.com/macayu17', '_blank') },
  { id: 'linkedin', label: 'Open LinkedIn', icon: <FaLinkedinIn size={14} />, action: () => window.open('https://www.linkedin.com/in/anayush14/', '_blank') },
  { id: 'x', label: 'Open X / Twitter', icon: <FaXTwitter size={14} />, action: () => window.open('https://x.com/ayush_174_', '_blank') },
  { id: 'theme', label: theme === 'dark' ? 'Switch to Light' : 'Switch to Dark', icon: theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />, action: toggleTheme },
];

const CommandPalette = ({ isOpen, onClose, theme, toggleTheme }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = useCallback(() => buildCommands(navigate, toggleTheme, theme), [navigate, toggleTheme, theme]);

  const filtered = query
    ? commands().filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()))
    : commands();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].action();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, activeIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <FaSearch size={12} className="cmdk-search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a command to run..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            className="cmdk-input"
          />
          <kbd className="cmdk-esc">ESC</kbd>
        </div>
        <div className="cmdk-list">
          {filtered.length === 0 && (
            <div className="cmdk-empty">No commands found</div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              className={`cmdk-item ${i === activeIndex ? 'active' : ''}`}
              onClick={() => { cmd.action(); onClose(); }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <span className="cmdk-item-icon">{cmd.icon}</span>
              <span className="cmdk-item-label">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
