import UserDataMapperService from './userDataMapperService';
import UserRepository from '../repositories/userRepository';
import { User } from '../types/User';
import { UserModel } from '../models/index';
import logger from '../middleware/logger';

const userRepository = new UserRepository(UserModel, UserDataMapperService);
class UserService {
    async getUserById(id: string): Promise<User | undefined> {
        try {
            return await userRepository.findUserById(id);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async getUsersByLogin(login: string, limit: string): Promise<User[] | undefined> {
        try {
            return await userRepository.findAllUsersByLogin(login, limit);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async postUser(user: User) {
        try {
            await userRepository.createUser(user);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async editUser(id: string, userFromBody: User) {
        try {
            await userRepository.updateUser(id, userFromBody);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async deleteUser(id: string) {
        try {
            const user: User = await userRepository.findUserById(id);
            await userRepository.updateUser(id, { ...user, isDeleted: true });
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }
}

export default new UserService();
