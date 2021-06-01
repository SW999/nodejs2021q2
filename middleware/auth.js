import jwt from 'jsonwebtoken';
import { secret } from '../data-access';
import { UnauthorizedError, ForbiddenError } from '../utils';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return ForbiddenError();
      }

      req.user = user;
      next();
    });
  } else {
    return UnauthorizedError();
  }
};
