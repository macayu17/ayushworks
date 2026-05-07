import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Education from '../components/Education/Education';
import Separator from '../components/Separator/Separator';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projectCatalog } from '../data/projects';

const MotionDiv = motion.div;
const GitHubContributions = lazy(() => import('../components/GitHubContributions/GitHubContributions'));

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};

const ContributionsPlaceholder = () => (
  <div className="github-contributions-placeholder" aria-hidden="true" />
);

const DeferredGitHubContributions = ({ username }) => {
  const wrapperRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return undefined;
    }

    const load = () => setShouldLoad(true);
    let idleId = null;
    let timerId = null;
    let observer = null;

    if ('IntersectionObserver' in window && wrapperRef.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          observer?.disconnect();
        }
      }, { rootMargin: '360px 0px' });
      observer.observe(wrapperRef.current);
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(load, { timeout: 1600 });
    } else {
      timerId = window.setTimeout(load, 900);
    }

    return () => {
      observer?.disconnect();
      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== null) {
        window.clearTimeout(timerId);
      }
    };
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef}>
      {shouldLoad ? (
        <Suspense fallback={<ContributionsPlaceholder />}>
          <GitHubContributions username={username} />
        </Suspense>
      ) : (
        <ContributionsPlaceholder />
      )}
    </div>
  );
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
      <DeferredGitHubContributions username="macayu17" />
      <Separator />
      <Education />
      <Separator />
      <Projects
        items={projectCatalog}
        intro="A few things I've built and spent real time on. Open any project to see the full story."
        showArchiveLink
        showThumbnail={false}
      />
    </MotionDiv>
  );
};

export default Home;
