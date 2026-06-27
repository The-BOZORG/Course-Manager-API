import { Router } from 'express';

import { register } from '../controllers/auth/register.js';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';

import { authLimiter } from '../utils/rateLimiter.js';
import { registerSchema, loginSchema } from '../utils/zodValidate.js';

import { validateRequest } from '../middlewares/validateRequest.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(registerSchema),
  authLimiter,
  register,
);

authRouter.post('/login', validateRequest(loginSchema), authLimiter, login);

authRouter.post('logout', logout);

export default authRouter;
