import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: 'Student Developer & Learner',
      company: 'RV Institute of Technology',
      period: '2023 - Present',
      description: 'Actively learning and applying web development skills through academic projects and self-driven learning initiatives.',
      achievements: [
        'Building real-world projects with React and modern web technologies',
        'Completed multiple web development assignments and projects',
        'Exploring full-stack development and database management'
      ]
    },
    {
      role: 'Personal Project Development',
      company: 'Self-Driven Learning',
      period: '2024 - Present',
      description: 'Working on personal projects to strengthen development skills and explore new technologies.',
      achievements: [
        'Created portfolio website with React and Vite',
        'Learning responsive design and modern CSS frameworks',
        'Experimenting with backend technologies like Node.js and Express'
      ]
    }
  ];

  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-company">{exp.company}</p>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <p className="experience-description">{exp.description}</p>
                <ul className="experience-achievements">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
