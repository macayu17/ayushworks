import './Projects.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { projectCatalog } from '../../data/projects';
import { getTechIcon } from '../../utils/techIcons';

const stopCardNavigation = (event) => {
  event.stopPropagation();
};

const Projects = ({
  theme,
  items = projectCatalog,
  title = '// PROJECTS',
  intro = 'Open any project to see the full breakdown, stack, and links.',
  showArchiveLink = false,
  showHeader = true,
  showThumbnail = true,
  sectionId = 'projects'
}) => {
  const navigate = useNavigate();
  const [enableCardTilt, setEnableCardTilt] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 640px) and (hover: hover) and (pointer: fine)');
    const updateTilt = () => setEnableCardTilt(mediaQuery.matches);

    updateTilt();
    mediaQuery.addEventListener('change', updateTilt);

    return () => {
      mediaQuery.removeEventListener('change', updateTilt);
    };
  }, []);

  const openProject = (slug) => {
    navigate(`/projects/${slug}`);
  };

  const handleCardKeyDown = (event, slug) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(slug);
    }
  };

  return (
    <section className="projects" id={sectionId || undefined}>
      {showHeader && (
        <>
          <div className="section-header">
            <span>{title}</span>
            {showArchiveLink ? (
              <Link to="/projects" className="projects-header-link">
                View all
                <FaArrowRight size={12} />
              </Link>
            ) : (
              <span className="projects-counter">
                {String(items.length).padStart(2, '0')} projects
              </span>
            )}
          </div>

          {intro && <p className="projects-intro">{intro}</p>}
        </>
      )}

      <div className="projects-grid">
        {items.map((project) => (
          <Tilt 
            key={project.slug}
            tiltMaxAngleX={4} 
            tiltMaxAngleY={4} 
            scale={1.01} 
            transitionSpeed={2500} 
            tiltEnable={enableCardTilt}
            glareEnable={enableCardTilt}
            glareMaxOpacity={0.05} 
            glareColor="#ffffff" 
            glarePosition="bottom" 
            className="tilt-wrapper"
          >
            <article
              className="project-card"
              role="link"
              tabIndex={0}
              onClick={() => openProject(project.slug)}
              onKeyDown={(event) => handleCardKeyDown(event, project.slug)}
              style={{ '--project-accent': project.accent }}
              aria-label={`Open ${project.title} project details`}
            >
              {/* Header dots */}
              <div className="project-header-dots">
                <span className="traffic-dot"></span>
                <span className="traffic-dot"></span>
                <span className={`traffic-dot ${project.status === 'Building' ? 'pulse-building' : project.live ? 'pulse-live' : ''}`}></span>
              </div>

              {showThumbnail && (
                <div className={`project-cover ${project.image || project.imageDark || project.imageLight ? 'has-image' : 'is-fallback'}`}>
                  {(() => {
                    const themedImage = theme === 'light'
                      ? (project.imageLight || project.imageDark || project.image)
                      : (project.imageDark || project.imageLight || project.image);
                    if (themedImage) {
                      return (
                        <img
                          src={themedImage}
                          srcSet={`${themedImage.replace('.webp', '-480.webp')} 480w, ${themedImage} 1200w`}
                          sizes="(max-width: 639px) calc((100vw - 66px) / 2), (max-width: 767px) calc(100vw - 64px), 480px"
                          alt={`${project.title} preview`}
                          className="project-cover-image"
                          loading="lazy"
                          decoding="async"
                        />
                      );
                    }
                    return (
                      <div className="project-cover-fallback">
                        <span className="project-cover-label">{project.category}</span>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Card body */}
              <div className="project-body">
                <p className="project-stack">{project.tags.slice(0, 3).join(' · ')}</p>
                <div className="project-title-row">
                  <div className="project-title-copy">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-category">{project.category}</p>
                  </div>
                  <span className="project-status">{project.status}</span>
                </div>

                <p className="project-description">{project.summary}</p>

                <div className="project-footer">
                  <div className="project-tags">
                    {project.tags
                      .map((tag) => ({ tag, icon: getTechIcon(tag) }))
                      .filter((entry) => entry.icon)
                      .slice(0, 6)
                      .map(({ tag, icon }) => (
                        <span key={tag} className="project-tag" title={tag}>
                          <img
                            src={icon}
                            alt={tag}
                            className="project-tag-icon"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => { e.currentTarget.parentElement.remove(); }}
                          />
                        </span>
                      ))}
                  </div>

                  <div className="project-actions">
                    <div className="project-links">
                      {project.live && (
                        <a
                          href={project.live}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} live site`}
                          onClick={stopCardNavigation}
                        >
                          <FaExternalLinkAlt size={14} />
                          <span className="project-link-label">Live</span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code`}
                          onClick={stopCardNavigation}
                        >
                          <FaGithub size={15} />
                          <span className="project-link-label">GitHub</span>
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="project-details-link"
                      aria-label={`Open ${project.title} details`}
                      title={`${project.title} details`}
                      onClick={stopCardNavigation}
                    >
                      <FaArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default Projects;
