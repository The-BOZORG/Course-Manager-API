import { Router } from 'express';
import AdminJSExpress from '@adminjs/express';
import admin from '../config/admin.js';
import { authenticateUser } from '../middlewares/authentication.js';
import { authorizePermissions } from '../middlewares/authorizePermissions.js';

const adminRouter = Router();

adminRouter.use(authenticateUser, authorizePermissions('admin'));
adminRouter.use(AdminJSExpress.buildRouter(admin));

export default adminRouter;
