import { fetchOpenSourceContributions } from '../lib/openSourceContributions.js';

const sendJson = (response, statusCode, body) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader(
    'Cache-Control',
    statusCode === 200
      ? 's-maxage=43200, stale-while-revalidate=43200'
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
    const prs = await fetchOpenSourceContributions();
    sendJson(response, 200, {
      prs,
      updatedAt: Date.now(),
    });
  } catch (error) {
    sendJson(response, 502, {
      error: 'Failed to load open source contributions',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
