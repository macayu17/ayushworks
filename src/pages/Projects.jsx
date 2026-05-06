import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import ProjectsSection from '../components/Projects/Projects';
import { projectCatalog } from '../data/projects';
import { filterProjects, getProjectFilterOptions } from '../utils/projectFilters';
import './ProjectsPage.css';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

const Projects = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const filterOptions = useMemo(() => getProjectFilterOptions(projectCatalog), []);
  const filteredProjects = useMemo(
    () => filterProjects(projectCatalog, { query, status, tag }),
    [query, status, tag],
  );
  const hasActiveFilters = query.trim() || status || tag;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearFilters = () => {
    setQuery('');
    setStatus('');
    setTag('');
  };

  return (
    <MotionDiv
      className="page-transition"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <section className="projects-page">
        <div className="section-header">
          <span>// PROJECT ARCHIVE</span>
          <span className="projects-page-count">
            {String(filteredProjects.length).padStart(2, '0')} / {String(projectCatalog.length).padStart(2, '0')} entries
          </span>
        </div>

        <div className="projects-page-hero">
          <p className="projects-page-kicker">Browse the work</p>
          <h1 className="projects-page-title">
            Projects, case studies, and the thinking behind them.
          </h1>
          <p className="projects-page-copy">
            Everything is collected here in one place, with a clearer look at what
            I built, what each project focuses on, and where to explore it further.
          </p>
        </div>

        <div className="projects-filter-panel" aria-label="Project filters">
          <label className="projects-search-field" htmlFor="project-search">
            <FaSearch size={13} aria-hidden="true" />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, stacks, domains..."
              autoComplete="off"
            />
          </label>

          <label className="projects-select-field" htmlFor="project-status">
            <FaFilter size={12} aria-hidden="true" />
            <select
              id="project-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Filter projects by status"
            >
              <option value="">All statuses</option>
              {filterOptions.statuses.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </label>

          <label className="projects-select-field" htmlFor="project-tag">
            <FaFilter size={12} aria-hidden="true" />
            <select
              id="project-tag"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              aria-label="Filter projects by technology"
            >
              <option value="">All stacks</option>
              {filterOptions.tags.map((tagOption) => (
                <option key={tagOption} value={tagOption}>
                  {tagOption}
                </option>
              ))}
            </select>
          </label>

          {hasActiveFilters && (
            <button type="button" className="projects-clear-filters" onClick={clearFilters}>
              <FaTimes size={11} aria-hidden="true" />
              Clear
            </button>
          )}
        </div>

        <div className="projects-page-shell">
          {filteredProjects.length > 0 ? (
            <ProjectsSection items={filteredProjects} showHeader={false} sectionId={null} />
          ) : (
            <div className="projects-page-empty" role="status">
              No matching projects found.
            </div>
          )}
        </div>
      </section>
    </MotionDiv>
  );
};

export default Projects;
