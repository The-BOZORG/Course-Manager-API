import { UnauthorizedError } from '../errors/unauthenticated.js';
import { validToken } from '../utils/jwt.js';

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer '))
    throw new UnauthorizedError('auth invalid', 401);

  const token = authHeader.split(' ')[1];

  try {
    const { userId, role } = validToken({ token });
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthorizedError('auth invalid', 401);
  }
};
