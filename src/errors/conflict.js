import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT; //409
  }
}
