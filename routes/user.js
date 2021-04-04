import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../models';
import { getAutoSuggestUsers } from '../utils';

const router = Router();

router.get('/', (req, res) => {
    const { loginSubstring, limit } = req.query;

    res.send(getAutoSuggestUsers(loginSubstring, limit));
});

router.route('/:id')
    .get((req, res) => {
        const user = users.find(item => item.id === req.params.id);
        if (!user) {
            return res.sendStatus(404);
        }
        res.json(user);
    })
    .put((req, res) => {
        const user = req.body;
        const index = users.findIndex(item => item.id === req.params.id);
        if (index < 0) {
            return res.sendStatus(404);
        }

        users[index] = { ...users[index], ...user };
        res.sendStatus(200);
    })
    .delete((req, res) => {
        const index = users.findIndex(item => item.id === req.params.id);
        if (index < 0) {
            return res.sendStatus(404);
        }

        users[index].isDeleted = true;
        res.sendStatus(200);
    });

router.post('/', (req, res) => {
    const user = req.body;
    const { login, password, age, isDeleted } = user;

    if (!login || !password || !age || typeof isDeleted === 'undefined') {
        return res.status(400).send('One or more required fields are missing');
    }
    user.id = uuidv4();
    users.push(user);
    res.sendStatus(200);
});

export default router;
