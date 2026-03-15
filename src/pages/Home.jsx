import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import GitHubContributions from '../components/GitHubContributions/GitHubContributions';
import Education from '../components/Education/Education';
import Separator from '../components/Separator/Separator';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <Hero />
      <Separator />
      <GitHubContributions username="macayu17" />
      <Separator />
      <Education />
      <Separator />
      <Projects />
    </div>
  );
};

export default Home;
