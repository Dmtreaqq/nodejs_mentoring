import GroupRepository from '../repositories/groupRepository';
import { Group } from '../types/Group';
import { GroupModel } from '../models/index';
import EntityDataMapperService from './entityDataMapperService';

const entityMapperService = new EntityDataMapperService();
const groupRepository = new GroupRepository(GroupModel, entityMapperService);
class GroupService {
    async getGroupById(id: string): Promise<Group | undefined> {
        try {
            return await groupRepository.findGroupById(id);
        } catch (err) {
            // Will be improved in [logging and error handling] chapter
            console.error('Error occurred: ', err);
        }
    }

    async getAllGroups(): Promise<Group[] | undefined> {
        try {
            return await groupRepository.findAllGroups();
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async postGroup(group: Group) {
        try {
            await groupRepository.createGroup(group);
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async postUsersToGroup(groupId: string, usersId: string[]) {
        try {
            await groupRepository.applyUsersToGroup(groupId, usersId);
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async editGroup(id: string, userFromBody: Group) {
        try {
            await groupRepository.updateGroup(id, userFromBody);
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }

    async deleteGroup(id: string) {
        try {
            await groupRepository.destroyGroup(id);
        } catch (err) {
            console.error('Error occurred: ', err);
        }
    }
}

export default new GroupService();
