import type { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (_request, response) => {
  response
    .status(404)
    .json({ error: { code: 'NOT_FOUND', message: 'The requested resource was not found' } });
};
