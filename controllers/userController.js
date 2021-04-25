import { users } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { getAutoSuggestUsers } from '../utils';

export const getUserById = (req, res) => {
    const user = users.find(item => item.id === req.params.id);
    if (!user) {
        return res.sendStatus(404);
    }
    res.json(user);
};

export const createUser = (req, res) => {
    const user = req.body;

    user.id = uuidv4();
    users.push(user);
    res.sendStatus(200);
};

export const editUser = (req, res) => {
    const user = req.body;
    const index = users.findIndex(item => item.id === req.params.id);
    if (index < 0) {
        return res.sendStatus(404);
    }

    users[index] = { ...users[index], ...user };
    res.sendStatus(200);
};

export const deleteUser = (req, res) => {
    const index = users.findIndex(item => item.id === req.params.id);
    if (index < 0) {
        return res.sendStatus(404);
    }

    users[index].isDeleted = true;
    res.sendStatus(200);
};

export const getLimitedUsersByLoginSubstring = (req, res) => {
    const { loginSubstring, limit } = req.query;

    res.send(getAutoSuggestUsers(loginSubstring, limit));
};
