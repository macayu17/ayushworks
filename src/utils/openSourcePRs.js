const CACHE_KEY = 'portfolio-open-source-contributions-v3';
const OPEN_SOURCE_ENDPOINT = '/api/open-source';
export const OPEN_SOURCE_CACHE_TTL = 12 * 60 * 60 * 1000;

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

const writeCache = (data, updatedAt = Date.now()) => {
  const storage = getStorage();
  const cachePayload = {
    data,
    updatedAt,
  };

  if (!storage) {
    return cachePayload;
  }

  try {
    storage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
  } catch {
    // Local storage can fail in private modes; the API result is still usable.
  }

  return cachePayload;
};

const fetchFromPortfolioApi = async () => {
  const response = await fetch(OPEN_SOURCE_ENDPOINT, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Open source contribution API returned ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data?.prs)) {
    throw new Error('Open source contribution API did not return a PR list');
  }

  return {
    prs: data.prs,
    updatedAt: Number.isFinite(data.updatedAt) ? data.updatedAt : Date.now(),
  };
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
    const contributions = await fetchFromPortfolioApi();
    const cached = writeCache(contributions.prs, contributions.updatedAt);

    return {
      prs: contributions.prs,
      updatedAt: cached.updatedAt,
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
