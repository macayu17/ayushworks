import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: 'Student Developer & Learner',
      company: 'RV Institute of Technology',
      period: '2023 - Present',
      bullets: [
        'Building real-world projects with React and modern web technologies',
        'Completed multiple web development assignments and projects',
        'Exploring full-stack development and database management'
      ],
      tags: ['React', 'JavaScript', 'Node.js']
    },
    {
      role: 'Personal Project Development',
      company: 'Self-Driven Learning',
      period: '2024 - Present',
      bullets: [
        'Created portfolio website with React and Vite',
        'Learning responsive design and modern CSS frameworks',
        'Experimenting with backend technologies like Node.js and Express'
      ],
      tags: ['React', 'Vite', 'Express', 'PostgreSQL']
    }
  ];

  return (
    <section className="experience" id="experience">
      <div className="section-header">
        <span>// EXPERIENCE</span>
      </div>

      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-number">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="experience-top">
              <div>
                <div className="experience-role">{exp.role}</div>
                <div className="experience-company">{exp.company}</div>
              </div>
              <span className="experience-period">{exp.period}</span>
            </div>
            <ul className="experience-bullets">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <div className="experience-tags">
              {exp.tags.map((tag, i) => (
                <span key={i} className="experience-tag">{tag}</span>
              ))}
            </div>
            {index < experiences.length - 1 && <hr className="experience-divider" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
