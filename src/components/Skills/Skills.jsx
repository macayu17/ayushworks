import './Skills.css';

const Skills = () => {
  const supportedIcons = {
    'React': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    'JavaScript': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    'Vite': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    'Next.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
    'Tailwind CSS': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    'TypeScript': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    'Node.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    'Express': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
    'MongoDB': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    'MySQL': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    'PostgreSQL': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    'Git': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    'Python': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    'Java': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    'C++': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    'C': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    'Docker': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    'PyTorch': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    'scikit-learn': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    'NumPy': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    'Pandas': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    'FastAPI': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    'Flask': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', invert: true },
    'D3.js': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
    'Linux': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    'AWS': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', invert: true },
    'Azure': { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    'Hugging Face Transformers': { src: 'https://huggingface.co/front/assets/huggingface_logo.svg' }
  };

  const getSkillIcon = (skillName) => {
    return supportedIcons[skillName] ?? null;
  };

  const categories = [
    {
      title: 'Languages',
      skills: ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript']
    },
    {
      title: 'ML & Data',
      skills: ['PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'NumPy', 'Pandas', 'Time-Series Modeling']
    },
    {
      title: 'Backend & APIs',
      skills: ['FastAPI', 'Flask', 'Node.js', 'Express', 'REST APIs', 'WebSockets', 'Async Processing']
    },
    {
      title: 'Frontend',
      skills: ['Next.js', 'React', 'Vite', 'D3.js', 'Tailwind CSS']
    },
    {
      title: 'Infra & DevOps',
      skills: ['Docker', 'Linux', 'Git', 'CI/CD Pipelines']
    },
    {
      title: 'Databases & Cloud',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS', 'Azure']
    },
    {
      title: 'Areas of Interest',
      skills: ['Scalable ML Systems', 'Observability', 'NLP', 'Distributed Systems', 'Model Deployment', 'Large Language Models (LLM)']
    }
  ];

  return (
    <section className="skills" id="skills">
      <div className="section-header">
        <span>// SKILLS</span>
      </div>

      <div className="skills-grid">
        {categories.map((cat, index) => (
          <div key={index} className="skill-category-card bracket-box">
            <div className="skill-category-header">
              <span className="category-marker">// 0{index + 1}</span>
              <h3 className="category-title">{cat.title}</h3>
            </div>
            <div className="skills-items">
              {cat.skills.map((skill, i) => {
                const skillIcon = getSkillIcon(skill);

                return (
                <div key={i} className="skill-item">
                  {skillIcon && (
                    <img
                      src={skillIcon.src}
                      alt={skill}
                      className={skillIcon.invert ? 'invert-logo' : ''}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  <span>{skill}</span>
                </div>
              )})}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
