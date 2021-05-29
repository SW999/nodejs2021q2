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

import { loginUser } from './loginController';

export default {
  addUserGroup,
  createGroup,
  deleteGroup,
  editGroup,
  getAllUsers,
  getAllGroups,
  getGroupById,

  loginUser,

  createUser,
  deleteUser,
  editUser,
  getLimitedUsersByLoginSubstring,
  getUserById,
  mainController
};
