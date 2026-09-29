import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/index.js';
import { errorHandler } from './middleware/errors.js';
import { notFoundHandler } from './middleware/not-found.js';
import { openApiDocument } from './openapi.js';
import { apiRouter } from './routes/index.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use('/api', apiRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(notFoundHandler);
app.use(errorHandler);
