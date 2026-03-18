import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectsSection from '../components/Projects/Projects';
import { projectCatalog } from '../data/projects';
import './ProjectsPage.css';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            {String(projectCatalog.length).padStart(2, '0')} entries
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

        <div className="projects-page-shell">
          <ProjectsSection items={projectCatalog} showHeader={false} sectionId={null} />
        </div>
      </section>
    </MotionDiv>
  );
};

export default Projects;
