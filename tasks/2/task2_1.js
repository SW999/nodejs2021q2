import express from 'express';
import open from 'open';
import routes from '../../routes';

const app = express();
const port = 3000;

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes.index);
app.use('/user', routes.user);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    open(`http://127.0.0.1:${port}`);
});
