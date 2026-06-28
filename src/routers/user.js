import { Router } from 'express';

import { getAllUsers } from '../controllers/user/getAllUsers.js';

import { globalLimiter } from '../utils/rateLimiter.js';

const userRouter = Router();

userRouter.get('/allUsers', globalLimiter, getAllUsers);

export default userRouter;
