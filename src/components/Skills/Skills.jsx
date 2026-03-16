import './Skills.css';

const Skills = () => {
  const getIconUrl = (skillName) => {
    const iconMap = {
      'React': 'react',
      'JavaScript': 'javascript',
      'HTML/CSS': 'html5',
      'Vite': 'vitejs',
      'Next.js': 'nextjs',
      'TailwindCSS': 'tailwindcss',
      'Tailwind CSS': 'tailwindcss',
      'Bootstrap': 'bootstrap',
      'TypeScript': 'typescript',
      'Node.js': 'nodejs',
      'Express': 'express',
      'MongoDB': 'mongodb',
      'MySQL': 'mysql',
      'PostgreSQL': 'postgresql',
      'Prisma': 'prisma',
      'Firebase': 'firebase',
      'Git': 'git',
      'GitHub': 'github',
      'VS Code': 'vscode',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cplusplus',
      'C': 'c',
      'Docker': 'docker',
      'Vercel': 'vercel',
      'Figma': 'figma',
      'TensorFlow': 'tensorflow',
      'PyTorch': 'pytorch',
      'Scikit-learn': 'scikitlearn',
      'scikit-learn': 'scikitlearn',
      'Pandas': 'pandas',
      'NumPy': 'numpy',
      'FastAPI': 'fastapi',
      'Flask': 'flask',
      'D3.js': 'd3js',
      'Linux': 'linux',
      'AWS': 'amazonwebservices',
      'Azure': 'azure'
    };
    const iconName = iconMap[skillName] || skillName.toLowerCase().replace(/[\s\-.]/g, '');
    if (skillName === 'Hugging Face' || skillName === 'Hugging Face') {
      return 'https://huggingface.co/front/assets/huggingface_logo.svg';
    }
    if (skillName === 'AWS') {
      // Using the plain wordmark so CSS inversion turns it solid white
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg';
    }
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
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
              {cat.skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <img
                    src={getIconUrl(skill)}
                    alt={skill}
                    className={['Next.js', 'Express', 'GitHub', 'Flask', 'Prisma', 'AWS', 'Vercel'].includes(skill) ? 'invert-logo' : ''}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
