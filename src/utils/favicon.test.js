import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const rootPath = cwd();

describe('favicon assets', () => {
  test('uses compact cache-busted favicon assets that stay legible in browser tabs', () => {
    const indexHtml = readFileSync(join(rootPath, 'index.html'), 'utf8');
    const faviconSvg = readFileSync(join(rootPath, 'public', 'favicon.svg'), 'utf8');
    const pngPath = join(rootPath, 'public', 'favicon-32x32.png');

    expect(indexHtml).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />');
    expect(indexHtml).toContain('<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />');
    expect(faviconSvg).toContain('aria-label="Ayush"');
    expect(faviconSvg).toContain('viewBox="0 0 64 64"');
    expect(faviconSvg).toContain('M20 43 32 15l12 28');
    expect(faviconSvg.length).toBeLessThan(4000);
    expect(existsSync(pngPath)).toBe(true);
    expect(statSync(pngPath).size).toBeGreaterThan(100);
  });
});
