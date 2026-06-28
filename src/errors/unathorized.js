import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN; //401
  }
}
