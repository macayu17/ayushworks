import { useEffect, useRef, useState } from 'react';
import './SectionIndex.css';

const homeSections = [
  { id: 'home', label: 'Intro' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'Open Source' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
];

export default function SectionIndex({ sections = homeSections, anchorSelector = '#education' }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [offsetY, setOffsetY] = useState(0);
  const offsetRef = useRef(0);
  const asideRef = useRef(null);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    const updateAnchorOffset = () => {
      const aside = asideRef.current;
      if (!aside) {
        return;
      }
      const anchorEl = anchorSelector ? document.querySelector(anchorSelector) : null;
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
    };
  }, [anchorSelector]);

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

      const indexNav = document.querySelector('.section-index-nav');
      const navRect = indexNav?.getBoundingClientRect();
      const anchorY = navRect
        ? navRect.top + navRect.height / 2
        : Math.min(window.innerHeight * 0.5, 360);
      const current = sectionElements.reduce((active, section) => {
        if (section.getBoundingClientRect().top <= anchorY) {
          return section;
        }
        return active;
      }, sectionElements[0]);

      setActiveId(current.id);
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
    const navRect = document.querySelector('.section-index-nav')?.getBoundingClientRect();
    const anchorY = navRect ? navRect.top + navRect.height / 2 : 360;
    const top = target.getBoundingClientRect().top + window.scrollY - anchorY + 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <aside
      ref={asideRef}
      className="section-index"
      aria-label="Page sections"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <span className="section-index-title">Index</span>
      <nav className="section-index-nav">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
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
