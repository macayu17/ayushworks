import './Projects.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { projectCatalog } from '../../data/projects';

const stopCardNavigation = (event) => {
  event.stopPropagation();
};

const Projects = ({
  items = projectCatalog,
  title = '// PROJECTS',
  intro = 'Open any project to see the full breakdown, stack, and links.',
  showArchiveLink = false,
  showHeader = true,
  showThumbnail = true,
  sectionId = 'projects'
}) => {
  const navigate = useNavigate();

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
            glareEnable={true} 
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
                <span className={`traffic-dot ${project.live ? 'pulse-live' : ''}`}></span>
              </div>

              {showThumbnail && (
                <div className={`project-cover ${project.image ? 'has-image' : 'is-fallback'}`}>
                  {project.image ? (
                    <img src={project.image} alt={`${project.title} preview`} className="project-cover-image" />
                  ) : (
                    <div className="project-cover-fallback">
                      <span className="project-cover-label">{project.category}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Card body */}
              <div className="project-body">
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
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="project-tag">#{tag}</span>
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
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="project-details-link"
                      onClick={stopCardNavigation}
                    >
                      Details
                      <FaArrowRight size={12} />
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
