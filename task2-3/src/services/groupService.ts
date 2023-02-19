import GroupRepository from '../repositories/groupRepository';
import { Group } from '../types/Group';
import { GroupModel } from '../models/index';
import EntityDataMapperService from './entityDataMapperService';
import logger from '../middleware/logger';

const entityMapperService = new EntityDataMapperService();
const groupRepository = new GroupRepository(GroupModel, entityMapperService);
class GroupService {
    async getGroupById(id: string): Promise<Group | undefined> {
        try {
            const group = await groupRepository.findGroupById(id);

            if (!group) {
                throw new Error('There is no such group');
            }

            return group;
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async getAllGroups(): Promise<Group[] | undefined> {
        try {
            return await groupRepository.findAllGroups();
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async postGroup(group: Group) {
        try {
            await groupRepository.createGroup(group);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async postUsersToGroup(groupId: string, usersId: string[]) {
        try {
            await groupRepository.applyUsersToGroup(groupId, usersId);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async editGroup(id: string, userFromBody: Group) {
        try {
            await groupRepository.updateGroup(id, userFromBody);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }

    async deleteGroup(id: string) {
        try {
            await groupRepository.destroyGroup(id);
        } catch (err) {
            if (err && err instanceof Error) {
                logger.error(err.stack);
            }
        }
    }
}

export default new GroupService();
