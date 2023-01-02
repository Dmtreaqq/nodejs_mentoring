import { User } from '../types/User';
import { users } from '../index';

export const getAutoSuggestUsers = (loginSubString: string, limit: string): User[] => {
    const initUsers = [...users];

    // FILTER BY LOGIN SUBSTRING
    const filteredUsers = initUsers.filter((user: User) => {
        const loginLower = user.login.toLowerCase();
        const loginSubStringLower = loginSubString.toLowerCase();

        if (loginLower.includes(loginSubStringLower)) {
            return true;
        }

        return false;
    });

    // SORT (Aa-Zz) BY LOGIN
    const sortedUsers = [...filteredUsers].sort((user: User, nextUser: User) => {
        return user.login.localeCompare(nextUser.login);
    });

    // LIMIT
    const limitedUsers = sortedUsers.filter((user: User, index) => {
        if (index < Number(limit)) {
            return true;
        }

        return false;
    });

    return limitedUsers;
};
