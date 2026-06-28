import { Router } from 'express';

import { getAllUsers } from '../controllers/user/getAllUsers.js';
import { getUser } from '../controllers/user/getUser.js';

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

userRouter.get(
  '/:id',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin'),
  getUser,
);

export default userRouter;
