import './Education.css';

const Education = () => {
  const education = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'RV Institute of Technology, Bangalore',
      period: '2023 - 2027',
      grade: 'USN: 1RF23CS041'
    },
    {
      degree: 'Higher Secondary (12th)',
      institution: 'Senior Secondary School',
      period: '2021 - 2023',
      grade: 'Completed'
    }
  ];

  return (
    <section className="education" id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} className="education-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="education-content">
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institution">{edu.institution}</p>
                <div className="education-meta">
                  <span className="education-period">{edu.period}</span>
                  <span className="education-grade">{edu.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
