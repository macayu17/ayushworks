import { useEffect, useRef, useState } from 'react';
import './SectionIndex.css';

const homeSections = [
  { id: 'home', label: 'Intro' },
  { id: 'contributions', label: 'GitHub' },
  { id: 'projects', label: 'Projects' },
  { id: 'open-source-preview', label: 'Open Source' },
  { id: 'skills', label: 'Skills' },
];

export default function SectionIndex({ sections: staticSections = homeSections, sourceSelector, anchorSelector = '#skills', wide = false }) {
  const [sections, setSections] = useState(sourceSelector ? [] : staticSections);
  const [activeId, setActiveId] = useState(staticSections[0]?.id);
  const [offsetY, setOffsetY] = useState(0);
  const offsetRef = useRef(0);
  const asideRef = useRef(null);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    if (!sourceSelector) return undefined;
    const updateSections = () => setSections(
      [...document.querySelectorAll(sourceSelector)]
        .filter((element) => element.id)
        .map((element) => ({ id: element.id, label: element.dataset.sectionIndex })),
    );
    updateSections();
    const container = document.getElementById('main-content');
    const observer = new MutationObserver(updateSections);
    observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['id', 'data-section-index'] });
    return () => observer.disconnect();
  }, [sourceSelector]);

  useEffect(() => {
    const updateAnchorOffset = () => {
      const aside = asideRef.current;
      if (!aside) {
        return;
      }
      const anchorEl = anchorSelector
        ? document.querySelector(anchorSelector)
        : document.getElementById(sections.at(-1)?.id);
      if (!anchorEl) {
        if (offsetRef.current !== 0) {
          offsetRef.current = 0;
          setOffsetY(0);
        }
        return;
      }
      const asideRect = aside.getBoundingClientRect();
      const anchorBottom = anchorEl.getBoundingClientRect().bottom;
      const baseBottom = asideRect.bottom - offsetRef.current;
      const delta = anchorBottom - baseBottom;
      const next = delta < 0 ? delta : 0;
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && anchorSelector) {
        const sidebarBottom = window.innerHeight / 2 + sidebar.offsetHeight / 2;
        sidebar.style.setProperty('--home-sidebar-offset', `${Math.min(anchorBottom - sidebarBottom, 0)}px`);
      }
      if (Math.abs(next - offsetRef.current) > 0.5) {
        offsetRef.current = next;
        setOffsetY(next);
      }
    };

    updateAnchorOffset();
    window.addEventListener('scroll', updateAnchorOffset, { passive: true });
    window.addEventListener('resize', updateAnchorOffset);

    return () => {
      window.removeEventListener('scroll', updateAnchorOffset);
      window.removeEventListener('resize', updateAnchorOffset);
      document.querySelector('.sidebar')?.style.removeProperty('--home-sidebar-offset');
    };
  }, [anchorSelector, sections]);

  useEffect(() => {
    const updateActiveSection = () => {
      if (Date.now() < lockUntilRef.current) {
        return;
      }
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      if (sectionElements.length === 0) {
        return;
      }

      const anchorY = Math.min(window.innerHeight * 0.32, 320);
      const positioned = sectionElements.map((element) => ({
        element,
        top: element.getBoundingClientRect().top,
      }));
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atPageEnd ? positioned.at(-1) : positioned.reduce((active, section) => (
        section.top <= anchorY && section.top > active.top + 1 ? section : active
      ), positioned[0]);

      setActiveId(current.element.id);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sections]);

  const handleNavigate = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    setActiveId(id);
    lockUntilRef.current = Date.now() + 900;
    const anchorY = Math.min(window.innerHeight * 0.32, 320);
    const top = target.getBoundingClientRect().top + window.scrollY - anchorY + 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <aside
      ref={asideRef}
      className={`section-index${wide ? ' section-index-projects' : ''}`}
      aria-label="Page sections"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <span className="section-index-title">Index</span>
      <nav className="section-index-nav">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            title={section.label}
            className={`section-index-link ${activeId === section.id ? 'active' : ''}`}
            onClick={(event) => handleNavigate(event, section.id)}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
