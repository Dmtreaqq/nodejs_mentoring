import { User } from '../types/User';
import { users } from '../router/userRouter';

// export const getUsers = (usersArr: User[], limit: string, loginSubString: string) => {
//     let i = 0;
//     const resultUsers: User[] = [];
//     const loginSubStringLower = loginSubString.toLocaleLowerCase();
//     while (i < usersArr.length && users.length !== Number(limit)) {
//         const user: User = usersArr[i];
//         const loginLower = user.login.toLocaleLowerCase();
//
//         if (loginLower.includes(loginSubStringLower)) {
//             resultUsers.push(user);
//         }
//
//         i++;
//     }
//     return resultUsers.sort((user: User, nextUser: User) => user.login.localeCompare(nextUser.login));
// };

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
    const filteredUsers = filterUsersByLoginString(initUsers, loginSubString);
    const sortedUsers = sortUsersByLoginString(filteredUsers);
    const limitedUsers = limitUsersByParam(sortedUsers, limit);

    return limitedUsers;
};
