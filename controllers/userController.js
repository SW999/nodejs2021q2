import { User } from '../models';
import { getAutoSuggestUsers, NotFound, BaseError } from '../utils';
import { HTTP_STATUS_CODE } from '../constants';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) {
      NotFound('There are no saved users', req.method);
    }

    return res.status(HTTP_STATUS_CODE.OK).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      NotFound(`User with id: ${id} not found.`, req.method, { id });
    }
    return res.status(HTTP_STATUS_CODE.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      throw new BaseError('Internal Server Error', false, 'Internal Server Error');
    }
    return res.status(HTTP_STATUS_CODE.CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id }
    });

    if (!updated) {
      NotFound(`User with id: ${id} not found.`, req.method, { ...req.body });
    }

    const updatedUser = await User.findByPk(id);
    return res.status(HTTP_STATUS_CODE.OK).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [deleted] = await User.update({ isDeleted: true }, {
      where: { id }
    });

    if (!deleted) {
      NotFound(`User with id: ${id} not found.`, req.method, { id });
    }

    const deletedUser = await User.findByPk(id);
    return res.status(HTTP_STATUS_CODE.OK).json({ user: deletedUser });
  } catch (error) {
    next(error);
  }
};

export const getLimitedUsersByLoginSubstring = async (req, res, next) => {
  const { loginSubstring, limit } = req.body;
  try {
    const users = await getAutoSuggestUsers(loginSubstring, limit);
    if (users?.length < 1) {
      NotFound('There are no such users', req.method, { loginSubstring, limit });
    }

    return res.status(HTTP_STATUS_CODE.OK).json(users);
  } catch (error) {
    next(error);
  }
};
