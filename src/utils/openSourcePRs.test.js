import { beforeEach, describe, expect, test, vi } from 'vitest';
import { loadOpenSourcePRs } from './openSourcePRs';

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

    expect(fetchMock).toHaveBeenCalledWith('/api/open-source', { cache: 'no-store' });
    expect(result).toMatchObject({
      prs: apiPayload.prs,
      fromCache: false,
      isStale: false,
      updatedAt: apiPayload.updatedAt,
    });
  });

  test('uses a fresh local cache without calling the API', async () => {
    localStorage.setItem(
      'portfolio-open-source-contributions-v3',
      JSON.stringify({ data: apiPayload.prs, updatedAt: Date.now() }),
    );
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await loadOpenSourcePRs();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.prs).toEqual(apiPayload.prs);
    expect(result.fromCache).toBe(true);
  });
});
