import './Education.css';

const Education = () => {
  const educationData = [
    {
      degree: 'B.E. in Information Science and Engineering',
      institution: 'RV Institute of Technology & Management',
      period: 'Nov 2022 - Jun 2026',
      details: 'Relevant Coursework: Data Structures, Algorithms, Database Management Systems, Computer Networks.',
      score: 'CGPA: 8.79'
    },
    {
      degree: 'Class 12th',
      institution: 'Saraswati Vidya Mandir, CIL, Ranchi',
      period: 'Jul 2018 - May 2020',
      details: 'Physics, Chemistry, Mathematics, Physical Education.',
      score: 'Percentage: 92.4%'
    },
    {
      degree: 'Class 10th',
      institution: 'Saraswati Vidya Mandir, Bokaro',
      period: 'Apr 2017 - May 2018',
      details: 'Science, Mathematics, Social Science, English, Hindi.',
      score: 'Percentage: 94.6%'
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
                <div>
                  <h3 className="edu-degree">{item.degree}</h3>
                  <div className="edu-institution">{item.institution}</div>
                </div>
                <div className="edu-period">{item.period}</div>
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
