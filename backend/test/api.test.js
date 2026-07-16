const assert = require('node:assert/strict');
const http = require('node:http');
const test = require('node:test');

const app = require('../src/server');

async function withServer(run) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

async function getJson(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();
  return { response, body };
}

test('health endpoint returns the standard success envelope', async () => {
  await withServer(async (baseUrl) => {
    const { response, body } = await getJson(baseUrl, '/health');

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.status, 'ok');
  });
});

test('listing, reviews, and host endpoints return seeded data', async () => {
  await withServer(async (baseUrl) => {
    const listing = await getJson(baseUrl, '/api/listing/villa-azure-1');
    const reviews = await getJson(baseUrl, '/api/reviews/villa-azure-1?limit=2');
    const host = await getJson(baseUrl, '/api/host/host-sophia-1');

    assert.equal(listing.response.status, 200);
    assert.equal(listing.body.success, true);
    assert.equal(listing.body.data.id, 'villa-azure-1');
    assert.ok(Array.isArray(listing.body.data.photos));

    assert.equal(reviews.response.status, 200);
    assert.equal(reviews.body.success, true);
    assert.equal(reviews.body.data.length, 2);
    assert.equal(reviews.body.meta.limit, 2);

    assert.equal(host.response.status, 200);
    assert.equal(host.body.success, true);
    assert.equal(host.body.data.id, 'host-sophia-1');
  });
});

test('unknown routes and missing resources return consistent error envelopes', async () => {
  await withServer(async (baseUrl) => {
    const route = await getJson(baseUrl, '/missing');
    const listing = await getJson(baseUrl, '/api/listing/not-real');

    assert.equal(route.response.status, 404);
    assert.equal(route.body.success, false);
    assert.match(route.body.error, /Route not found/);

    assert.equal(listing.response.status, 404);
    assert.equal(listing.body.success, false);
    assert.match(listing.body.error, /not found/);
  });
});
