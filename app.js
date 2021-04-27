import express from 'express';
import open from 'open';
import dotenv from 'dotenv';
import routes from './routes';
import multer from 'multer';
const upload = multer();
dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.DB_HOST;

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.use('/', routes.main);
app.use('/users', routes.user);
app.use('/groups', routes.group);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    open(`http://${host}:${port}`);
});
