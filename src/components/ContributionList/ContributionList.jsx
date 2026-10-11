import { useRef, useState } from 'react';
import { FiGitPullRequest, FiXCircle } from 'react-icons/fi';
import { GoGitMerge } from 'react-icons/go';
import './ContributionList.css';

export const OrganizationLogo = ({ entry, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const owner = entry.repository.split('/')[0];
  return (
    <span className={`contribution-logo ${entry.statusClass || entry.status.toLowerCase()} ${className}`} title={`${owner} · ${entry.status}`}>
      {failed || entry.platform === 'GitLab' ? <span aria-label={owner}>📦</span> : (
        <img src={`https://github.com/${owner}.png?size=64`} alt={`${owner} logo`} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </span>
  );
};

const ContributionList = ({ entries }) => {
  const listRef = useRef(null);
  const [highlight, setHighlight] = useState(null);
  const moveHighlight = (event) => {
    const row = event.currentTarget;
    setHighlight({ top: row.offsetTop, height: row.offsetHeight });
  };
  return (
    <div ref={listRef} className="contribution-list" onPointerLeave={() => setHighlight(null)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setHighlight(null);
    }}>
      <span className="contribution-highlight" aria-hidden="true" style={{ transform: `translateY(${highlight?.top || 0}px)`, height: highlight?.height || 56, opacity: highlight ? 1 : 0 }} />
      {entries.map((entry) => (
        <a key={entry.id} href={entry.url} target="_blank" rel="noopener noreferrer" className="contribution-row" onPointerEnter={moveHighlight} onFocus={moveHighlight} aria-label={`${entry.title}, ${entry.repository}, ${entry.status}`}>
          <OrganizationLogo entry={entry} />
          <span className="contribution-copy">
            <strong>{entry.title}</strong>
            <span className="contribution-meta">
              <span className="contribution-repository">{entry.repository}</span>
              {Number.isFinite(entry.additions) && <span className="contribution-added" aria-label={`${entry.additions} lines added`}>+{entry.additions.toLocaleString()}</span>}
              {Number.isFinite(entry.deletions) && <span className="contribution-removed" aria-label={`${entry.deletions} lines removed`}>−{entry.deletions.toLocaleString()}</span>}
            </span>
          </span>
          <span className="contribution-date">
            <time dateTime={entry.date}>{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
            <span className={`contribution-status ${entry.statusClass || entry.status.toLowerCase()}`} role="img" aria-label={entry.status} title={entry.status}>
              {entry.status === 'Merged' ? <GoGitMerge /> : entry.status === 'Open' ? <FiGitPullRequest /> : <FiXCircle />}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
};

export default ContributionList;
