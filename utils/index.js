import jwt from 'jsonwebtoken';
import { Group, sequelize, User } from '../models';
import { Op } from 'sequelize';
import { BaseError, NotFound, UnauthorizedError, ForbiddenError } from './errors';
import { secret } from '../data-access';
import { USERS } from '../constants';

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
    return users.map(user => user.login).sort();
  } catch (error) {
    return error.message;
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
        return users;
      }
    });
  } catch (error) {
    return error.message;
  }
};

export const requestArgsToString =
        req => Object.entries({ ...req.body, ...req.params, ...req.query }).map(([k, v]) => `${k}: ${v}`).join(', ');

export const login = (username, password) => {
  const user = USERS.find(u => u.username === username && u.password === password);
  return user ? jwt.sign({ username: user.username, role: user.role }, secret) : null;
};

export {
  BaseError,
  ForbiddenError,
  NotFound,
  UnauthorizedError
};
