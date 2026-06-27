import { CustomError } from '../errors/customError.js';

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'unauthorized to access this route',
        403,
      );
    }
    next();
  };
};
