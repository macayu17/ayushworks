import './Projects.css';
import { FaReact, FaPython, FaDocker, FaAws, FaNodeJs } from 'react-icons/fa';
import {
  SiVite,
  SiFastapi,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiJsonwebtokens,
  SiVercel,
  SiTailwindcss,
  SiRedis,
  SiRazorpay,
  SiPytorch,
  SiFlask,
  SiHuggingface,
  SiTypescript,
  SiSocketdotio,
  SiTensorflow,
  SiOpencv
} from 'react-icons/si';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import f1Image from '../../assets/images/f1.png';
import occasioImage from '../../assets/images/occasio.png';

const Projects = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  const getTechIcon = (techName) => {
    const iconMap = {
      'React': <FaReact color="#61DAFB" title="React" />,
      'Vite': <SiVite color="#646CFF" title="Vite" />,
      'FastAPI': <SiFastapi color="#009688" title="FastAPI" />,
      'Python': <FaPython color="#3776AB" title="Python" />,
      'Docker': <FaDocker color="#2496ED" title="Docker" />,
      'Node.js': <FaNodeJs color="#339933" title="Node.js" />,
      'Express.js': <SiExpress color="#ffffff" title="Express.js" />,
      'PostgreSQL': <SiPostgresql color="#4169E1" title="PostgreSQL" />,
      'Prisma': <SiPrisma color="#ffffff" title="Prisma" />,
      'JWT': <SiJsonwebtokens color="#ffffff" title="JWT" />,
      'Vercel': <SiVercel color="#ffffff" title="Vercel" />,
      'Tailwind': <SiTailwindcss color="#06B6D4" title="Tailwind" />,
      'Redis': <SiRedis color="#DC382D" title="Redis" />,
      'Razorpay': <SiRazorpay color="#3395FF" title="Razorpay" />,
      'AWS S3': <FaAws color="#FF9900" title="AWS S3" />,
      'PyTorch': <SiPytorch color="#EE4C2C" title="PyTorch" />,
      'Flask': <SiFlask color="#ffffff" title="Flask" />,
      'Transformers': <SiHuggingface color="#FFD21E" title="Transformers" />,
      'TypeScript': <SiTypescript color="#3178C6" title="TypeScript" />,
      'Socket.IO': <SiSocketdotio color="#ffffff" title="Socket.IO" />,
      'TensorFlow': <SiTensorflow color="#FF6F00" title="TensorFlow" />,
      'OpenCV': <SiOpencv color="#5C3EE8" title="OpenCV" />
    };
    return iconMap[techName] || <span className="tech-text">{techName}</span>;
  };

  const projects = [
    {
      title: 'FraudKavach',
      description: 'Fintech payment simulator with fraud detection & explainable risk scoring.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express.js'],
      github: 'https://github.com/macayu17/FraudKavach.git',
      live: null,
      image: '🛡️'
    },
    {
      title: 'StockFlow',
      description: 'Paper-trading platform with real-time quotes, portfolios & leaderboards.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
      github: 'https://github.com/macayu17/Trade-Wars.git',
      live: null,
      image: '📈'
    },
    {
      title: 'Occasio',
      description: 'Event booking with payments, QR tickets & admin dashboard.',
      tech: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Razorpay'],
      github: 'https://github.com/macayu17/events-management-booking.git',
      live: 'https://occasio.ayushh.in/',
      image: occasioImage,
      imageFallback: '🎫'
    },
    {
      title: 'GridPulse',
      description: 'F1 race analytics with telemetry replay & track visualization.',
      tech: ['React', 'Vite', 'FastAPI', 'Python', 'Docker'],
      github: 'https://github.com/macayu17/f1-replay-system.git',
      live: 'https://pitwall.ayushh.in/',
      image: f1Image
    },
    {
      title: 'Parkinson\'s Screening',
      description: 'Clinical screening using transformer-based ML models.',
      tech: ['Python', 'PyTorch', 'Flask', 'Transformers'],
      github: 'https://github.com/macayu17/Parkinsons-Disease-Assesment-Portal.git',
      live: 'https://huggingface.co/spaces/Penguindrum920/Parkinson_Disease_Assesment_Portal',
      image: '🧠'
    },
    {
      title: 'Multimodal Sentiment',
      description: 'Sentiment analysis using text, vision & audio transformers.',
      tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
      github: 'https://github.com/macayu17',
      live: null,
      image: '💬'
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="glass-container">
          <h2
            ref={titleRef}
            className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
          >
            Featured Projects
          </h2>
          <div
            ref={gridRef}
            className={`projects-grid scroll-hidden ${gridVisible ? 'scroll-visible' : ''}`}
          >
            {projects.map((project, index) => (
              <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-image">
                  {typeof project.image === 'string' &&
                    (project.image.startsWith('http') ||
                      project.image.startsWith('data:') ||
                      project.image.includes('/') ||
                      /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(project.image)) ? (
                    <>
                      {project.imageFallback && (
                        <span className="project-emoji project-emoji-fallback">{project.imageFallback}</span>
                      )}
                      <img
                        className="project-image-media"
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </>
                  ) : (
                    <span className="project-emoji">{project.image}</span>
                  )}
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <div key={techIndex} className="tech-icon" title={tech}>
                        {getTechIcon(tech)}
                      </div>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      <span>Code</span>
                    </a>
                    {project.live && (
                      <a href={project.live} className="project-link project-link-live" target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
