import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const rootPath = cwd();

describe('favicon assets', () => {
  test('uses a small dedicated favicon instead of downloading the full profile PNG', () => {
    const indexHtml = readFileSync(join(rootPath, 'index.html'), 'utf8');
    const faviconPath = join(rootPath, 'public', 'favicon-32x32.png');

    expect(indexHtml).toContain('<link rel="icon" type="image/png" href="/favicon-32x32.png?v=5" />');
    expect(existsSync(faviconPath)).toBe(true);
    expect(statSync(faviconPath).size).toBeLessThan(5000);
  });
});
