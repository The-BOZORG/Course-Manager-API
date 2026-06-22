import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Validation error
  if (err.name === 'SequelizeValidationError') {
    message = err.errors.map((e) => e.message).join(' | ');
    statusCode = 400;
  }

  // Unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'field';
    message = `${field} must be unique`;
    statusCode = 400;
  }

  // Foreign key error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    message = 'Invalid relation: foreign key constraint failed';
    statusCode = 400;
  }

  // Database error
  if (err.name === 'SequelizeDatabaseError') {
    message = 'Database error occurred';
    statusCode = 500;
  }

  // Invalid token
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  // Expired token
  if (err.name === 'TokenExpiredError') {
    message = 'Token expired, please login again';
    statusCode = 401;
  }

  // Missing token (custom case)
  if (err.name === 'NoTokenError') {
    message = 'Authorization token is missing';
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
