import { HTTP_STATUS_CODE } from '../constants';

class BaseError extends Error {
  constructor(errorMessage, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.errorMessage = errorMessage;
    this.isOperational = isOperational;
    this.name = 'BaseError';
    Error.captureStackTrace(this);
  }
}

class Error404 extends BaseError {
  constructor(
    errorMessage,
    method,
    args = '-',
  ) {
    super(errorMessage);

    this.method = method;
    this.isOperational = true;
    this.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    this.description = 'Not found';
    this.args = args;
    this.name = 'Error404';
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

export { BaseError, NotFound, UnauthorizedError, ForbiddenError, Error404 };
