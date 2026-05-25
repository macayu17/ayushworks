import AboutComponent from '../components/About/About';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <AboutComponent />
    </div>
  );
};

export default About;
