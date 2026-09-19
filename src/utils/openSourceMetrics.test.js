import { describe, expect, test } from 'vitest';
import { getOpenSourceMetricCards } from './openSourceMetrics';

describe('open source metric cards', () => {
  test('shows organizations and open PRs instead of repositories and closed PRs', () => {
    const metricCards = getOpenSourceMetricCards([
      { repository: 'org/repo-one', status: 'Merged' },
      { repository: 'org/repo-one', status: 'Open' },
      { repository: 'org/repo-two', status: 'Open' },
      { repository: 'org/repo-three', status: 'Closed' },
    ]);

    expect(metricCards).toContainEqual({ label: 'Open PRs / MRs', value: 2 });
    expect(metricCards.find((metric) => metric.label === 'Organizations')).toMatchObject({
      logos: [{ name: 'org', src: 'https://github.com/org.png?size=64' }],
    });
    expect(metricCards).not.toContainEqual({ label: 'Repositories', value: 3 });
    expect(metricCards).not.toContainEqual({ label: 'Closed', value: 1 });
  });
});
