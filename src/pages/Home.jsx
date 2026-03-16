import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import GitHubContributions from '../components/GitHubContributions/GitHubContributions';
import Education from '../components/Education/Education';
import Separator from '../components/Separator/Separator';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionDiv 
      className="page-transition"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Hero />
      <Separator />
      <GitHubContributions username="macayu17" />
      <Separator />
      <Education />
      <Separator />
      <Projects />
    </MotionDiv>
  );
};

export default Home;
