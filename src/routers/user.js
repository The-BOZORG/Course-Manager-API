import { Router } from 'express';

import { getAllUsers } from '../controllers/user/getAllUsers.js';
import { getUser } from '../controllers/user/getUser.js';
import { updateUser } from '../controllers/user/updateUser.js';
import { currentUser } from '../controllers/user/currentUser.js';

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

userRouter.get(
  '/:id',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin', 'user'),
  currentUser,
);

userRouter.patch(
  '/:id',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin', 'user'),
  updateUser,
);

export default userRouter;
