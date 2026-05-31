import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchOpenSourceContributions } from './openSourceContributions.js';

const githubPr = ({ number, title, repositoryUrl, state = 'open' }) => ({
  node_id: `github-pr-${number}`,
  number,
  title,
  html_url: repositoryUrl.replace('https://api.github.com/repos', 'https://github.com') + `/pull/${number}`,
  repository_url: repositoryUrl,
  state,
  pull_request: {},
  updated_at: '2026-05-26T08:16:57Z',
  created_at: '2026-05-26T08:16:57Z',
  closed_at: null,
  labels: [],
});

const jsonResponse = (payload) => ({
  ok: true,
  json: async () => payload,
});

describe('open source contributions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('filters manually hidden open-source entries from every section', async () => {
    const fetchMock = vi.fn(async (input) => {
      const url = String(input);

      if (url.startsWith('https://api.github.com/search/issues')) {
        return jsonResponse({
          items: [
            githubPr({
              number: 39371,
              title: 'bootstrap.app: Remove legacy anchor state rules.',
              repositoryUrl: 'https://api.github.com/repos/zulip/zulip',
              state: 'closed',
            }),
            githubPr({
              number: 3488,
              title: 'Withdrawn',
              repositoryUrl: 'https://api.github.com/repos/pallets/click',
              state: 'closed',
            }),
            githubPr({
              number: 99,
              title: 'Still active',
              repositoryUrl: 'https://api.github.com/repos/example/project',
            }),
          ],
        });
      }

      if (url === 'https://api.github.com/repos/zulip/zulip/issues/39370') {
        return jsonResponse(
          githubPr({
            number: 39370,
            title: 'popup_banners: Move global errors to banner component.',
            repositoryUrl: 'https://api.github.com/repos/zulip/zulip',
          }),
        );
      }

      if (url.startsWith('https://gitlab.com/api/v4/users')) {
        return jsonResponse([{ id: 17, username: 'macayu17' }]);
      }

      if (url.startsWith('https://gitlab.com/api/v4/merge_requests')) {
        return jsonResponse([]);
      }

      throw new Error(`Unhandled fetch ${url}`);
    });

    vi.stubGlobal('fetch', fetchMock);

    const contributions = await fetchOpenSourceContributions();
    const contributionKeys = contributions.map(
      (entry) => `${entry.platform}:${entry.repository}:${entry.reference}`,
    );

    expect(contributions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          repository: 'zulip/zulip',
          reference: '#39370',
          status: 'Open',
          statusClass: 'open',
        }),
        expect.objectContaining({
          repository: 'example/project',
          reference: '#99',
          status: 'Open',
          statusClass: 'open',
        }),
      ]),
    );
    expect(contributionKeys).not.toContain('GitHub:zulip/zulip:#39371');
    expect(contributionKeys).not.toContain('GitHub:pallets/click:#3488');
  });
});
