import { Router } from 'express';

import { createCourse } from '../controllers/course/createCourse.js';
import { getCourse } from '../controllers/course/getCourse.js';
import { getCourseById } from '../controllers/course/getCourseById.js';
import { updateCourse } from '../controllers/course/updateCourse.js';

import { globalLimiter } from '../utils/rateLimiter.js';
import { authorizePermissions } from '../middlewares/authorizePermissions.js';
import { authenticateUser } from '../middlewares/authentication.js';

const courseRouter = Router();

courseRouter.get(
  '/get-course',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  getCourse,
);

courseRouter.patch(
  '/update',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  updateCourse,
);

courseRouter.post(
  '/create',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  createCourse,
);

courseRouter.get(
  '/:id',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  getCourseById,
);

export default courseRouter;
