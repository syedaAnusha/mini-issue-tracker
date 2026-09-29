import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/app.js';

describe('health endpoint', () => {
  it('returns application health without starting a server', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
