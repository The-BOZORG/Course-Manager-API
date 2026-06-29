import { Router } from 'express';

import { createCourse } from '../controllers/course/createCourse.js';
import { getCourse } from '../controllers/course/getCourse.js';

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

courseRouter.get(
  '/get-course',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  getCourse,
);

export default courseRouter;
