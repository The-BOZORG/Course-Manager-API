import { UnauthorizedError } from '../errors/unathorized.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer '))
    throw new UnauthorizedError('auth invalid', 401);

  const token = authHeader.split(' ')[1];

  try {
    const { userId, role } = verifyAccessToken(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthorizedError('auth invalid', 401);
  }
};
