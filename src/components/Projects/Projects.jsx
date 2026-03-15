import './Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'Occasio',
      status: 'Live',
      description: 'Event booking with payments, QR tickets & admin dashboard.',
      tags: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Razorpay'],
      github: 'https://github.com/macayu17/events-management-booking.git',
      live: 'https://occasio.ayushh.in/'
    },
    {
      title: 'GridPulse',
      status: 'Live',
      description: 'F1 race analytics with telemetry replay & track visualization.',
      tags: ['React', 'Vite', 'FastAPI', 'Python', 'Docker'],
      github: 'https://github.com/macayu17/f1-replay-system.git',
      live: 'https://pitwall.ayushh.in/'
    },
    {
      title: "Parkinson's Screening",
      status: 'Research',
      description: 'Clinical screening using transformer-based ML models.',
      tags: ['Python', 'PyTorch', 'Flask', 'Transformers'],
      github: 'https://github.com/macayu17/Parkinsons-Disease-Assesment-Portal.git',
      live: 'https://huggingface.co/spaces/Penguindrum920/Parkinson_Disease_Assesment_Portal'
    },
    {
      title: 'FraudKavach',
      status: 'Completed',
      description: 'Fintech payment simulator with fraud detection & explainable risk scoring.',
      tags: ['React', 'TypeScript', 'Node.js', 'Express.js'],
      github: 'https://github.com/macayu17/FraudKavach.git',
      live: null
    },
    {
      title: 'StockFlow',
      status: 'Completed',
      description: 'Paper-trading platform with real-time quotes, portfolios & leaderboards.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
      github: 'https://github.com/macayu17/Trade-Wars.git',
      live: null
    },
    {
      title: 'Multimodal Sentiment',
      status: 'In Progress',
      description: 'Sentiment analysis using text, vision & audio transformers.',
      tags: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
      github: 'https://github.com/macayu17',
      live: null
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <span>// PROJECTS</span>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Browser mockup header */}
            <div className="project-browser-bar">
              <span className="traffic-dot red"></span>
              <span className="traffic-dot yellow"></span>
              <span className="traffic-dot green"></span>
            </div>

            {/* Card body */}
            <div className="project-body">
              <div className="project-title-row">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-status">{project.status}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                  <span>Code</span>
                </a>
                {project.live && (
                  <a href={project.live} className="project-link" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
