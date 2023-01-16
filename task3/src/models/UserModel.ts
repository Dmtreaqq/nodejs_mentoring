import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize({
    database: config.dbName,
    username: config.dbUserName,
    password: config.dbPass,
    host: config.dbHost,
    dialect: 'postgres'
});

export interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
}

export const UserModel = sequelize.define<IUserModel>('user', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});
