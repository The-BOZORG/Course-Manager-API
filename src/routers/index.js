import { Router } from 'express';

import admin from '../config/admin.js';

import authRouter from './auth.js';
import userRouter from './user.js';
import courseRouter from './course.js';
import commentRouter from './comment.js';
import adminRouter from './admin.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/course', courseRouter);
router.use('/comment', commentRouter);
router.use(admin.options.rootPath, adminRouter);

export default router;
