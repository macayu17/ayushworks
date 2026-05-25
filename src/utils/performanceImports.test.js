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

  test('loads the AI summary dock outside the initial app module', () => {
    const appSource = source('src/App.jsx');

    expect(appSource).toContain("const AiSummaryDock = lazy(() => import('./components/AiSummaryDock/AiSummaryDock'))");
    expect(appSource).not.toContain("import AiSummaryDock from './components/AiSummaryDock/AiSummaryDock'");
  });
});
