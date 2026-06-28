import { Router } from 'express';

import { register } from '../controllers/auth/register.js';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { refresh } from '../controllers/auth/refresh.js';

import { authLimiter } from '../utils/rateLimiter.js';
import { registerSchema, loginSchema } from '../utils/zodValidate.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { authenticateUser } from '../middlewares/authentication.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(registerSchema),
  authLimiter,
  register,
);

authRouter.post('/login', validateRequest(loginSchema), authLimiter, login);

authRouter.post('/refresh', refresh);

authRouter.post('/logout', logout);

export default authRouter;
