export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Mini Issue Tracker API',
    version: '0.1.0',
    description: 'Backend foundation API.',
  },
  servers: [{ url: '/api' }],
  paths: {
    '/health': {
      get: {
        summary: 'Check application health',
        responses: {
          '200': {
            description: 'The application is running.',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/HealthResponse' } },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      HealthResponse: {
        type: 'object',
        required: ['status'],
        properties: { status: { type: 'string', example: 'ok' } },
      },
    },
  },
} as const;
