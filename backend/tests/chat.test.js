import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../server.js';
import http from 'http';

let server;

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise(res => server.listen(0, res));
});

afterAll(async () => {
  await new Promise(res => server.close(res));
});

describe('POST /api/chat', () => {
  it('should return 400 if no prompt', async () => {
    const res = await request(server).post('/api/chat').send({});
    expect(res.status).toBe(400);
  });

  it('should return result with prompt', async () => {
    const res = await request(server).post('/api/chat').send({ prompt: 'hola' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('result');
  });
});
