import './Education.css';
import rvLogo from '../../assets/images/image.png';

const Education = () => {
  const educationData = [
    {
      degree: 'B.E. in Computer Science and Engineering',
      institution: 'RV Institute of Technology & Management',
      period: 'Sep 2023 - Aug 2027 (Ongoing)',
      details: 'Relevant Coursework: Data Structures, Algorithms, Database Management Systems, Computer Networks.',
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
            <div className="edu-index">{(index + 1).toString().padStart(2, '0')}</div>
            <div className="edu-content">
              <div className="edu-header">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {item.logo && (
                    <img 
                      src={item.logo} 
                      alt="Institution Logo" 
                      style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', backgroundColor: 'white', padding: '2px' }}
                    />
                  )}
                  <div>
                    <h3 className="edu-degree">{item.degree}</h3>
                    <div className="edu-institution">{item.institution}</div>
                    <div className="edu-period" style={{ marginTop: '4px' }}>{item.period}</div>
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
