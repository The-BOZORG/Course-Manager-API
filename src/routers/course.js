import { Router } from 'express';

import { createCourse } from '../controllers/course/createCourse.js';

import { globalLimiter } from '../utils/rateLimiter.js';
import { authorizePermissions } from '../middlewares/authorizePermissions.js';
import { authenticateUser } from '../middlewares/authentication.js';

const courseRouter = Router();

courseRouter.post(
  '/create',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  createCourse,
);

export default courseRouter;
