import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Permission } from '../types/Permission';
import { sequelize } from '../loaders/db';

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

