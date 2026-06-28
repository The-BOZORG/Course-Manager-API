import { Router } from 'express';

import { getAllUsers } from '../controllers/user/getAllUsers.js';

import { globalLimiter } from '../utils/rateLimiter.js';
import { authorizePermissions } from '../middlewares/authorizePermissions.js';
import { authenticateUser } from '../middlewares/authentication.js';

const userRouter = Router();

userRouter.get(
  '/allUsers',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin'),
  getAllUsers,
);

export default userRouter;
