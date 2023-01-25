import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import config from '../config';
import { Permission } from '../types/Permission';

export const sequelize = new Sequelize({
    database: config.dbName,
    username: config.dbUserName,
    password: config.dbPass,
    host: config.dbHost,
    dialect: 'postgres'
});

export interface IGroupModel extends Model<InferAttributes<IGroupModel>, InferCreationAttributes<IGroupModel>> {
  id: string;
  name: string;
  permissions: Permission[];
}

export const GroupModel = sequelize.define<IGroupModel>('group', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    timestamps: false
});
