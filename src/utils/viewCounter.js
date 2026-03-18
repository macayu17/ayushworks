const DEV_VIEW_COUNT_STORAGE_KEY = 'portfolio-dev-view-count';
const DEV_VIEW_COUNT_SESSION_KEY = 'portfolio-dev-view-count-session';
const LIVE_VIEW_COUNT_CACHE_KEY = 'portfolio-live-view-count';
const LIVE_VIEW_COUNT_SESSION_KEY = 'portfolio-live-view-count-session';
const COUNTER_API_BASE_URL = 'https://api.counterapi.dev/v1/macayu17/portfolio';

const getStorage = (type) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return type === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
};

const readStoredCount = (storage, key) => {
  if (!storage) {
    return null;
  }

  const storedCount = Number(storage.getItem(key));
  return Number.isFinite(storedCount) && storedCount >= 0 ? storedCount : null;
};

const writeStoredCount = (storage, key, count) => {
  if (!storage || !Number.isFinite(count) || count < 0) {
    return;
  }

  storage.setItem(key, String(count));
};

const fetchCounterCount = async (path = '') => {
  const response = await fetch(`${COUNTER_API_BASE_URL}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`View count request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (typeof data?.count !== 'number') {
    throw new Error('View count response did not include a numeric count');
  }

  return data.count;
};

export const getDevelopmentViewCount = () => {
  const localStorage = getStorage('local');
  const sessionStorage = getStorage('session');
  const safeCount = readStoredCount(localStorage, DEV_VIEW_COUNT_STORAGE_KEY) ?? 0;

  if (sessionStorage?.getItem(DEV_VIEW_COUNT_SESSION_KEY)) {
    return safeCount;
  }

  const nextCount = safeCount + 1;
  writeStoredCount(localStorage, DEV_VIEW_COUNT_STORAGE_KEY, nextCount);
  sessionStorage?.setItem(DEV_VIEW_COUNT_SESSION_KEY, 'true');

  return nextCount;
};

export const getLiveViewCount = async () => {
  const localStorage = getStorage('local');
  const sessionStorage = getStorage('session');
  const cachedCount = readStoredCount(localStorage, LIVE_VIEW_COUNT_CACHE_KEY);
  const hasCountedThisSession = sessionStorage?.getItem(LIVE_VIEW_COUNT_SESSION_KEY) === 'true';

  if (hasCountedThisSession) {
    const currentCount = await fetchCounterCount('/');
    writeStoredCount(localStorage, LIVE_VIEW_COUNT_CACHE_KEY, currentCount);
    return currentCount;
  }

  try {
    const nextCount = await fetchCounterCount('/up');
    writeStoredCount(localStorage, LIVE_VIEW_COUNT_CACHE_KEY, nextCount);
    sessionStorage?.setItem(LIVE_VIEW_COUNT_SESSION_KEY, 'true');
    return nextCount;
  } catch (incrementError) {
    try {
      const currentCount = await fetchCounterCount('/');
      writeStoredCount(localStorage, LIVE_VIEW_COUNT_CACHE_KEY, currentCount);
      return currentCount;
    } catch {
      if (cachedCount !== null) {
        return cachedCount;
      }

      throw incrementError;
    }
  }
};
