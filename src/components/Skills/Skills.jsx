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
      'Pandas': 'pandas',
      'NumPy': 'numpy',
    };
    const iconName = iconMap[skillName] || skillName.toLowerCase();
    if (skillName === 'Hugging Face') {
      return 'https://huggingface.co/front/assets/huggingface_logo.svg';
    }
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  };

  const categories = [
    {
      title: 'Frontend',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Next.js', 'TailwindCSS', 'Vite', 'Bootstrap']
    },
    {
      title: 'Backend & Database',
      skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'Prisma', 'Firebase']
    },
    {
      title: 'Languages & Tools',
      skills: ['Python', 'Java', 'C++', 'C', 'Git', 'GitHub', 'Docker', 'VS Code']
    },
    {
      title: 'AI / ML',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Hugging Face']
    }
  ];

  return (
    <section className="skills" id="skills">
      <div className="section-header">
        <span>// SKILLS</span>
      </div>

      <div className="skills-categories">
        {categories.map((cat, index) => (
          <div key={index}>
            <div className="skill-category-title">{cat.title}</div>
            <div className="skills-items">
              {cat.skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <img
                    src={getIconUrl(skill)}
                    alt={skill}
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
