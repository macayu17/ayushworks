import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { describe, expect, test } from 'vitest';

const source = (path) => readFileSync(join(cwd(), path), 'utf8');

describe('performance-sensitive imports', () => {
  test('keeps route transitions on CSS instead of shipping framer-motion', () => {
    [
      'src/App.jsx',
      'src/pages/About.jsx',
      'src/pages/Contact.jsx',
      'src/pages/Home.jsx',
      'src/pages/OpenSource.jsx',
      'src/pages/ProjectDetail.jsx',
      'src/pages/Projects.jsx',
      'src/pages/Skills.jsx',
    ].forEach((file) => {
      expect(source(file)).not.toContain('framer-motion');
    });
  });

  test('reveals the sidebar and route content in the same startup fade', () => {
    const appSource = source('src/App.jsx');
    const cssSource = source('src/index.css');
    const shellStart = appSource.indexOf('className={`app-shell');
    const suspenseStart = appSource.lastIndexOf('<Suspense fallback={null}>', shellStart);

    expect(suspenseStart).toBeGreaterThan(-1);
    expect(cssSource).toMatch(/\.app-shell\s*\{[^}]*animation:\s*app-shell-enter/s);
  });
});
