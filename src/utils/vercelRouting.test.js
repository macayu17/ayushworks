import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const rootPath = cwd();

describe('Vercel routing', () => {
  test('rewrites browser-refresh client routes to the SPA entrypoint', () => {
    const config = JSON.parse(readFileSync(join(rootPath, 'vercel.json'), 'utf8'));
    const spaFallback = config.rewrites.find(
      (rewrite) => rewrite.destination === '/index.html',
    );

    expect(spaFallback).toEqual({
      source: '/((?!api/|assets/|favicon\\.png|favicon\\.svg|favicon-32x32\\.png).*)',
      destination: '/index.html',
    });
  });
});
