import { describe, expect, test } from 'vitest';
import {
  coreProjectCatalog,
  funProjectCatalog,
  getProjectBySlug,
  projectCatalog,
} from './projects';

describe('portfolio project catalog', () => {
  test('keeps the requested project display order', () => {
    expect(projectCatalog.map((project) => project.slug)).toEqual([
      'sentinel',
      'engram',
      'equityflow',
      'ipl-auction-arena',
      'occasio',
      'gridpulse',
      'parkinsons-screening',
      'attendly',
      'vector',
      'multimodal-sentiment',
    ]);
  });

  test('groups smaller fun projects separately for the home page', () => {
    expect(coreProjectCatalog.map((project) => project.slug)).toEqual([
      'sentinel',
      'engram',
      'equityflow',
      'ipl-auction-arena',
      'occasio',
      'parkinsons-screening',
    ]);
    expect(funProjectCatalog.map((project) => project.slug)).toEqual([
      'gridpulse',
      'attendly',
      'vector',
      'multimodal-sentiment',
    ]);
  });

  test('adds Engram with live, source, and memory-layer metadata', () => {
    const engram = getProjectBySlug('engram');

    expect(engram).toMatchObject({
      title: 'Engram',
      status: 'Live',
      live: 'https://engram.ayushh.in',
      github: 'https://github.com/macayu17/Engram',
    });
    expect(engram.summary).toContain('AI memory layer');
    expect(engram.tags).toEqual(expect.arrayContaining(['FastAPI', 'pgvector', 'MCP', 'Next.js']));
  });
});
