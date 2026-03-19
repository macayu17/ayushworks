import './Education.css';
import rvLogo from '../../assets/images/image.png';

const Education = () => {
  const educationData = [
    {
      degree: 'B.E. in Computer Science and Engineering',
      institution: 'RV Institute of Technology & Management',
      period: 'Sep 2023 - Aug 2027 (Ongoing)',
      details: 'Relevant Coursework: Data Structures, Algorithms, Database Management Systems, Computer Networks, Object Oriented Programming.',
      score: 'CGPA: 9.03',
      logo: rvLogo
    }
  ];

  return (
    <section className="education" id="education">
      <div className="section-header">
        <span>// EDUCATION</span>
      </div>

      <div className="education-timeline">
        {educationData.map((item, index) => (
          <div key={index} className="education-item">
            <div className="edu-content">
              <div className="edu-header">
                <div className="edu-identity">
                  {item.logo && (
                    <img 
                      src={item.logo} 
                      alt="Institution Logo" 
                      className="edu-logo"
                    />
                  )}
                  <div className="edu-meta">
                    <h3 className="edu-degree">{item.degree}</h3>
                    <div className="edu-institution">{item.institution}</div>
                    <div className="edu-period edu-period-inline">{item.period}</div>
                  </div>
                </div>
              </div>
              <p className="edu-details">{item.details}</p>
              {item.score && <span className="edu-score">{item.score}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
