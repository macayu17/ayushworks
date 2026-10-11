import { fetchOpenSourceContributions } from '../lib/openSourceContributions.js';

const CACHE_TTL = 6 * 60 * 60 * 1000;
let cachedContributions = null;
let pendingContributions = null;

const loadContributions = async () => {
  if (cachedContributions && Date.now() - cachedContributions.updatedAt < CACHE_TTL) return cachedContributions;
  if (!pendingContributions) {
    pendingContributions = fetchOpenSourceContributions()
      .then((prs) => {
        cachedContributions = { prs, updatedAt: Date.now() };
        return cachedContributions;
      })
      .finally(() => { pendingContributions = null; });
  }
  return pendingContributions;
};

const sendJson = (response, statusCode, body) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader(
    'Cache-Control',
    statusCode === 200
      ? 's-maxage=21600, stale-while-revalidate=21600'
      : 'no-store, max-age=0',
  );
  response.status(statusCode).send(JSON.stringify(body));
};

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    sendJson(response, 200, await loadContributions());
  } catch (error) {
    sendJson(response, 502, {
      error: 'Failed to load open source contributions',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
