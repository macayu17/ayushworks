import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Education from '../components/Education/Education';
import Separator from '../components/Separator/Separator';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { coreProjectCatalog, funProjectCatalog } from '../data/projects';
import './Home.css';

const GitHubContributions = lazy(() => import('../components/GitHubContributions/GitHubContributions'));

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
    <div className="page-transition">
      <Hero />
      <Separator />
      <DeferredGitHubContributions username="macayu17" />
      <Separator />
      <Education />
      <Separator />
      <Projects
        items={coreProjectCatalog}
        intro="A few things I've built and spent real time on. Open any project to see the full story."
        showArchiveLink
        showThumbnail={false}
      />
      <details className="fun-projects-dropdown">
        <summary className="fun-projects-summary">
          <span className="fun-projects-kicker">// FUN PROJECTS</span>
          <span className="fun-projects-count">
            {String(funProjectCatalog.length).padStart(2, '0')} experiments
          </span>
        </summary>
        <p className="fun-projects-intro">
          Smaller builds and focused experiments that still deserve a quick look.
        </p>
        <Projects
          items={funProjectCatalog}
          showHeader={false}
          showThumbnail={false}
          sectionId={null}
        />
      </details>
    </div>
  );
};

export default Home;
