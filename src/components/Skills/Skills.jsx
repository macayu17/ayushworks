import './Skills.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Skills = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

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
      'Canva': 'canva',
      'Postman': 'postman',
      'TensorFlow': 'tensorflow',
      'PyTorch': 'pytorch',
      'Scikit-learn': 'scikitlearn',
      'Pandas': 'pandas',
      'NumPy': 'numpy',
      'Hugging Face': 'huggingface'
    };

    const iconName = iconMap[skillName] || skillName.toLowerCase();

    // Special case for Hugging Face
    if (skillName === 'Hugging Face') {
      return 'https://huggingface.co/front/assets/huggingface_logo.svg';
    }

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
        { name: 'Prisma', level: 60 }
      ]
    },
    {
      title: 'Tools & Languages',
      skills: [
        { name: 'Git', level: 75 },
        { name: 'GitHub', level: 75 },
        { name: 'VS Code', level: 85 },
        { name: 'Python', level: 70 },
        { name: 'Java', level: 65 },
        { name: 'C++', level: 75 },
        { name: 'C', level: 70 }
      ]
    },
    {
      title: 'AI/ML',
      skills: [
        { name: 'TensorFlow', level: 60 },
        { name: 'PyTorch', level: 55 },
        { name: 'Scikit-learn', level: 65 },
        { name: 'Pandas', level: 70 },
        { name: 'NumPy', level: 70 },
        { name: 'Hugging Face', level: 60 }
      ]
    },
    {
      title: 'DevOps & Deployment',
      skills: [
        { name: 'Docker', level: 60 },
        { name: 'Git', level: 75 },
        { name: 'Vercel', level: 70 }
      ]
    },
    {
      title: 'Design, UI/UX & Testing',
      skills: [
        { name: 'Figma', level: 65 },
        { name: 'Canva', level: 70 },
        { name: 'Postman', level: 70 }
      ]
    }
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="glass-container">
          <h2
            ref={titleRef}
            className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
          >
            Skills & Technologies
          </h2>
          <div
            ref={gridRef}
            className={`skills-grid scroll-hidden ${gridVisible ? 'scroll-visible' : ''}`}
          >
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
      </div>
    </section>
  );
};

export default Skills;
