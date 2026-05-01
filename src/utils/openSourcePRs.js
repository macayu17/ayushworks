const GITHUB_USERNAME = 'macayu17';
const GITLAB_USERNAME = 'macayu17';
const CACHE_KEY = 'portfolio-open-source-contributions-v2';
export const OPEN_SOURCE_CACHE_TTL = 24 * 60 * 60 * 1000;

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const readCache = ({ allowStale = false } = {}) => {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  try {
    const cached = JSON.parse(storage.getItem(CACHE_KEY));
    if (!cached?.updatedAt || !Array.isArray(cached?.data)) {
      return null;
    }

    const isFresh = Date.now() - cached.updatedAt < OPEN_SOURCE_CACHE_TTL;
    return isFresh || allowStale ? { ...cached, isFresh } : null;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const cachePayload = {
    data,
    updatedAt: Date.now(),
  };

  try {
    storage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
    return cachePayload;
  } catch {
    return cachePayload;
  }
};

const getRepoParts = (repositoryUrl = '') => {
  const [, owner = '', repo = ''] =
    repositoryUrl.match(/\/repos\/([^/]+)\/([^/]+)$/) || [];

  return {
    owner,
    name: repo,
    fullName: owner && repo ? `${owner}/${repo}` : 'unknown/repository',
    url: owner && repo ? `https://github.com/${owner}/${repo}` : null,
  };
};

const getContributionStatus = (pr) => {
  if (pr.pull_request?.merged_at) {
    return 'Merged';
  }

  return pr.state === 'open' ? 'Open' : 'Closed';
};

const getStatusClass = (status) => status.toLowerCase();

const getStatusRank = (status) => {
  if (status === 'Merged') {
    return 0;
  }

  if (status === 'Open') {
    return 1;
  }

  return 2;
};

const normalizePullRequest = (pr) => {
  const repo = getRepoParts(pr.repository_url);
  const status = getContributionStatus(pr);
  const date =
    pr.pull_request?.merged_at ||
    pr.closed_at ||
    pr.updated_at ||
    pr.created_at;

  return {
    id: pr.node_id || pr.html_url,
    platform: 'GitHub',
    reference: `#${pr.number}`,
    title: pr.title,
    url: pr.html_url,
    repository: repo.fullName,
    repositoryUrl: repo.url,
    status,
    statusClass: getStatusClass(status),
    date,
    labels: (pr.labels || []).map((label) => label.name).filter(Boolean),
  };
};

const fetchFromGitHub = async () => {
  const query = `author:${GITHUB_USERNAME} is:pr -user:${GITHUB_USERNAME}`;
  const url = new URL('https://api.github.com/search/issues');

  url.searchParams.set('q', query);
  url.searchParams.set('sort', 'updated');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', '30');

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const data = await response.json();
  return (data.items || []).map(normalizePullRequest);
};

const getGitLabRepository = (mr) => {
  const fullReference = mr.references?.full || '';
  const repository = fullReference.includes('!')
    ? fullReference.split('!')[0]
    : 'unknown/repository';

  return {
    fullName: repository,
    url: repository !== 'unknown/repository' ? `https://gitlab.com/${repository}` : null,
  };
};

const getGitLabStatus = (state) => {
  if (state === 'merged') {
    return 'Merged';
  }

  if (state === 'opened') {
    return 'Open';
  }

  return 'Closed';
};

const normalizeGitLabMergeRequest = (mr) => {
  const repo = getGitLabRepository(mr);
  const status = getGitLabStatus(mr.state);

  return {
    id: `gitlab-${mr.project_id}-${mr.iid}`,
    platform: 'GitLab',
    reference: `!${mr.iid}`,
    title: mr.title,
    url: mr.web_url,
    repository: repo.fullName,
    repositoryUrl: repo.url,
    status,
    statusClass: getStatusClass(status),
    date: mr.merged_at || mr.closed_at || mr.updated_at || mr.created_at,
    labels: Array.isArray(mr.labels) ? mr.labels : [],
  };
};

const fetchGitLabUserId = async () => {
  const url = new URL('https://gitlab.com/api/v4/users');
  url.searchParams.set('username', GITLAB_USERNAME);

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitLab user lookup returned ${response.status}`);
  }

  const users = await response.json();
  const user = users.find((entry) => entry.username === GITLAB_USERNAME);

  if (!user?.id) {
    throw new Error(`GitLab user ${GITLAB_USERNAME} was not found`);
  }

  return user.id;
};

const fetchFromGitLab = async () => {
  const authorId = await fetchGitLabUserId();
  const url = new URL('https://gitlab.com/api/v4/merge_requests');

  url.searchParams.set('author_id', String(authorId));
  url.searchParams.set('scope', 'all');
  url.searchParams.set('state', 'all');
  url.searchParams.set('order_by', 'updated_at');
  url.searchParams.set('sort', 'desc');
  url.searchParams.set('per_page', '40');

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitLab merge request lookup returned ${response.status}`);
  }

  const mergeRequests = await response.json();

  return mergeRequests
    .map(normalizeGitLabMergeRequest)
    .filter((entry) => !entry.repository.toLowerCase().startsWith(`${GITLAB_USERNAME}/`));
};

const fetchOpenSourceContributions = async () => {
  const results = await Promise.allSettled([
    fetchFromGitHub(),
    fetchFromGitLab(),
  ]);

  const contributions = results.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : [],
  );

  if (contributions.length === 0) {
    const errors = results
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason?.message || 'Unknown API failure')
      .join('; ');

    throw new Error(errors || 'No open source contributions were returned');
  }

  return contributions.sort((first, second) => {
    const statusRank = getStatusRank(first.status) - getStatusRank(second.status);
    if (statusRank !== 0) {
      return statusRank;
    }

    const firstDate = new Date(first.date).getTime();
    const secondDate = new Date(second.date).getTime();
    return secondDate - firstDate;
  });
};

export const loadOpenSourcePRs = async ({ forceRefresh = false } = {}) => {
  if (!forceRefresh) {
    const cached = readCache();
    if (cached) {
      return {
        prs: cached.data,
        updatedAt: cached.updatedAt,
        fromCache: true,
        isStale: false,
      };
    }
  }

  try {
    const contributions = await fetchOpenSourceContributions();
    const cached = writeCache(contributions);

    return {
      prs: contributions,
      updatedAt: cached?.updatedAt ?? Date.now(),
      fromCache: false,
      isStale: false,
    };
  } catch (error) {
    const stale = readCache({ allowStale: true });
    if (stale) {
      return {
        prs: stale.data,
        updatedAt: stale.updatedAt,
        fromCache: true,
        isStale: true,
      };
    }

    throw error;
  }
};
