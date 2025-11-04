import './Skills.css';

const Skills = () => {
  // Map skill names to devicon names
  const getIconUrl = (skillName) => {
    const iconMap = {
      'React': 'react',
      'JavaScript': 'javascript',
      'HTML/CSS': 'html5',
      'Vite': 'vite',
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
      'Git/GitHub': 'github',
      'VS Code': 'vscode',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cplusplus',
      'C': 'c'
    };
    
    const iconName = iconMap[skillName] || skillName.toLowerCase();
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  };

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 75 },
        { name: 'JavaScript', level: 80 },
        { name: 'HTML/CSS', level: 85 },
        { name: 'Vite', level: 70 },
        { name: 'Next.js', level: 65 },
        { name: 'TailwindCSS', level: 75 },
        { name: 'Bootstrap', level: 70 },
        { name: 'TypeScript', level: 60 }
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 70 },
        { name: 'Express', level: 65 },
        { name: 'MongoDB', level: 60 },
        { name: 'MySQL', level: 70 },
        { name: 'PostgreSQL', level: 65 },
        { name: 'Prisma', level: 60 },
        { name: 'Firebase', level: 70 }
      ]
    },
    {
      title: 'Tools & Languages',
      skills: [
        { name: 'Git/GitHub', level: 75 },
        { name: 'VS Code', level: 85 },
        { name: 'Python', level: 70 },
        { name: 'Java', level: 65 },
        { name: 'C++', level: 75 },
        { name: 'C', level: 70 }
      ]
    }
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category" style={{ animationDelay: `${index * 0.2}s` }}>
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <img 
                        src={getIconUrl(skill.name)}
                        alt={skill.name}
                        className="skill-icon"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
