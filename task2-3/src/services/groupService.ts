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
            return await groupRepository.findGroupById(id);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async getAllGroups(): Promise<Group[] | undefined> {
        try {
            return await groupRepository.findAllGroups();
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async postGroup(group: Group) {
        try {
            await groupRepository.createGroup(group);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async postUsersToGroup(groupId: string, usersId: string[]) {
        try {
            await groupRepository.applyUsersToGroup(groupId, usersId);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async editGroup(id: string, userFromBody: Group) {
        try {
            await groupRepository.updateGroup(id, userFromBody);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }

    async deleteGroup(id: string) {
        try {
            await groupRepository.destroyGroup(id);
        } catch (err) {
            logger.error('Error occurred: ', err);
        }
    }
}

export default new GroupService();
