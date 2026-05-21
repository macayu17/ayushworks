import { describe, expect, test } from 'vitest';
import { createAiSummaryPrompt, getAiSummaryLinks } from './aiSummaryLinks';

describe('AI summary links', () => {
  test('builds a public-page prompt for the current route', () => {
    const prompt = createAiSummaryPrompt({
      pathname: '/projects/sentinel',
      search: '?ref=test',
      title: 'Sentinel | Ayush Kumar',
      pageText: 'Sentinel Market microstructure simulator Hidden institutional order detection',
    });

    expect(prompt).toContain('https://ayushh.in/projects/sentinel?ref=test');
    expect(prompt).toContain('https://github.com/macayu17');
    expect(prompt).toContain('Sentinel | Ayush Kumar');
    expect(prompt).toContain('Open the Page URL directly');
    expect(prompt).toContain('Do not use search results');
    expect(prompt).toContain('Hidden institutional order detection');
    expect(prompt).toContain('projects or skills');
  });

  test('limits long captured page text before encoding links', () => {
    const prompt = createAiSummaryPrompt({
      pageText: 'A'.repeat(5000),
    });

    expect(prompt.length).toBeLessThan(4700);
    expect(prompt).not.toContain('A'.repeat(4300));
  });

  test('creates encoded provider links for each AI surface', () => {
    const links = getAiSummaryLinks('Summarize this page: https://ayushh.in/');

    expect(links.map((link) => link.id)).toEqual([
      'chatgpt',
      'perplexity',
      'claude',
      'gemini',
    ]);
    expect(links[0].href).toMatch(/^https:\/\/chatgpt\.com\/\?q=/);
    expect(links[1].href).toMatch(/^https:\/\/www\.perplexity\.ai\/search\/new\?q=/);
    expect(links[2].href).toMatch(/^https:\/\/claude\.ai\/new\?q=/);
    expect(links[3].href).toMatch(/^https:\/\/gemini\.google\.com\/app\?q=/);
    expect(links[0].href).toContain('Summarize%20this%20page');
  });
});
