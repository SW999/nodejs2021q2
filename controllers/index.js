import {
  addUserGroup,
  createGroup,
  deleteGroup,
  editGroup,
  getAllGroups,
  getGroupById
} from './groupController';
import { mainController } from './mainController';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getLimitedUsersByLoginSubstring,
  getUserById
} from './userController';

export default {
  addUserGroup,
  createGroup,
  deleteGroup,
  editGroup,
  getAllUsers,
  getAllGroups,
  getGroupById,

  createUser,
  deleteUser,
  editUser,
  getLimitedUsersByLoginSubstring,
  getUserById,
  mainController
};
