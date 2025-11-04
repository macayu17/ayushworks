import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with React and Vite featuring dark mode, smooth animations, and responsive design.',
      tech: ['React', 'Vite', 'CSS3', 'JavaScript'],
      github: '#',
      live: '#',
      image: '🌐'
    },
    {
      title: 'Student Management System',
      description: 'Web application for managing student records, attendance, and academic performance with an intuitive dashboard.',
      tech: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
      github: '#',
      live: '#',
      image: '📚'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather application with location search, 7-day forecast, and interactive weather visualization.',
      tech: ['React', 'API Integration', 'CSS'],
      github: '#',
      live: '#',
      image: '🌤️'
    },
    {
      title: 'To-Do List Application',
      description: 'Task management app with CRUD operations, local storage, and clean user interface for daily productivity.',
      tech: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
      github: '#',
      live: '#',
      image: '✅'
    },
    {
      title: 'Calculator Web App',
      description: 'Scientific calculator with standard and advanced mathematical operations, built with vanilla JavaScript.',
      tech: ['JavaScript', 'HTML', 'CSS'],
      github: '#',
      live: '#',
      image: '🧮'
    },
    {
      title: 'College Website Clone',
      description: 'Responsive college website replica featuring multiple pages, navigation, and modern design principles.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: '#',
      live: '#',
      image: '🏫'
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
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
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                  <a href={project.live} className="project-link">
                    <span>Live Demo</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
