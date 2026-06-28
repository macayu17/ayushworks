import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { describe, expect, test } from 'vitest';

describe('contribution refresh workflow', () => {
  const workflow = readFileSync(
    join(cwd(), '.github/workflows/refresh-contributions.yml'),
    'utf8',
  );
  const openSourceApi = readFileSync(join(cwd(), 'api/open-source.js'), 'utf8');

  test('warms the production contribution API every 6 hours', () => {
    expect(workflow).toContain('cron: "0 */6 * * *"');
    expect(workflow).toContain('CONTRIBUTIONS_ENDPOINT: https://www.ayushh.in/api/open-source?contributions=v6');
    expect(workflow).toContain('--header "Cache-Control: no-cache"');
  });

  test('can be triggered manually from GitHub Actions', () => {
    expect(workflow).toContain('workflow_dispatch:');
  });

  test('keeps the production API cache on the same 6-hour cadence', () => {
    expect(openSourceApi).toContain('s-maxage=21600, stale-while-revalidate=21600');
  });
});
