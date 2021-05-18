import { Group } from '../models';
import { addUsersToGroup, NotFound } from '../utils';
import { HTTP_STATUS_CODE } from '../constants';

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll();

    if (!groups) {
      throw new NotFound('There are no saved groups', req.method);
    }

    return res.status(HTTP_STATUS_CODE.OK).json(groups);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const getGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findByPk(id);

    if (!group) {
      throw new NotFound(`Group with id: ${id} not found`, req.method, { id });
    }

    return res.status(HTTP_STATUS_CODE.OK).json(group);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const createGroup = async (req, res, next) => {
  const { name, permissions } = req.body;
  const groupObj = { name, permissions: (Array.isArray(permissions) ? permissions : [permissions]) };

  try {
    const group = await Group.create(groupObj);
    return res.status(HTTP_STATUS_CODE.CREATED).json(group);
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const editGroup = async (req, res, next) => {
  const { name, permissions } = req.body;
  const groupObj = { name, permissions: (Array.isArray(permissions) ? permissions : [permissions]) };
  try {
    const { id } = req.params;
    const [updated] = await Group.update(groupObj, {
      where: { id }
    });

    if (!updated) {
      throw new NotFound(`Group with id: ${id} not found`, req.method, { ...req.body });
    }

    const updatedGroup = await Group.findByPk(id);
    return res.status(HTTP_STATUS_CODE.OK).json({ group: updatedGroup });
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Group.destroy({
      where: { id }
    });

    if (!deleted) {
      throw new NotFound(`Group with id: ${id} not found`, req.method, { id });
    }

    return res.status(HTTP_STATUS_CODE.DELETED).send('Group deleted');
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};

export const addUserGroup = async (req, res, next) => {
  try {
    const { groupId, userIds } = req.body;
    const result = await addUsersToGroup(groupId, userIds);

    if (!result) {
      throw new NotFound('There are no such users or group', req.method, { groupId, userIds });
    }
    return res.status(HTTP_STATUS_CODE.OK).json({ result: `Users ${userIds} added to group id${groupId}` });
  } catch (error) {
    // eslint-disable-next-line callback-return
    next(error);
  }
};
