import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { getProjectBySlug, projectCatalog } from '../data/projects';
import './ProjectDetail.css';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const currentIndex = projectCatalog.findIndex((entry) => entry.slug === slug);
  const nextProject =
    currentIndex >= 0 && currentIndex < projectCatalog.length - 1
      ? projectCatalog[currentIndex + 1]
      : projectCatalog[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <MotionDiv
        className="page-transition"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <section className="project-detail project-detail-missing">
          <div className="section-header">
            <span>// PROJECT DETAIL</span>
          </div>
          <h1 className="project-detail-missing-title">Project not found</h1>
          <p className="project-detail-missing-copy">
            The project route does not match anything in the current archive.
          </p>
          <Link to="/projects" className="project-detail-back">
            <FaArrowLeft size={12} />
            Back to projects
          </Link>
        </section>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className="page-transition"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <section className="project-detail" style={{ '--project-accent': project.accent }}>
        <Link to="/projects" className="project-detail-back">
          <FaArrowLeft size={12} />
          Back to projects
        </Link>

        <header className="project-detail-hero">
          <div className="project-detail-copy">
            <div className="project-detail-meta-line">
              <span className="project-detail-kicker">// PROJECT DETAIL</span>
              <span className="project-detail-status">{project.status}</span>
            </div>

            <p className="project-detail-category">{project.category}</p>
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-summary">{project.summary}</p>

            <div className="project-detail-links">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail-link primary"
                >
                  Visit live
                  <FaExternalLinkAlt size={12} />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail-link"
                >
                  View source
                  <FaGithub size={14} />
                </a>
              )}
            </div>
          </div>

          <div className={`project-detail-visual ${project.image ? 'has-image' : 'is-fallback'}`}>
            {project.image ? (
              <img src={project.image} alt={`${project.title} interface preview`} />
            ) : (
              <div className="project-detail-visual-fallback">
                <span>{project.category}</span>
              </div>
            )}
          </div>
        </header>

        <div className="project-detail-facts">
          <article className="project-fact-card">
            <span className="project-fact-label">Category</span>
            <strong>{project.category}</strong>
          </article>
          <article className="project-fact-card">
            <span className="project-fact-label">Status</span>
            <strong>{project.status}</strong>
          </article>
          <article className="project-fact-card">
            <span className="project-fact-label">Stack</span>
            <strong>{project.tags.slice(0, 2).join(' / ')}</strong>
          </article>
        </div>

        <section className="project-detail-section">
          <div className="section-header">
            <span>// OVERVIEW</span>
          </div>

          <div className="project-detail-text">
            {project.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="project-detail-section">
          <div className="section-header">
            <span>// HIGHLIGHTS</span>
          </div>

          <ul className="project-highlight-list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="project-detail-section">
          <div className="section-header">
            <span>// STACK</span>
          </div>

          <div className="project-stack-list">
            {project.tags.map((tag) => (
              <span key={tag} className="project-stack-chip">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <nav className="project-detail-navigation" aria-label="Project navigation">
          <Link to="/projects" className="project-detail-nav-link">
            All projects
          </Link>

          {nextProject && (
            <Link to={`/projects/${nextProject.slug}`} className="project-detail-nav-link next">
              Next project: {nextProject.title}
              <FaArrowRight size={12} />
            </Link>
          )}
        </nav>
      </section>
    </MotionDiv>
  );
};

export default ProjectDetail;
