import { sequelize } from '../loaders/db';
import { UserGroupModel } from '../models/index';

export const addUsersToGroup = async (groupId: string, usersId: string[]) => {
    const t = await sequelize.transaction();

    const promises = usersId.map(async (userId) => {
        await UserGroupModel.create({
            group_id: groupId,
            user_id: userId
        }, { transaction: t });
    });

    Promise.all(promises)
        .then(async () => {
            await t.commit();
        })
        .catch(async (error) => {
            console.log(error);
            await t.rollback();
        });
};
