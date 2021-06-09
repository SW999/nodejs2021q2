import 'regenerator-runtime/runtime';
import {
  createGroup,
  deleteGroup,
  editGroup,
  getAllGroups,
  addUserGroup,
  getGroupById
} from '../controllers/GroupController';
import { HTTP_STATUS_CODE } from '../constants';
import * as utils from '../utils';
import { Error404, BaseError } from '../utils/errors';

jest.mock('../models');
import { Group } from '../models';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();
const mockedGroupData = [{}];
let res = null;

describe('Group controller methods:', () => {
  beforeEach(() => {
    res = mockResponse();
  });
  afterEach(() => {
    res = null;
  });

  it('Should test #getAllGroups with OK status', async () => {
    Group.findAll.mockReturnValue(Promise.resolve(mockedGroupData));
    await getAllGroups(null, res, mockNext);
    expect(res.json).toBeCalledWith(mockedGroupData);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #getAllGroups with 404 status', async () => {
    Group.findAll.mockReturnValue(Promise.resolve(null));
    await getAllGroups({}, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #getGroupById with OK status', async () => {
    Group.findByPk.mockReturnValue(Promise.resolve(mockedGroupData));
    const req = { params: { id: 1 } };
    await getGroupById(req, res, mockNext);
    expect(res.json).toBeCalledWith(mockedGroupData);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #getGroupById with 404 status', async () => {
    Group.findByPk.mockReturnValue(Promise.resolve(null));
    const req = { params: { id: 1 } };
    await getGroupById(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #createGroup with CREATED status', async () => {
    Group.create.mockReturnValue(Promise.resolve(mockedGroupData));
    const req = { body: {} };
    await createGroup(req, res, mockNext);
    expect(res.json).toBeCalledWith(mockedGroupData);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.CREATED);
  });

  it('Should test #createGroup with 404 status', async () => {
    Group.create.mockReturnValue(Promise.resolve(null));
    const req = { body: {} };
    await createGroup(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new BaseError());
  });

  it('Should test #editGroup with OK status', async () => {
    Group.update.mockReturnValue(Promise.resolve(mockedGroupData));
    Group.findByPk.mockReturnValue(Promise.resolve(mockedGroupData));
    const req = { params: { name: 'test', permissions: '' }, body: { id: 1 } };
    await editGroup(req, res, mockNext);
    expect(res.json).toBeCalledWith({ group: mockedGroupData });
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #editGroup with 404 status', async () => {
    Group.update.mockReturnValue(Promise.resolve([null]));
    const req = { params: { id: 1 }, body: { id: 1 } };
    await editGroup(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #deleteGroup with DELETED status', async () => {
    Group.destroy.mockReturnValue(Promise.resolve(mockedGroupData));
    const req = { params: { id: 1 } };
    await deleteGroup(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.DELETED);
  });

  it('Should test #deleteGroup with 404 status', async () => {
    Group.destroy.mockReturnValue(Promise.resolve(null));
    const req = { params: { id: 1 } };
    await deleteGroup(req, res, mockNext);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #addUserGroup with OK status', async () => {
    jest.spyOn(utils, 'addUsersToGroup').mockImplementation(() => Promise.resolve('test'));
    const req = { body: { groupId: 1, userIds: 1 } };
    await addUserGroup(req, res, mockNext);
    expect(res.json).toBeCalledWith({ result: 'Users 1 added to group id1' });
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #addUserGroup with 404 status', async () => {
    jest.spyOn(utils, 'addUsersToGroup').mockImplementation(() => Promise.resolve(null));
    const req = { body: { groupId: 1, userIds: 1 } };
    await addUserGroup(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });
});
