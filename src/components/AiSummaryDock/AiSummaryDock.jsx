import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SiClaude, SiGooglegemini, SiOpenai, SiPerplexity } from 'react-icons/si';
import { createAiSummaryPrompt, getAiSummaryLinks } from '../../utils/aiSummaryLinks';
import { getSeoMetadataForPath } from '../../utils/seo';
import './AiSummaryDock.css';

const providerIcons = {
  chatgpt: SiOpenai,
  perplexity: SiPerplexity,
  claude: SiClaude,
  gemini: SiGooglegemini,
};

const AiSummaryDock = () => {
  const location = useLocation();
  const [pageText, setPageText] = useState('');
  const metadata = useMemo(
    () => getSeoMetadataForPath(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    const readPageText = () => {
      setPageText(document.querySelector('#main-content')?.innerText || document.body.innerText || '');
    };

    readPageText();
    const timer = window.setTimeout(readPageText, 700);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  const prompt = useMemo(
    () => createAiSummaryPrompt({
      pathname: location.pathname,
      search: location.search,
      title: metadata.title,
      pageText,
    }),
    [location.pathname, location.search, metadata.title, pageText],
  );
  const links = useMemo(() => getAiSummaryLinks(prompt), [prompt]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard?.writeText(prompt);
    } catch {
      // Opening the AI tool is the primary action; clipboard is only a fallback.
    }
  };

  return (
    <aside className="ai-summary-dock" aria-label="Summarize this page with AI">
      <span className="ai-summary-label">Summarize with AI</span>
      <div className="ai-summary-actions">
        {links.map((link) => {
          const Icon = providerIcons[link.id];

          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`ai-summary-button ai-summary-button-${link.id}`}
              aria-label={`Open ${link.label} with a summary prompt for this page`}
              title={`Open ${link.label}`}
              onClick={copyPrompt}
            >
              {Icon && <Icon size={16} aria-hidden="true" />}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default AiSummaryDock;
