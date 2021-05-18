import { User } from '../models';
import { getAutoSuggestUsers, NotFound } from '../utils';
import { HTTP_STATUS_CODE } from '../constants';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) {
      throw new NotFound('There are no saved users', req.method);
    }

    return res.status(HTTP_STATUS_CODE.OK).json(users);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFound(`User with id: ${id} not found.`, req.method, { id });
    }
    return res.status(HTTP_STATUS_CODE.OK).json(user);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(HTTP_STATUS_CODE.CREATED).json(user);
  } catch (error) {
    // eslint-disable-next-line callback-return
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
      throw new NotFound(`User with id: ${id} not found.`, req.method, { ...req.body });
    }

    const updatedUser = await User.findOne({ where: { id } });
    return res.status(HTTP_STATUS_CODE.OK).json({ user: updatedUser });
  } catch (error) {
    // eslint-disable-next-line callback-return
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
      throw new NotFound(`User with id: ${id} not found.`, req.method, { id });
    }

    const deletedUser = await User.findOne({ where: { id } });
    return res.status(HTTP_STATUS_CODE.OK).json({ user: deletedUser });
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const getLimitedUsersByLoginSubstring = async (req, res, next) => {
  const { loginSubstring, limit } = req.body;
  try {
    const users = await getAutoSuggestUsers(loginSubstring, limit);

    if (users?.length < 1) {
      throw new NotFound('There are no such users', req.method, { loginSubstring, limit });
    }

    return res.status(HTTP_STATUS_CODE.OK).json(users);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};
