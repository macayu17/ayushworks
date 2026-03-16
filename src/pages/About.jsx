import AboutComponent from '../components/About/About';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};

const About = () => {
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
      <AboutComponent />
    </MotionDiv>
  );
};

export default About;
