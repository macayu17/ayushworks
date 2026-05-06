import { describe, expect, test } from 'vitest';
import { filterProjects, getProjectFilterOptions } from './projectFilters';

const projects = [
  {
    title: 'Sentinel',
    status: 'Ongoing',
    category: 'Market simulator',
    summary: 'Liquidity shock prediction',
    tags: ['FastAPI', 'Next.js'],
  },
  {
    title: 'Occasio',
    status: 'Live',
    category: 'Event platform',
    summary: 'Ticketing and registrations',
    tags: ['React', 'Node.js'],
  },
  {
    title: 'Clinical Screening',
    status: 'Completed',
    category: 'Clinical ML',
    summary: 'Transformer screening portal',
    tags: ['Python', 'PyTorch'],
  },
];

describe('project filters', () => {
  test('filters projects by search query, status, and tag', () => {
    const result = filterProjects(projects, {
      query: 'shock',
      status: 'Ongoing',
      tag: 'FastAPI',
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Sentinel');
  });

  test('searches across title, summary, category, status, and tags case-insensitively', () => {
    expect(filterProjects(projects, { query: 'ticketing' }).map((project) => project.title)).toEqual(['Occasio']);
    expect(filterProjects(projects, { query: 'PYTORCH' }).map((project) => project.title)).toEqual(['Clinical Screening']);
    expect(filterProjects(projects, { query: 'completed' }).map((project) => project.title)).toEqual(['Clinical Screening']);
  });

  test('derives sorted status and tag filter options', () => {
    expect(getProjectFilterOptions(projects)).toEqual({
      statuses: ['Completed', 'Live', 'Ongoing'],
      tags: ['FastAPI', 'Next.js', 'Node.js', 'Python', 'PyTorch', 'React'],
    });
  });
});
