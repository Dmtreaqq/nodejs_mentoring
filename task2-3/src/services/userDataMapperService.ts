import { IUserModel } from '../models/UserModel';
import { User } from '../types/User';
import EntityDataMapperService from './entityDataMapperService';

class UserDataMapperService extends EntityDataMapperService {
    toService(dbUser: IUserModel): User | null {
        if (dbUser === null) {
            return null;
        }

        return {
            id: dbUser.id,
            age: dbUser.age,
            login: dbUser.login,
            password: dbUser.password,
            isDeleted: dbUser.is_deleted
        };
    }

    toDataBase(serviceUser: User) {
        return {
            id: serviceUser.id,
            age: serviceUser.age,
            login: serviceUser.login,
            password: serviceUser.password,
            is_deleted: serviceUser.isDeleted
        };
    }
}

export default new UserDataMapperService();
