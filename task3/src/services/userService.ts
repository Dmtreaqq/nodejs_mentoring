import UserDataMapperService from './userDataMapperService';
import { createUser, findAllUsersByLogin, findUserById, updateUser } from '../repositories/userRepository';
import { User } from '../types/User';

class UserService {
    async getUserById(id: string): Promise<User | undefined> {
        try {
            const user = await findUserById(id);
            return UserDataMapperService.toService(user);
        } catch (err) {
            // Will be improved in [logging and error handling] chapter
            console.error('Error occurred: ', err);
        }
    }

    async getUsersByLogin(login: string, limit: string): Promise<User[] | undefined> {
        try {
            const users = await findAllUsersByLogin(login, limit);
            return users.map(UserDataMapperService.toService);
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async postUser(user: User) {
        try {
            await createUser(UserDataMapperService.toDataBase(user));
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async editUser(id: string, userFromBody: User) {
        try {
            const dbUser = await findUserById(id);
            await updateUser(dbUser, UserDataMapperService.toDataBase(userFromBody));
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async deleteUser(id: string) {
        try {
            const dbUser = await findUserById(id);
            await updateUser(dbUser, { is_deleted: true });
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }
}

export default new UserService();
