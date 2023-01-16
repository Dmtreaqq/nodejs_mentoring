import { Model, Op } from 'sequelize';
import { UserModel } from '../models/UserModel';

export const findAllUsersByLogin = async (filter: string, limit: string) => {
    return await UserModel.findAll({
        where: {
            login: {
                [Op.substring]: filter
            }
        },
        order: ['login'],
        limit: Number(limit)
    });
};

export const findUserById = async (id: string) => {
    return await UserModel.findByPk(id);
};

export const createUser = async (dbUser: any) => {
    await UserModel.create(dbUser);
};

export const updateUser = async (user: Model<any, any> | null, userColumnsToUpdate: any) => {
    await user?.update(userColumnsToUpdate);
};
