import { Op, ModelStatic } from 'sequelize';
import { IUserModel } from '../models/UserModel';
import EntityDataMapperService from '../services/entityDataMapperService';
import { User } from '../types/User';

export default class UserRepository {
    private model: ModelStatic<IUserModel>;
    private mapper: EntityDataMapperService;

    constructor(userModel: ModelStatic<IUserModel>, userMapper: EntityDataMapperService) {
        this.model = userModel;
        this.mapper = userMapper;
    }

    async findAllUsersByLogin(filter: string, limit: string): Promise<User[]> {
        const users = await this.model.findAll({
            where: {
                login: {
                    [Op.substring]: filter
                }
            },
            order: ['login'],
            limit: Number(limit)
        });

        return users.map(this.mapper.toService);
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.model.findByPk(id);
        return this.mapper.toService(user);
    }

    async createUser(user: User): Promise<void> {
        await this.model.create(this.mapper.toDataBase(user));
    }

    async updateUser(id: string, userColumnsToUpdate: User): Promise<void> {
        const user = await this.model.findByPk(id);
        await user?.update(this.mapper.toDataBase(userColumnsToUpdate));
    }
}
