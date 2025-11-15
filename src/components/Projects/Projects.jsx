import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Multimodal Sentiment Analysis of Public Opinion using Tweets',
      description:
        'Developed a sophisticated multimodal model to analyze public sentiment from text, images, and videos. Established baseline performance on text using Sentiment140 dataset with advanced feature extraction pipelines utilizing BERT and RoBERTa for textual analysis.',
      tech: ['Python', 'TensorFlow', 'PyTorch', 'Hugging Face', 'XGBoost', 'OpenCV'],
      live: '#',
      image: '💬'
    },
    {
      title: "Text-Based Parkinson's Disease Screening using Pre-Trained LLM",
      description:
        'Developed a multimodal AI diagnostic system to detect Parkinson\'s Disease from clinical data with 96.73% accuracy. Built an evidence-based diagnostic platform using ensemble learning to classify into 4 categories (HC, PD, SWEDD, Prodromal).',
      tech: ['Python', 'PyTorch', 'PubMedBERT', 'BioGPT', 'Flask'],
      live: '#',
      image: '🧠'
    },
    {
      title: 'TaskSync — Full-Stack Task Manager',
      description:
        'Built a full-stack task manager application with secure user authentication with JWT and full CRUD operations. Developed a RESTful API backend using Node.js and Express, connected to a MongoDB database for persistent data storage.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
      live: '#',
      image: '✅'
    },
    {
      title: 'Portfolio Website',
      description:
        'Personal portfolio website built with React and Vite featuring dark mode, smooth animations, 3D components, and responsive design. Showcases projects with interactive elements and modern web technologies.',
      tech: ['React', 'Vite', 'Three.js', 'GSAP', 'CSS3'],
      live: '#',
      image: '🌐'
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
                  {project.live && (
                    <a href={project.live} className="project-link">
                      <span>Live Demo</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
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
