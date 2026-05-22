import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaCodeBranch, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { FaGitlab } from 'react-icons/fa6';
import { loadOpenSourcePRs, OPEN_SOURCE_CACHE_TTL } from '../utils/openSourcePRs';
import { getOpenSourceMetricCards } from '../utils/openSourceMetrics';
import './OpenSourcePage.css';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

const formatDate = (dateValue) => {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatRefreshTime = (dateValue) => {
  if (!dateValue) {
    return 'pending';
  }

  return new Date(dateValue).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
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

const sortContributions = (contributions) =>
  [...contributions].sort((first, second) => {
    const statusRank = getStatusRank(first.status) - getStatusRank(second.status);
    if (statusRank !== 0) {
      return statusRank;
    }

    return new Date(second.date).getTime() - new Date(first.date).getTime();
  });

const SkeletonCard = () => (
  <article className="open-source-card open-source-card-skeleton">
    <div className="open-source-skeleton-line short"></div>
    <div className="open-source-skeleton-line title"></div>
    <div className="open-source-skeleton-line"></div>
    <div className="open-source-skeleton-line meta"></div>
  </article>
);

const PlatformIcon = ({ platform }) => {
  if (platform === 'GitLab') {
    return <FaGitlab size={12} />;
  }

  return <FaGithub size={12} />;
};

const ContributionCard = ({ entry }) => (
  <a
    href={entry.url}
    target="_blank"
    rel="noopener noreferrer"
    className="open-source-card"
    aria-label={`View ${entry.title} on ${entry.platform}`}
  >
    <div className="open-source-card-top">
      <span className="open-source-type">
        <PlatformIcon platform={entry.platform} />
        {entry.repository}
      </span>
      <span className={`open-source-status ${entry.statusClass}`}>
        {entry.status}
      </span>
    </div>

    <h2 className="open-source-card-title">{entry.title}</h2>

    <div className="open-source-meta">
      <span>
        <FaCodeBranch size={10} />
        {entry.reference}
      </span>
      <span>{entry.platform}</span>
      <span>{formatDate(entry.date)}</span>
    </div>

    {entry.labels.length > 0 && (
      <div className="open-source-labels">
        {entry.labels.slice(0, 3).map((label) => (
          <span key={label} className="open-source-label">
            {label}
          </span>
        ))}
      </div>
    )}

    <span className="open-source-card-link">
      View contribution
      <FaExternalLinkAlt size={11} />
    </span>
  </a>
);

const OpenSource = () => {
  const [prs, setPrs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadPRs = async ({ forceRefresh = false } = {}) => {
      setStatus((currentStatus) => (currentStatus === 'ok' ? 'refreshing' : 'loading'));

      try {
        const result = await loadOpenSourcePRs({ forceRefresh });
        if (!isActive) {
          return;
        }

        setPrs(result.prs);
        setUpdatedAt(result.updatedAt);
        setIsStale(result.isStale);
        setStatus('ok');
      } catch (error) {
        console.error('Failed to load open source PRs:', error);
        if (isActive) {
          setStatus('error');
        }
      }
    };

    loadPRs();
    const refreshTimer = window.setInterval(() => {
      loadPRs({ forceRefresh: true });
    }, OPEN_SOURCE_CACHE_TTL);

    return () => {
      isActive = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  const orderedContributions = useMemo(() => sortContributions(prs), [prs]);

  const metricCards = useMemo(
    () => getOpenSourceMetricCards(prs),
    [prs],
  );

  const closedContributions = useMemo(
    () => orderedContributions.filter((entry) => entry.status === 'Closed'),
    [orderedContributions],
  );

  const visibleContributions = useMemo(
    () => orderedContributions.filter((entry) => entry.status !== 'Closed'),
    [orderedContributions],
  );

  const hasPRs = prs.length > 0;
  const isLoadingInitial = status === 'loading' && !hasPRs;
  const closedCount = closedContributions.length;

  return (
    <MotionDiv
      className="page-transition"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <section className="open-source-page">
        <div className="section-header">
          <span>// OPEN SOURCE CONTRIBUTIONS</span>
          <span className="open-source-page-count">
            {status === 'error'
              ? 'unavailable'
              : status === 'loading'
                ? 'fetching...'
                : `${String(prs.length).padStart(2, '0')} entries`}
          </span>
        </div>

        <div className="open-source-hero">
          <h1 className="open-source-title">Open source PRs and merge requests.</h1>
          <p className="open-source-copy">
            This page refreshes public GitHub pull requests and GitLab merge requests every 24 hours,
            using the same username on both platforms.
          </p>
          <div className="open-source-profile-links">
            <a
              href="https://github.com/macayu17"
              target="_blank"
              rel="noopener noreferrer"
              className="open-source-profile-link"
            >
              <FaGithub size={14} />
              GitHub profile
            </a>
            <a
              href="https://gitlab.com/macayu17"
              target="_blank"
              rel="noopener noreferrer"
              className="open-source-profile-link"
            >
              <FaGitlab size={14} />
              GitLab profile
            </a>
          </div>
        </div>

        <div className="open-source-metrics">
          {metricCards.map((metric) => (
            <article className="open-source-metric" key={metric.label}>
              <span className="open-source-metric-label">{metric.label}</span>
              <strong>{String(metric.value).padStart(2, '0')}</strong>
            </article>
          ))}
        </div>

        <div className="open-source-refresh-note">
          <span>Last sync: {formatRefreshTime(updatedAt)}</span>
          {isStale && <span>Showing cached data</span>}
          {status === 'refreshing' && <span>Refreshing...</span>}
        </div>

        <div className="open-source-grid">
          {isLoadingInitial &&
            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}

          {status === 'error' && !hasPRs && (
            <p className="open-source-error">
              Could not load GitHub or GitLab contributions right now. Try again after the APIs are reachable.
            </p>
          )}

          {status !== 'loading' && !hasPRs && status !== 'error' && (
            <p className="open-source-error">No external pull requests found yet.</p>
          )}

          {visibleContributions.map((entry) => (
            <ContributionCard key={entry.id} entry={entry} />
          ))}
        </div>

        {closedCount > 0 && (
          <details className="open-source-closed-section">
            <summary className="open-source-closed-summary">
              <span>
                <FaChevronDown size={11} />
                Closed PRs / MRs
              </span>
              <strong>{String(closedCount).padStart(2, '0')} closed</strong>
            </summary>

            <div className="open-source-grid open-source-closed-grid">
              {closedContributions.map((entry) => (
                <ContributionCard key={entry.id} entry={entry} />
              ))}
            </div>
          </details>
        )}
      </section>
    </MotionDiv>
  );
};

export default OpenSource;
