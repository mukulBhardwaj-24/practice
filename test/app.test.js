const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

before(() => {
  server = app.listen(0); // port 0 = pick any free port
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('GET /api/info includes environment and version', async () => {
  const info = await fetch(`${baseUrl}/api/info`).then(r => r.json());
  assert.ok(info.environment);
  assert.ok(info.version);
});

test('POST /api/notes creates a note', async () => {
  const res = await fetch(`${baseUrl}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'hello' }),
  });
  assert.strictEqual(res.status, 201);
  assert.strictEqual((await res.json()).text, 'hello');
});

test('POST /api/notes rejects empty text', async () => {
  const res = await fetch(`${baseUrl}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '   ' }),
  });
  assert.strictEqual(res.status, 400);
});
