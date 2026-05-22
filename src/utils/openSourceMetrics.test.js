import { describe, expect, test } from 'vitest';
import { getOpenSourceMetricCards } from './openSourceMetrics';

describe('open source metric cards', () => {
  test('shows open PRs instead of closed PRs in the summary cards', () => {
    const metricCards = getOpenSourceMetricCards([
      { repository: 'org/repo-one', status: 'Merged' },
      { repository: 'org/repo-one', status: 'Open' },
      { repository: 'org/repo-two', status: 'Open' },
      { repository: 'org/repo-three', status: 'Closed' },
    ]);

    expect(metricCards).toContainEqual({ label: 'Open PRs / MRs', value: 2 });
    expect(metricCards).not.toContainEqual({ label: 'Closed', value: 1 });
  });
});
