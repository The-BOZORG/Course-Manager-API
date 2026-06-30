import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSSequelize from '@adminjs/sequelize';

import { sequelize } from './db.js';
import { User } from '../models/user.js';
import { Course } from '../models/course.js';

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const admin = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',

  resources: [User, Course],

  branding: {
    companyName: 'My App Admin',
  },
});

export default admin;
