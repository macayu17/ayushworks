import { beforeEach, describe, expect, test } from 'vitest';
import { applySeoMetadata } from './seo';

describe('SEO DOM updates', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '<meta name="description" content="">';
  });

  test('uses browserTitle for the visible browser tab while keeping SEO title metadata', () => {
    applySeoMetadata({
      title: 'Ayush Kumar | Software Engineer',
      browserTitle: 'Ayush',
      description: 'Portfolio',
      canonicalPath: '/',
      image: '/favicon.png',
      type: 'website',
    });

    expect(document.title).toBe('Ayush');
    expect(document.head.querySelector('meta[property="og:title"]').content)
      .toBe('Ayush Kumar | Software Engineer');
  });
});
