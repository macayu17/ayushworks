const COUNTER_API_BASE_URL = 'https://api.counterapi.dev/v1/macayu17/portfolio';

const sendJson = (response, statusCode, body) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.status(statusCode).send(JSON.stringify(body));
};

const fetchCounterValue = async (path = '') => {
  const upstreamResponse = await fetch(`${COUNTER_API_BASE_URL}${path}`, {
    cache: 'no-store',
  });

  if (!upstreamResponse.ok) {
    throw new Error(`Upstream counter request failed with status ${upstreamResponse.status}`);
  }

  const data = await upstreamResponse.json();

  if (typeof data?.count !== 'number') {
    throw new Error('Upstream counter response did not include a numeric count');
  }

  return data.count;
};

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  const mode = request.query?.mode === 'increment' ? 'increment' : 'current';
  const upstreamPath = mode === 'increment' ? '/up' : '/';

  try {
    const views = await fetchCounterValue(upstreamPath);
    sendJson(response, 200, { views });
  } catch (error) {
    sendJson(response, 502, {
      error: 'Failed to load view count from upstream counter service',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
