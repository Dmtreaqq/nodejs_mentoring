import { User } from '../types/User';
import { users } from '../router/userRouter';

const filterUsersByLoginString = (usersArr: User[], str: string): User[] => {
    return usersArr.filter((user: User) => {
        const loginLower = user.login.toLowerCase();
        const loginSubStringLower = str.toLowerCase();

        return loginLower.includes(loginSubStringLower);
    });
};

const sortUsersByLoginString = (usersArr: User[]): User[] => {
    return [...usersArr].sort((user: User, nextUser: User) => {
        return user.login.localeCompare(nextUser.login);
    });
};

const limitUsersByParam = (usersArr: User[], limit: string): User[] => {
    return usersArr.filter((user: User, index) => {
        if (index < Number(limit)) {
            return true;
        }

        return false;
    });
};

export const getAutoSuggestUsers = (loginSubString: string, limit: string): User[] => {
    const initUsers = [...users];

    // FILTER BY LOGIN SUBSTRING
    const filteredUsers = filterUsersByLoginString(initUsers, loginSubString);

    // SORT (Aa-Zz) BY LOGIN
    const sortedUsers = sortUsersByLoginString(filteredUsers);

    // LIMIT BY PARAM
    const limitedUsers = limitUsersByParam(sortedUsers, limit);

    return limitedUsers;
};
