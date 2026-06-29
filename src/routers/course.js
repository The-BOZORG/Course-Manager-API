import { Router } from 'express';

import { createCourse } from '../controllers/course/createCourse.js';
import { getCourse } from '../controllers/course/getCourse.js';
import { getCourseById } from '../controllers/course/getCourseById.js';
import { updateCourse } from '../controllers/course/updateCourse.js';
import { deleteCourse } from '../controllers/course/deleteCourse.js';

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

courseRouter.patch(
  '/update/:id',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  updateCourse,
);

courseRouter.get(
  '/delete/:id',
  authenticateUser,
  globalLimiter,
  authorizePermissions('admin', 'instructor'),
  deleteCourse,
);

export default courseRouter;
