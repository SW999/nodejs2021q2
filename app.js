import express from 'express';
import open from 'open';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { isOperationalError, logError, returnError, logErrorMiddleware } from './middleware';
import { apiLogger } from './loggers';

const upload = multer();
dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.DB_HOST;

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
app.use(cookieParser());

app.use(apiLogger);

app.use('/', routes.main);
app.use('/login', routes.login);
app.use('/logout', routes.logout);
app.use('/users', routes.user);
app.use('/groups', routes.group);

app.use(logErrorMiddleware);
app.use(returnError);

process.on('unhandledRejection', error => {
  throw error;
});

process.on('uncaughtException', error => {
  logError(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  open(`http://${host}:${port}`);
});
