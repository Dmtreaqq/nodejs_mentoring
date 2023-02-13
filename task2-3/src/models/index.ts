import { GroupModel } from './GroupModel';
import { UserModel } from './UserModel';
import { UserGroupModel } from './UserGroupModel';

GroupModel.belongsToMany(UserModel, { through: 'user_group', foreignKey: 'group_id' });
UserModel.belongsToMany(GroupModel, { through: 'user_group', foreignKey: 'user_id' });

export {
    GroupModel,
    UserModel,
    UserGroupModel
};
