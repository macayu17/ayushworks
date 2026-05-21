import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  getLiveViewCount,
  getPortfolioViewCount,
  shouldUseDevelopmentCounter,
} from './viewCounter';

const jsonResponse = (body, ok = true, status = ok ? 200 : 500) => ({
  ok,
  status,
  json: () => Promise.resolve(body),
});

describe('live view counter', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.unstubAllGlobals();
  });

  test('falls back to direct CounterAPI when the same-origin API is unavailable', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ error: 'Not found' }, false, 404))
      .mockResolvedValueOnce(jsonResponse({ count: 351 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(getLiveViewCount()).resolves.toBe(470);

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      '/api/portfolio-meta?mode=increment',
      { cache: 'no-store' },
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://api.counterapi.dev/v1/macayu17/portfolio/up',
      { cache: 'no-store' },
    );
  });

  test('applies the manual live counter baseline to provider counts', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({ views: 269 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(getLiveViewCount()).resolves.toBe(389);
  });

  test('does not use the development counter on production domains even with a dev build flag', () => {
    expect(shouldUseDevelopmentCounter({
      isViteDev: true,
      hostname: 'ayushh.in',
    })).toBe(false);
  });

  test('uses the live counter on production domains even with a dev build flag', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse({ views: 270 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(getPortfolioViewCount({
      isViteDev: true,
      hostname: 'ayushh.in',
    })).resolves.toBe(389);

    expect(localStorage.getItem('portfolio-dev-view-count')).toBeNull();
  });
});
