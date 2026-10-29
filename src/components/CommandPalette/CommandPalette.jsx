import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaEnvelope, FaFolderOpen, FaFileAlt, FaMoon, FaSun, FaSearch, FaGithub, FaLinkedinIn, FaCodeBranch } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './CommandPalette.css';
import TypedPrompt from './TypedPrompt';

const buildCommands = (navigate, toggleTheme, theme) => [
  { id: 'contact', group: 'Quick actions', label: 'Say hi', detail: 'Get in touch', icon: <FaEnvelope />, action: () => navigate('/contact') },
  { id: 'theme', group: 'Quick actions', label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme', detail: 'A change of scenery', icon: theme === 'dark' ? <FaSun /> : <FaMoon />, action: toggleTheme },
  { id: 'home', group: 'Pages', label: 'Home', detail: 'The front page', icon: <FaHome />, action: () => navigate('/') },
  { id: 'projects', group: 'Pages', label: 'Projects', detail: "Things I've built", icon: <FaFolderOpen />, action: () => navigate('/projects') },
  { id: 'opensource', group: 'Pages', label: 'Open source', detail: 'My pull requests and contributions', icon: <FaCodeBranch />, action: () => navigate('/open-source') },
  { id: 'about', group: 'Pages', label: 'About', detail: 'A little about me', icon: <FaUser />, action: () => navigate('/about') },
  { id: 'skills', group: 'Pages', label: 'Skills', detail: 'My toolkit', icon: <FaCode />, action: () => navigate('/skill') },
  { id: 'resume', group: 'Pages', label: 'Resume', detail: 'Experience and education', icon: <FaFileAlt />, action: () => navigate('/resume') },
  { id: 'github', group: 'Elsewhere', label: 'GitHub', detail: 'github.com/macayu17', external: true, icon: <FaGithub />, action: () => window.open('https://github.com/macayu17', '_blank', 'noopener,noreferrer') },
  { id: 'linkedin', group: 'Elsewhere', label: 'LinkedIn', detail: 'Connect with me', external: true, icon: <FaLinkedinIn />, action: () => window.open('https://www.linkedin.com/in/anayush14/', '_blank', 'noopener,noreferrer') },
  { id: 'x', group: 'Elsewhere', label: 'X / Twitter', detail: '@ayush_174_', external: true, icon: <FaXTwitter />, action: () => window.open('https://x.com/ayush_174_', '_blank', 'noopener,noreferrer') },
];

const CommandPalette = ({ isOpen, onOpen, onClose, theme, toggleTheme, docked }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlight, setHighlight] = useState({ top: 0, height: 36 });
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const previousFocus = useRef(null);
  const navigate = useNavigate();
  const commands = useMemo(() => buildCommands(navigate, toggleTheme, theme), [navigate, toggleTheme, theme]);
  const filtered = useMemo(() => commands.filter((cmd) => `${cmd.label} ${cmd.detail} ${cmd.group}`.toLowerCase().includes(query.trim().toLowerCase())), [commands, query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocus.current = document.activeElement;
    const shell = document.querySelector('.app-shell');
    const previousOverflow = document.body.style.overflow;
    if (shell) shell.inert = true;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      window.clearTimeout(timer);
      if (shell) shell.inert = false;
      document.body.style.overflow = previousOverflow;
      const target = previousFocus.current;
      window.requestAnimationFrame(() => {
        if (target?.isConnected) target.focus();
        else document.querySelector('.cmdk-trigger')?.focus();
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const row = listRef.current?.querySelector(`[data-command-index="${activeIndex}"]`);
    if (row) {
      setHighlight({ top: row.offsetTop, height: row.offsetHeight });
      row.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, [activeIndex, filtered, isOpen]);

  const close = () => onClose();
  const open = () => { setQuery(''); setActiveIndex(0); onOpen(); };
  const execute = (command) => { command.action(); close(); };
  const handleKey = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((index) => filtered.length ? (index + direction + filtered.length) % filtered.length : 0);
    }
    if (event.key === 'Enter' && event.target === inputRef.current && filtered[activeIndex]) { event.preventDefault(); execute(filtered[activeIndex]); }
    if (event.key === 'Tab') {
      event.preventDefault();
      if (document.activeElement === inputRef.current) document.querySelector('.cmdk-close')?.focus();
      else inputRef.current?.focus();
    }
  };

  return (
    <>
      <div className={`cmdk-overlay${isOpen ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <div className={`cmdk-panel${isOpen ? ' is-open' : ''}${docked ? ' is-docked' : ''}`} role={isOpen ? 'dialog' : undefined} aria-modal={isOpen || undefined} aria-label={isOpen ? 'Search and navigate' : undefined} onKeyDown={isOpen ? handleKey : undefined}>
        <div className="cmdk-menu" inert={!isOpen} aria-hidden={!isOpen}>
          <div className="cmdk-menu-inner">
            <div className="cmdk-list" ref={listRef} id="command-results" role="listbox" aria-label="Commands">
              <span className="cmdk-highlight" aria-hidden="true" style={{ transform: `translateY(${highlight.top}px)`, height: highlight.height, opacity: filtered.length ? 1 : 0 }} />
              {filtered.length === 0 && <div className="cmdk-empty" role="status">No results. Try “projects” or “theme”.</div>}
              {filtered.map((cmd, i) => (
                <div key={cmd.id}>
                  {(i === 0 || filtered[i - 1].group !== cmd.group) && <div className="cmdk-group">{cmd.group}</div>}
                  <button type="button" id={`command-${cmd.id}`} data-command-index={i} role="option" aria-selected={i === activeIndex} tabIndex={-1} className={`cmdk-item${i === activeIndex ? ' active' : ''}`} onClick={() => execute(cmd)} onPointerEnter={() => setActiveIndex(i)}>
                    <span className="cmdk-item-icon">{cmd.icon}</span>
                    <span className="cmdk-item-label">{cmd.label}</span>
                    <span className="cmdk-item-detail">{cmd.detail}</span>
                    {cmd.external && <span className="cmdk-external" aria-label="Opens in new tab">↗</span>}
                  </button>
                </div>
              ))}
            </div>
            <div className="cmdk-hint"><span>↑ ↓ to explore</span><span>↵ to open</span></div>
          </div>
        </div>
        {isOpen ? (
          <div className="cmdk-input-row">
            <FaSearch className="cmdk-search-icon" />
            <input ref={inputRef} role="combobox" aria-label="Search pages and commands" aria-expanded="true" aria-controls="command-results" aria-autocomplete="list" aria-activedescendant={filtered[activeIndex] ? `command-${filtered[activeIndex].id}` : undefined} placeholder="Where would you like to go?" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} className="cmdk-input" />
            <button type="button" className="cmdk-close" onClick={close} aria-label="Close search"><kbd>esc</kbd></button>
          </div>
        ) : (
          <button type="button" ref={triggerRef} className="cmdk-trigger cmdk-input-row" onClick={open} aria-label="Open search" aria-haspopup="dialog" aria-expanded="false">
            <FaSearch className="cmdk-search-icon" />
            <TypedPrompt />
            <kbd>/</kbd>
          </button>
        )}
      </div>
    </>
  );
};

export default CommandPalette;
