import { Router } from 'express';

import { createComment } from '../controllers/comment/createCommnet.js';
import { getComments } from '../controllers/comment/getCommnet.js';

import { globalLimiter } from '../utils/rateLimiter.js';
import { authenticateUser } from '../middlewares/authentication.js';

const commentRouter = Router();

commentRouter.get('/getComments', globalLimiter, authenticateUser, getComments);

commentRouter.post('/create', globalLimiter, authenticateUser, createComment);

export default commentRouter;
