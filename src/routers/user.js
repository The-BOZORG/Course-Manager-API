import { Router } from 'express';

import { getAllUsers } from '../controllers/user/getAllUsers.js';
import { getUser } from '../controllers/user/getUser.js';
import { updateUser } from '../controllers/user/updateUser.js';
import { currentUser } from '../controllers/user/currentUser.js';
import { deleteUser } from '../controllers/user/deleteUser.js';
import { requestInstructor } from '../controllers/user/requestInstructor .js';

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
  '/me',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin', 'user'),
  currentUser,
);

userRouter.get(
  '/:id',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin'),
  getUser,
);

userRouter.patch(
  '/:id',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin', 'user'),
  updateUser,
);

userRouter.delete(
  '/:id',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin', 'user'),
  deleteUser,
);

userRouter.post(
  '/request-instructor',
  globalLimiter,
  authenticateUser,
  authorizePermissions('admin', 'user'),
  requestInstructor,
);

export default userRouter;
