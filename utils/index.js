import { Group, sequelize, User } from '../models';
import { Op } from 'sequelize';

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
    try {
        const users = await User.findAll({
            raw : true,
            attributes: ['login'],
            where: {
                login: {
                    [Op.substring]: loginSubstring
                }
            },
            limit
        });
        return { users: users.map(user => user.login).sort() };
    } catch (error) {
        return { error: error.message };
    }
};

export const addUsersToGroup = async (groupId, userIds) => {
    try {
        return await sequelize.transaction(async (t) => {
            const users = await User.findAll({
                where: { id: userIds.split(',') }
            });
            const group = await Group.findByPk(groupId);
            await Promise.all(users.map(async user => await user.addGroup(group, { transaction: t })));
            if (group && users.length) {
                return { result: users };
            }
            return { error: true };
        });
    } catch (error) {
        return { error: error.message };
    }
};
