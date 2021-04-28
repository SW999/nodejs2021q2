import { Group } from '../models';

export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        if (groups) {
            return res.status(200).json(groups);
        }
        return res.status(404).send('There are no saved groups');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findOne({
            where: { id }
        });
        if (group) {
            return res.status(200).json(group);
        }
        return res.status(404).json({ error: 'Group with the specified ID does not exists' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const createGroup = async (req, res) => {
    const { name, permissions } = req.body;
    const groupObj = { name, permissions: (Array.isArray(permissions) ? permissions : [permissions]) };

    try {
        const group = await Group.create(groupObj);
        return res.status(201).json(group);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const editGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Group.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedGroup = await Group.findOne({ where: { id } });
            return res.status(200).json({ group: updatedGroup });
        }
        return res.sendStatus(404);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Group.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(204).send('Group deleted');
        }
        return res.status(404).send('Group not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
