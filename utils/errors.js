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

class Error401 extends BaseError {
  constructor(
    errorMessage = 'Unauthorized request',
    statusCode = HTTP_STATUS_CODE.UNAUTHORIZED,
    description = 'Unauthorized',
    isOperational = true,
  ) {
    super(errorMessage, statusCode, isOperational, description);
  }
}

class Error403 extends BaseError {
  constructor(
    errorMessage = 'Forbidden',
    statusCode = HTTP_STATUS_CODE.FORBIDDEN,
    description = 'Forbidden',
    isOperational = true,
  ) {
    super(errorMessage, statusCode, isOperational, description);
  }
}

const NotFound = (errorMessage, method, args) => {
  throw new Error404(errorMessage, method, args);
};

const UnauthorizedError = (errorMessage) => {
  throw new Error401(errorMessage);
};

const ForbiddenError = (errorMessage) => {
  throw new Error403(errorMessage);
};

export { BaseError, NotFound, UnauthorizedError, ForbiddenError };
