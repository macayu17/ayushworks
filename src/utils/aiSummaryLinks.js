const PUBLIC_SITE_ORIGIN = 'https://ayushworks.com';
const GITHUB_PROFILE_URL = 'https://github.com/macayu17';
const MAX_PAGE_TEXT_LENGTH = 3800;

const cleanPageText = (pageText = '') =>
  String(pageText)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_PAGE_TEXT_LENGTH);

export const createAiSummaryPrompt = ({
  pathname = '/',
  search = '',
  title = 'Ayush Kumar',
  pageText = '',
} = {}) => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const publicUrl = `${PUBLIC_SITE_ORIGIN}${normalizedPath}${search || ''}`;
  const contentSnapshot = cleanPageText(pageText);

  return [
    'Summarize ONLY the page content below from Ayush Kumar\'s current portfolio website.',
    'Open the Page URL directly if your environment supports browsing, and use it to verify the captured page content.',
    `You may also review Ayush's GitHub profile for supporting project context: ${GITHUB_PROFILE_URL}`,
    'Do not use search results, old indexed pages, assumptions, or unrelated information from the internet.',
    'Do not let GitHub context override what this specific portfolio page says.',
    'If something is not present in the provided content, do not mention it.',
    '',
    `Page title: ${title}`,
    `Page URL: ${publicUrl}`,
    '',
    'Page content:',
    contentSnapshot || 'No page text was captured. Use the page title and URL only.',
    '',
    'Return a concise summary with the important context, strongest projects or skills present on this page, and useful calls to action.',
  ].join('\n');
};

export const aiSummaryProviders = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    href: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    href: (prompt) => `https://www.perplexity.ai/search/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'claude',
    label: 'Claude',
    href: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'gemini',
    label: 'Gemini',
    href: (prompt) => `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
];

export const getAiSummaryLinks = (prompt) =>
  aiSummaryProviders.map((provider) => ({
    id: provider.id,
    label: provider.label,
    href: provider.href(prompt),
  }));
