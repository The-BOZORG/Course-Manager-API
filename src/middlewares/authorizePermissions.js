import { UnauthorizedError } from '../errors/unathorized.js';

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('unauthorized to access this route', 403);
    }
    next();
  };
};
