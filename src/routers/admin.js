import { Router } from 'express';
import AdminJSExpress from '@adminjs/express';
import admin from '../config/admin.js';

import { pendingComment } from '../controllers/admin/pendingComment.js';
import { userStatus } from '../controllers/admin/userStatus.js';
import { rejectComment } from '../controllers/admin/rejectComment.js';
import { approveComment } from '../controllers/admin/approveComment.js';
import { changeRole } from '../controllers/admin/changeRole.js';
import { approveInstructorRequest } from '../controllers/admin/approveInstructorRequest .js';
import { getInstructorRequests } from '../controllers/admin/getInstructorRequests .js';

import { authorizePermissions } from '../middlewares/authorizePermissions.js';

const adminRouter = Router();

//adminRouter.use(authenticateUser, authorizePermissions('admin'));
adminRouter.use(AdminJSExpress.buildRouter(admin));

adminRouter.get(
  '/instructor-requests',
  authorizePermissions('admin'),
  getInstructorRequests,
);

adminRouter.get(
  '/comment/pending',
  authorizePermissions('admin'),
  pendingComment,
);

adminRouter.patch('/user/role/:id', authorizePermissions('admin'), userStatus);

adminRouter.patch('/user/role/:id', authorizePermissions('admin'), changeRole);

adminRouter.patch(
  '/comment/approve/:id',
  authorizePermissions('admin'),
  approveComment,
);

adminRouter.patch(
  '/comment/reject/:id',
  authorizePermissions('admin'),
  rejectComment,
);

adminRouter.patch(
  '/instructor-requests/approve/:id',
  authorizePermissions('admin'),
  approveInstructorRequest,
);

export default adminRouter;
