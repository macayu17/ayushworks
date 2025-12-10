import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'GridPulse — F1 Race Analytics Platform',
      description: 'Full-stack race replay and telemetry visualization platform for real-time F1 analytics with live track positioning. Built with FastAPI backend processing real F1 telemetry data and interactive React frontend with D3.js track visualization, live leaderboards, and sector analysis.',
      tech: ['React', 'Vite', 'FastAPI', 'Python', 'D3.js', 'Docker', 'FastF1'],
      github: 'https://github.com/macayu17',
      live: '#',
      image: '🏎️'
    },
    {
      title: 'StockFlow Virtual Stock Trading Platform',
      description: 'Virtual trading platform with real-time prices, portfolio tracking, and competitive leaderboards. Built RESTful API with 25+ endpoints for auth, trading, portfolios with sub-100ms latency on real-time stock queries supporting 1,000+ simulated trades/day.',
      tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT', 'Vercel'],
      github: 'https://github.com/macayu17',
      live: '#',
      image: '📈'
    },
    {
      title: 'EventEase Event Management & Booking System',
      description: 'Full-stack event management and ticketing with secure payments, QR tickets, and admin dashboards. Implemented scalable backend with webhook-based payments, background job processing, and S3-based asset storage.',
      tech: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Redis', 'Razorpay', 'AWS S3'],
      github: 'https://github.com/macayu17',
      live: '#',
      image: '🎫'
    },
    {
      title: "Parkinson's Disease Screening using LLM",
      description: 'Multimodal AI diagnostic system to detect Parkinson\'s Disease from clinical data achieving 96.73% accuracy. Combined 3 medical transformers (PubMedBERT, BioGPT, Clinical-T5) with 3 ML models through weighted voting, trained on 42,645 patient samples.',
      tech: ['Python', 'PyTorch', 'Flask', 'Transformers', 'LightGBM', 'XGBoost', 'SVM'],
      github: 'https://github.com/macayu17',
      live: '#',
      image: '🧠'
    },
    {
      title: 'FraudKavach — Real-Time Fraud Detection',
      description: 'AI-driven fraud detection system for real-time transaction scoring and alerts. Built real-time ML inference pipeline with LightGBM for risk scoring, WebSocket-based event streaming, and explainable AI using SHAP for feature attribution.',
      tech: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Socket.IO', 'LightGBM', 'Docker'],
      github: 'https://github.com/macayu17',
      live: '#',
      image: '🛡️'
    },
    {
      title: 'Multimodal Sentiment Analysis on Tweets',
      description: 'Sophisticated multimodal model to analyze public sentiment from text, images, and videos. Achieved 87.23% accuracy on Sentiment140 dataset (1.6M tweets) using BERT, RoBERTa for text, CNNs for images, and MFCCs for audio components.',
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
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-image">
                  <span className="project-emoji">{project.image}</span>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="project-link">
                      <span>GitHub</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                    <a href={project.live} className="project-link">
                      <span>Live Demo</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                        <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
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
