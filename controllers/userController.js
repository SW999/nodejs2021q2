import { Users } from '../models';
import { getAutoSuggestUsers } from '../utils';

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({
            where: { id }
        });
        // const user = await models.Users.findAll();
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Users.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await Users.findOne({ where: { id } });
            return res.status(200).json({ user: updatedUser });
        }
        return res.sendStatus(404);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [deleted] = await Users.update({ isDeleted: true }, {
            where: { id }
        });
        if (deleted) {
            const deletedUser = await Users.findOne({ where: { id } });
            return res.status(200).json({ user: deletedUser });
        }
        return res.sendStatus(404);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const getLimitedUsersByLoginSubstring = async (req, res) => {
    const { loginSubstring, limit } = req.query;
    const { error, users } = await getAutoSuggestUsers(loginSubstring, limit);
    if (error) {
        return res.status(500).send(error);
    }
    return res.status(200).json(users);
};
