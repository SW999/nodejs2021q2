import { users } from '../_models';

export const getAutoSuggestUsers = (loginSubstring, limit) => {
    const selectedUsers = [];
    for (const user of users) {
        if (selectedUsers.length === Number(limit)) {
            break;
        }
        if (user.login.includes(loginSubstring)) {
            selectedUsers.push(user.login);
        }
    }

    return selectedUsers.sort();
};
