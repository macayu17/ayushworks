import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const rootPath = cwd();

describe('favicon assets', () => {
  test('uses the user-provided cache-busted PNG favicon', () => {
    const indexHtml = readFileSync(join(rootPath, 'index.html'), 'utf8');
    const faviconPath = join(rootPath, 'public', 'favicon.png');

    expect(indexHtml).toContain('<link rel="icon" type="image/png" href="/favicon.png?v=4" />');
    expect(existsSync(faviconPath)).toBe(true);
    expect(statSync(faviconPath).size).toBeGreaterThan(1000);
  });
});
