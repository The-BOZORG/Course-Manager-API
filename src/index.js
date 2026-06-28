import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { notFound } from './middlewares/404.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './utils/logger.js';
import router from './routers/index.js';

const app = express();
const whitelist = JSON.parse(process.env.WHITELIST_ORIGINS || '[]');

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    }

    logger.warn(`CORS blocked: Origin "${origin}" is not allowed`);

    return callback(
      new Error(`CORS blocked: Origin "${origin}" is not allowed`),
      false,
    );
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(cors(corsOptions));

app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

export default app;
