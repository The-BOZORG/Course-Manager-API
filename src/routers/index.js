import { Router } from 'express';

import authRouter from './auth.js';
import userRouter from './user.js';
import courseRouter from './course.js';

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

export default router;
