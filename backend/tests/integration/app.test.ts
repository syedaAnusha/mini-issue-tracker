import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/app.js';

describe('application infrastructure', () => {
  it('returns a predictable error for unknown API routes', async () => {
    const response = await request(app).get('/api/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  it('serves OpenAPI documentation', async () => {
    const response = await request(app).get('/api/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
