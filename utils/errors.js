import { HTTP_STATUS_CODE } from '../constants';

class BaseError extends Error {
  constructor(errorMessage, statusCode, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

class Error404 extends BaseError {
  constructor(
    errorMessage,
    method,
    args = '-',
    statusCode = HTTP_STATUS_CODE.NOT_FOUND,
    description = 'Not found',
    isOperational = true,
  ) {
    super(errorMessage, statusCode, isOperational, description);
    this.method = method;
    this.args = args;
  }
}

const NotFound = (errorMessage, method, args) => {
  throw new Error404(errorMessage, method, args);
};

export { BaseError, NotFound };
