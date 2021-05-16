import { logger } from '../loggers';
import { BaseError } from '../utils';

function logError(err) {
  logger.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  const { method, args, errorMessage } = err;
  logError({ method, arguments: args, errorMessage });
  next(err);
}

// eslint-disable-next-line no-unused-vars
function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.statusCode ? { error: err.errorMessage } : 'Internal Server Error');
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

export {
  isOperationalError,
  logError,
  logErrorMiddleware,
  returnError
};
