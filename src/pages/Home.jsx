import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Education from '../components/Education/Education';
import Separator from '../components/Separator/Separator';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFlask } from 'react-icons/fa';
import { featuredProjects, funProjectCatalog } from '../data/projects';
import { loadOpenSourcePRs } from '../utils/openSourcePRs';
import { getTechIcon } from '../utils/techIcons';
import './Home.css';

const GitHubContributions = lazy(() => import('../components/GitHubContributions/GitHubContributions'));

const ContributionsPlaceholder = () => (
  <div className="github-contributions-placeholder" aria-hidden="true" />
);

const formatBannerTime = (date) =>
  date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

const HomeBanner = () => {
  const [time, setTime] = useState(() => formatBannerTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatBannerTime(new Date()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="home-banner" aria-label="Night landscape banner">
      <img src="/banner.gif" alt="" className="home-banner-image home-banner-image-dark" />
      <img src="/banner-light.gif" alt="" className="home-banner-image home-banner-image-light" />
      <time className="home-banner-time" dateTime={time}>
        {time}
      </time>
    </section>
  );
};

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

const getStatusRank = (status) => {
  if (status === 'Merged') {
    return 0;
  }

  if (status === 'Open') {
    return 1;
  }

  return 2;
};

const sortOpenSourceEntries = (entries) =>
  [...entries].sort((first, second) => {
    const rank = getStatusRank(first.status) - getStatusRank(second.status);
    if (rank !== 0) {
      return rank;
    }

    return new Date(second.date).getTime() - new Date(first.date).getTime();
  });

const OpenSourcePreview = () => {
  const [entries, setEntries] = useState([]);
  const [activeStatus, setActiveStatus] = useState('Merged');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isActive = true;

    loadOpenSourcePRs()
      .then((result) => {
        if (!isActive) {
          return;
        }

        setEntries(sortOpenSourceEntries(result.prs));
        setStatus('ok');
      })
      .catch((error) => {
        console.error('Failed to load open source preview:', error);
        if (isActive) {
          setStatus('error');
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const tabs = ['Merged', 'Open', 'Closed'];
  const visibleEntries = entries.filter((entry) => entry.status === activeStatus);
  const previewEntries = visibleEntries.slice(0, 4);
  const remainingCount = Math.max(visibleEntries.length - previewEntries.length, 0);

  return (
    <section className="home-open-source" id="open-source-preview">
      <div className="home-open-source-header">
        <div>
          <span className="home-open-source-kicker">Open Source</span>
          <h2>Open Source Contributions</h2>
        </div>
        <div className="home-open-source-tabs" role="tablist" aria-label="Contribution status">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`home-open-source-tab ${activeStatus === tab ? 'active' : ''}`}
              onClick={() => setActiveStatus(tab)}
              aria-selected={activeStatus === tab}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="home-open-source-list">
        {status === 'loading' &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="home-open-source-row skeleton" />
          ))}

        {status === 'error' && (
          <p className="home-open-source-empty">Could not load contributions right now.</p>
        )}

        {status === 'ok' && previewEntries.length === 0 && (
          <p className="home-open-source-empty">No {activeStatus.toLowerCase()} contributions to show.</p>
        )}

        {previewEntries.map((entry) => (
          <a
            key={entry.id}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="home-open-source-row"
          >
            <span className={`home-open-source-dot ${entry.statusClass}`} />
            <span className="home-open-source-copy">
              <strong>{entry.title}</strong>
              <span>{entry.repository}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="home-open-source-footer">
        <Link to="/open-source" className="home-open-source-view-all">
          View All{remainingCount > 0 ? ` (${remainingCount} more)` : ''}
          <FaArrowRight size={11} />
        </Link>
      </div>
    </section>
  );
};

const homeSkillRows = [
  ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Node.js'],
  ['PostgreSQL', 'Docker', 'Supabase', 'Redis', 'PyTorch', 'Linux'],
  ['Git', 'Express', 'TensorFlow', 'Go', 'JavaScript', 'MongoDB'],
];

const HomeSkills = () => (
  <section className="home-skills" id="skills">
    <div className="home-skills-header">
      <div>
        <span className="home-open-source-kicker">Toolkit</span>
        <h2>Skills & Technologies</h2>
      </div>
      <Link to="/skill" className="home-skills-more">
        See all
        <FaArrowRight size={10} />
      </Link>
    </div>
    <div className="home-skills-marquee" aria-label="Skills and technologies">
      {homeSkillRows.map((row, rowIndex) => (
        <div
          key={row.join('-')}
          className={`home-skills-row ${rowIndex % 2 === 1 ? 'reverse' : ''}`}
        >
          <div className="home-skills-track">
            {[...row, ...row].map((skill, index) => {
              const icon = getTechIcon(skill);

              return (
                <span
                  key={`${skill}-${index}`}
                  className="home-skill-chip"
                  aria-hidden={index >= row.length ? 'true' : undefined}
                >
                  {icon && (
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const HomeQuote = () => (
  <figure className="home-quote" aria-label="Closing quote">
    <blockquote>
      "The man on top of the mountain didn't fall there."
    </blockquote>
    <figcaption>Vince Lombardi</figcaption>
  </figure>
);

const Home = ({ theme, toggleTheme, onOpenCmdk }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <HomeBanner />
      <Hero theme={theme} toggleTheme={toggleTheme} onOpenCmdk={onOpenCmdk} />
      <Separator />
      <Projects
        items={featuredProjects}
        intro="A few things I've built and spent real time on. Open any project to see the full story."
        showArchiveLink={false}
        showThumbnail
      />
      <div className="home-projects-actions">
        <Link to="/projects" className="home-projects-action-btn">
          <span>Explore more projects</span>
          <FaArrowRight size={12} />
        </Link>
      </div>
      <details className="fun-projects-dropdown">
        <summary className="fun-projects-summary">
          <span className="fun-projects-kicker"><FaFlask size={10} /> FUN PROJECTS</span>
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
      <Separator />
      <DeferredGitHubContributions username="macayu17" />
      <Separator />
      <OpenSourcePreview />
      <Separator />
      <HomeSkills />
      <Separator />
      <Education />
      <Separator />
      <HomeQuote />
      <div className="home-end-fade" aria-hidden="true" />
    </div>
  );
};

export default Home;
