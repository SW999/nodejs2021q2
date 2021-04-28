import {
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
    getLimitedUsersByLoginSubstring,
    getUserById
} from './userController';

export default {
    createGroup,
    deleteGroup,
    editGroup,
    getAllGroups,
    getGroupById,

    createUser,
    deleteUser,
    editUser,
    getLimitedUsersByLoginSubstring,
    getUserById,
    mainController
};
