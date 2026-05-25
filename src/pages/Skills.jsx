import SkillsComponent from '../components/Skills/Skills';
import { useEffect } from 'react';

const Skills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <SkillsComponent />
    </div>
  );
};

export default Skills;
