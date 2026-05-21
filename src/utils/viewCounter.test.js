import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getLiveViewCount } from './viewCounter';

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

    await expect(getLiveViewCount()).resolves.toBe(351);

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
});
