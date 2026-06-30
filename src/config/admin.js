import AdminJS from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';

import { User } from '../models/user.js';
import { Course } from '../models/course.js';

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const admin = new AdminJS({
  rootPath: '/admin',
  resources: [
    { resource: User, options: {} },
    { resource: Course, options: {} },
  ],
  branding: {
    companyName: 'My App Admin',
  },
});

export default admin;
