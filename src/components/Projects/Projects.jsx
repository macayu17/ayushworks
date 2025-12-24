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
      title: 'FraudKavach — Smart Payment Insights & Fraud Awareness',
      description:
        'Fintech web app for card-payment simulation with real-time analytics, fraud-risk indicators, and accessibility-first UI.',
      highlights: [
        'Multi-currency payments with history + insights',
        'Rule-based fraud-risk scoring with clear explanations',
        'Analytics dashboard: trends, categories, success vs failure',
        'WCAG 2.0 AA: keyboard + screen-reader support'
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'Charts'],
      github: 'https://github.com/macayu17/FraudKavach.git',
      live: '#',
      image: '🛡️'
    },
    {
      title: 'StockFlow — Virtual Stock Trading Platform',
      description: 'Virtual trading platform with real-time prices, portfolio tracking, and competitive leaderboards. Built RESTful API with 25+ endpoints for auth, trading, portfolios with sub-100ms latency on real-time stock queries supporting 1,000+ simulated trades/day.',
      highlights: [
        'Real-time price lookup with paper-trading workflows',
        'Portfolio tracking with P&L and holdings breakdown',
        'Secure auth + role-safe trading endpoints',
        'Competitive leaderboards for simulated performance'
      ],
      tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT', 'Vercel'],
      github: 'https://github.com/macayu17/Trade-Wars.git',
      live: '#',
      image: '📈'
    },
    {
      title: 'Occasio — Event Management & Booking System',
      description: 'Full-stack event management and ticketing with secure payments, QR tickets, and admin dashboards. Implemented scalable backend with webhook-based payments, background job processing, and S3-based asset storage.',
      highlights: [
        'Event creation + ticket booking flow with admin dashboard',
        'Secure payments with webhook-driven confirmation',
        'QR-based ticketing for fast check-in validation',
        'Scalable storage for event assets (S3-backed)'
      ],
      tech: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Redis', 'Razorpay', 'AWS S3'],
      github: 'https://github.com/macayu17/events-management-booking.git',
      live: '#',
      image: occasioImage,
      imageFallback: '🎫'
    },
    {
      title: 'GridPulse — F1 Race Analytics Platform',
      description: 'Full-stack race replay and telemetry visualization platform for real-time F1 analytics with live track positioning. Built with FastAPI backend processing real F1 telemetry data and interactive React frontend with D3.js track visualization, live leaderboards, and sector analysis.',
      highlights: [
        'Race replay with telemetry-driven insights',
        'Interactive track visualization and live positioning',
        'Leaderboards with sector + lap analysis',
        'FastAPI backend processing real F1 telemetry data'
      ],
      tech: ['React', 'Vite', 'FastAPI', 'Python', 'D3.js', 'Docker', 'FastF1'],
      github: 'https://github.com/macayu17/f1-r eplay-system.git',
      live: '#',
      image: f1Image
    },
    {
      title: 'Parkinson’s Disease Screening using LLM',
      description: 'Multimodal AI diagnostic system to detect Parkinson\'s Disease from clinical data achieving 96.73% accuracy. Combined 3 medical transformers (PubMedBERT, BioGPT, Clinical-T5) with 3 ML models through weighted voting, trained on 42,645 patient samples.',
      highlights: [
        'Multimodal screening pipeline from clinical inputs',
        'Ensemble voting across transformers + ML models',
        'Trained on 42,645 samples; achieved 96.73% accuracy',
        'Deployed via Flask for practical assessment flow'
      ],
      tech: ['Python', 'PyTorch', 'Flask', 'Transformers', 'LightGBM', 'XGBoost', 'SVM'],
      github: 'https://github.com/macayu17/Parkinsons-Disease-Assesment-Portal.git',
      live: '#',
      image: '🧠'
    },
    {
      title: 'Multimodal Sentiment Analysis on Tweets',
      description: 'Sophisticated multimodal model to analyze public sentiment from text, images, and videos. Achieved 87.23% accuracy on Sentiment140 dataset (1.6M tweets) using BERT, RoBERTa for text, CNNs for images, and MFCCs for audio components.',
      highlights: [
        'Multimodal sentiment from text + images + audio',
        'Transformer-based NLP (BERT/RoBERTa) for text features',
        'Vision + audio features via CNNs and MFCCs',
        '87.23% accuracy on Sentiment140 (1.6M tweets)'
      ],
      tech: ['Python', 'TensorFlow', 'PyTorch', 'Transformers', 'OpenCV', 'XGBoost', 'Librosa'],
      github: 'https://github.com/macayu17',
      live: '#',
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
                  {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                    <ul className="project-highlights">
                      {project.highlights.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <div key={techIndex} className="tech-icon" title={tech}>
                        {getTechIcon(tech)}
                      </div>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="project-link">
                      <span>GitHub</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>

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
