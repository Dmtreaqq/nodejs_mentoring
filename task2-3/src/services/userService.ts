import UserDataMapperService from './userDataMapperService';
import UserRepository from '../repositories/userRepository';
import { User } from '../types/User';
import { UserModel } from '../models/index';
import logger from '../middleware/logger';

const userRepository = new UserRepository(UserModel, UserDataMapperService);
class UserService {
    async getUserById(id: string): Promise<User | undefined> {
        try {
            const user = await userRepository.findUserById(id);
            if (!user) {
                throw new Error('There is no such user');
            }

            return user;
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async getUsersByLogin(login: string, limit: string): Promise<User[] | undefined> {
        try {
            return await userRepository.findAllUsersByLogin(login, limit);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.message);
            }
        }
    }

    async postUser(user: User) {
        try {
            await userRepository.createUser(user);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.message);
            }
        }
    }

    async editUser(id: string, userFromBody: User) {
        try {
            await userRepository.updateUser(id, userFromBody);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.message);
            }
        }
    }

    async deleteUser(id: string) {
        try {
            const user: User = await userRepository.findUserById(id);
            await userRepository.updateUser(id, { ...user, isDeleted: true });
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.message);
            }
        }
    }
}

export default new UserService();
