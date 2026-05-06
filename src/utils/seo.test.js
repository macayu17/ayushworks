import { describe, expect, test } from 'vitest';
import { projectCatalog } from '../data/projects';
import { getSeoMetadataForPath } from './seo';

describe('SEO metadata', () => {
  test('returns project-specific metadata for detail routes', () => {
    const project = projectCatalog.find((entry) => entry.slug === 'sentinel');
    const metadata = getSeoMetadataForPath('/projects/sentinel');

    expect(metadata.title).toBe(`${project.title} | Ayush Kumar`);
    expect(metadata.description).toBe(project.summary);
    expect(metadata.image).toBe(project.image);
    expect(metadata.canonicalPath).toBe('/projects/sentinel');
  });

  test('falls back to route metadata for unknown paths', () => {
    const metadata = getSeoMetadataForPath('/missing-route');

    expect(metadata.title).toBe('Ayush Kumar | Software Engineer');
    expect(metadata.description).toContain('full-stack');
    expect(metadata.canonicalPath).toBe('/');
  });
});
