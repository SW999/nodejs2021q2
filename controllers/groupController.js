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

// export const createGroup = async (req, res) => {
//     try {
//         const group = await Group.create(req.body);
//         return res.status(201).json(group);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };
//
// export const editGroup = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [updated] = await Group.update(req.body, {
//             where: { id }
//         });
//         if (updated) {
//             const updatedGroup = await Group.findOne({ where: { id } });
//             return res.status(200).json({ group: updatedGroup });
//         }
//         return res.sendStatus(404);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };
//
// export const deleteGroup = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [deleted] = await Group.update({ isDeleted: true }, {
//             where: { id }
//         });
//         if (deleted) {
//             const deletedGroup = await Group.findOne({ where: { id } });
//             return res.status(200).json({ group: deletedGroup });
//         }
//         return res.sendStatus(404);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };
