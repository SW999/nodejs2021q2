import { User } from '../models';
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
