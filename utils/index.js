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

export const addUsersToGroup = async (groupId, userId) => {
    try {
        return await sequelize.transaction(async (t) => {
            const user = await User.findOne({
                where: { id: userId }
            });
            const group = await Group.findOne({
                where: { id: groupId }
            });

            await user.addGroup(group, { transaction: t });

            return { result: user };
        });
    } catch (error) {
        return { error: error.message };
    }
};
