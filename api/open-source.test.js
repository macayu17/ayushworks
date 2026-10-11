import { beforeEach, describe, expect, test, vi } from 'vitest';

const fetchContributions = vi.hoisted(() => vi.fn());
vi.mock('../lib/openSourceContributions.js', () => ({ fetchOpenSourceContributions: fetchContributions }));

const response = () => ({
  setHeader: vi.fn(),
  status: vi.fn().mockReturnThis(),
  send: vi.fn(),
});

describe('contribution API cache', () => {
  beforeEach(() => {
    vi.resetModules();
    fetchContributions.mockReset();
    vi.useRealTimers();
  });

  test('shares upstream requests between concurrent visitors and caches real diff totals', async () => {
    let resolve;
    fetchContributions.mockReturnValue(new Promise((done) => { resolve = done; }));
    const handler = (await import('./open-source.js')).default;
    const first = response();
    const second = response();
    const calls = [handler({ method: 'GET' }, first), handler({ method: 'GET' }, second)];
    expect(fetchContributions).toHaveBeenCalledTimes(1);
    resolve([{ id: 'pr', additions: 32, deletions: 36 }]);
    await Promise.all(calls);
    const third = response();
    await handler({ method: 'GET' }, third);
    expect(fetchContributions).toHaveBeenCalledTimes(1);
    expect(JSON.parse(third.send.mock.calls[0][0]).prs[0]).toMatchObject({ additions: 32, deletions: 36 });
    expect(first.send.mock.calls[0][0]).toBe(second.send.mock.calls[0][0]);
  });

  test('retries after an upstream failure instead of caching the failure', async () => {
    fetchContributions.mockRejectedValueOnce(new Error('Unavailable')).mockResolvedValueOnce([]);
    const handler = (await import('./open-source.js')).default;
    const failed = response();
    await handler({ method: 'GET' }, failed);
    expect(failed.status).toHaveBeenCalledWith(502);
    const recovered = response();
    await handler({ method: 'GET' }, recovered);
    expect(recovered.status).toHaveBeenCalledWith(200);
    expect(fetchContributions).toHaveBeenCalledTimes(2);
  });
});
