import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import GitHubContributions from '../components/GitHubContributions/GitHubContributions';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <Hero />
      <GitHubContributions username="macayu17" />
      <Projects />
    </div>
  );
};

export default Home;
