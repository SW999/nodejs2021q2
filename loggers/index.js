import winston from 'winston';
import morgan from 'morgan';
import json from 'morgan-json';
import { requestArgsToString } from '../utils';

const options = {
  console: {
    level: 'info',
    exitOnError: false,
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

morgan.token('param', req => requestArgsToString(req));
const format = json({
  method: ':method',
  param: ':param'
});

export const apiLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        param
      } = JSON.parse(message);

      logger.info({
        method,
        param
      });
    }
  }
});
