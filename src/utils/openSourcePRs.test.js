import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { loadOpenSourcePRs, OPEN_SOURCE_CACHE_TTL } from './openSourcePRs';

afterEach(() => { vi.unstubAllGlobals(); });

const apiPayload = {
  prs: [
    {
      id: 'pr-1',
      platform: 'GitHub',
      reference: '#12',
      title: 'Improve docs',
      url: 'https://github.com/org/repo/pull/12',
      repository: 'org/repo',
      repositoryUrl: 'https://github.com/org/repo',
      status: 'Merged',
      statusClass: 'merged',
      date: '2026-01-01T00:00:00Z',
      labels: ['docs'],
    },
  ],
  updatedAt: 1767225600000,
};

describe('open source PR loader', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('loads contributions from the local API endpoint and caches the response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => apiPayload,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await loadOpenSourcePRs({ forceRefresh: true });

    expect(fetchMock).toHaveBeenCalledWith('/api/open-source?contributions=v9', { cache: 'no-store' });
    expect(result).toMatchObject({
      prs: apiPayload.prs,
      fromCache: false,
      isStale: false,
      updatedAt: apiPayload.updatedAt,
    });
  });

  test('expires local contribution data every 6 hours', () => {
    expect(OPEN_SOURCE_CACHE_TTL).toBe(6 * 60 * 60 * 1000);
  });

  test('uses a fresh local cache without calling the API', async () => {
    localStorage.setItem(
      'portfolio-open-source-contributions-v9',
      JSON.stringify({ data: apiPayload.prs, updatedAt: Date.now() }),
    );
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await loadOpenSourcePRs();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.prs).toEqual(apiPayload.prs);
    expect(result.fromCache).toBe(true);
  });

  test('refreshes local contribution data after the 6-hour cache window', async () => {
    localStorage.setItem(
      'portfolio-open-source-contributions-v9',
      JSON.stringify({
        data: [],
        updatedAt: Date.now() - OPEN_SOURCE_CACHE_TTL - 1,
      }),
    );
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => apiPayload,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await loadOpenSourcePRs();

    expect(fetchMock).toHaveBeenCalledWith('/api/open-source?contributions=v9', { cache: 'no-store' });
    expect(result.prs).toEqual(apiPayload.prs);
    expect(result.fromCache).toBe(false);
  });
});

test('shares overlapping API requests and allows another refresh after completion', async () => {
  let resolve;
  const fetchMock = vi.fn().mockImplementationOnce(() => new Promise((done) => { resolve = done; }))
    .mockResolvedValue({ ok: true, json: async () => apiPayload });
  vi.stubGlobal('fetch', fetchMock);
  const first = loadOpenSourcePRs({ forceRefresh: true });
  const second = loadOpenSourcePRs({ forceRefresh: true });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  resolve({ ok: true, json: async () => apiPayload });
  expect(await first).toEqual(await second);
  await loadOpenSourcePRs({ forceRefresh: true });
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test('retries after a shared failed request and preserves stale data', async () => {
  localStorage.setItem('portfolio-open-source-contributions-v9', JSON.stringify({ data: apiPayload.prs, updatedAt: 1 }));
  const fetchMock = vi.fn().mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValue({ ok: true, json: async () => apiPayload });
  vi.stubGlobal('fetch', fetchMock);
  const results = await Promise.all([loadOpenSourcePRs({ forceRefresh: true }), loadOpenSourcePRs({ forceRefresh: true })]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(results.every((result) => result.isStale)).toBe(true);
  expect((await loadOpenSourcePRs({ forceRefresh: true })).isStale).toBe(false);
});

// Both the homepage preview and archive use the same status/date order.
test('sorts contribution status and newest dates without mutating its input', async () => {
  const { sortContributions } = await import('./openSourcePRs');
  const input = [
    { status: 'Closed', date: '2026-10-21' },
    { status: 'Open', date: '2026-10-20' },
    { status: 'Merged', date: '2026-10-19' },
    { status: 'Merged', date: '2026-10-22' },
  ];
  const original = [...input];
  expect(sortContributions(input)).toEqual([input[3], input[2], input[1], input[0]]);
  expect(input).toEqual(original);
});
