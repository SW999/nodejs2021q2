import 'regenerator-runtime/runtime';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getLimitedUsersByLoginSubstring,
  getUserById
} from '../controllers/userController';
import { HTTP_STATUS_CODE } from '../constants';
import * as utils from '../utils';
import { Error404, BaseError } from '../utils/errors';

jest.mock('../models');
import { User } from '../models';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();
const mockedUserData = [{}];
let res = null;

describe('User controller methods:', () => {
  beforeEach(() => {
    res = mockResponse();
  });
  afterEach(() => {
    res = null;
  });

  it('Should test #getAllUsers with OK status', async () => {
    User.findAll.mockReturnValue(Promise.resolve(mockedUserData));
    await getAllUsers(null, res, mockNext);
    expect(res.json).toBeCalledWith(mockedUserData);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #getAllUsers with 404 status', async () => {
    User.findAll.mockReturnValue(Promise.resolve(null));
    await getAllUsers({}, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #getUserById with OK status', async () => {
    User.findByPk.mockReturnValue(Promise.resolve(mockedUserData));
    const req = { params: { id: 1 } };
    await getUserById(req, res, mockNext);
    expect(res.json).toBeCalledWith(mockedUserData);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #getUserById with 404 status', async () => {
    User.findByPk.mockReturnValue(Promise.resolve(null));
    const req = { params: { id: 1 } };
    await getUserById(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #createUser with CREATED status', async () => {
    User.create.mockReturnValue(Promise.resolve(mockedUserData));
    const req = { body: {} };
    await createUser(req, res, mockNext);
    expect(res.json).toBeCalledWith(mockedUserData);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.CREATED);
  });

  it('Should test #createUser with 404 status', async () => {
    User.create.mockReturnValue(Promise.resolve(null));
    const req = { body: {} };
    await createUser(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new BaseError());
  });

  it('Should test #editUser with OK status', async () => {
    User.update.mockReturnValue(Promise.resolve(mockedUserData));
    User.findByPk.mockReturnValue(Promise.resolve(mockedUserData));
    const req = { params: { id: 1 }, body: { id: 1 } };
    await editUser(req, res, mockNext);
    expect(res.json).toBeCalledWith({ user: mockedUserData });
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #editUser with 404 status', async () => {
    User.update.mockReturnValue(Promise.resolve([null]));
    const req = { params: { id: 1 }, body: { id: 1 } };
    await editUser(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #deleteUser with OK status', async () => {
    User.update.mockReturnValue(Promise.resolve(mockedUserData));
    User.findByPk.mockReturnValue(Promise.resolve(mockedUserData));
    const req = { params: { id: 1 } };
    await deleteUser(req, res, mockNext);
    expect(res.json).toBeCalledWith({ user: mockedUserData });
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });

  it('Should test #deleteUser with 404 status', async () => {
    User.update.mockReturnValue(Promise.resolve([null]));
    const req = { params: { id: 1 } };
    await deleteUser(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });

  it('Should test #getLimitedUsersByLoginSubstring with OK status', async () => {
    jest.spyOn(utils, 'getAutoSuggestUsers').mockImplementation(() => Promise.resolve(['test']));
    const req = { body: { limit: 1, loginSubstring: 'test' } };
    await getLimitedUsersByLoginSubstring(req, res, mockNext);
    expect(res.json).toBeCalledWith(['test']);
    expect(res.status).toBeCalledWith(HTTP_STATUS_CODE.OK);
  });
  jest.mock('../utils', () => ({
    ...jest.requireActual('../utils'),
    getAutoSuggestUsers: jest.fn().mockReturnValue(Promise.resolve([]))
  }));

  it('Should test #getLimitedUsersByLoginSubstring with 404 status', async () => {
    jest.spyOn(utils, 'getAutoSuggestUsers').mockImplementation(() => Promise.resolve([]));
    const req = { body: { limit: 1, loginSubstring: 'test' } };
    await getLimitedUsersByLoginSubstring(req, res, mockNext);
    expect(res.json).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(new Error404());
  });
});
