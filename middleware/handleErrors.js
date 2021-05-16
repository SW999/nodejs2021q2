import { logger } from '../loggers';
import { BaseError } from '../utils';

function logError(err) {
  logger.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
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
