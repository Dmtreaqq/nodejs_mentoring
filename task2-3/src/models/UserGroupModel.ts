import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../loaders/db';

export interface IUserGroupModel extends Model<InferAttributes<IUserGroupModel>, InferCreationAttributes<IUserGroupModel>> {
  user_id: string;
  group_id: string;
}

export const UserGroupModel = sequelize.define<IUserGroupModel>('user_group', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    group_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});
