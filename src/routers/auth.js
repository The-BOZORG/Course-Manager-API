import { Router } from 'express';

import { register } from '../controllers/auth/register.js';

import { registerLimiter, loginLimiter } from '../utils/rateLimiter.js';
import { registerSchema, loginSchema } from '../utils/zodValidate.js';

import { validateRequest } from '../middlewares/validateRequest.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(registerSchema),
  registerLimiter,
  register,
);

export default authRouter;
