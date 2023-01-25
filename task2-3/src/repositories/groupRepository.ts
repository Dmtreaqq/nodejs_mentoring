import { ModelStatic } from 'sequelize';
import { IGroupModel } from '../models/GroupModel';
import EntityDataMapperService from '../services/entityDataMapperService';
import { Group } from '../types/Group';

export default class GroupRepository {
    private model: ModelStatic<IGroupModel>;
    private mapper: EntityDataMapperService;

    constructor(groupModel: ModelStatic<IGroupModel>, groupMapper: EntityDataMapperService) {
        this.model = groupModel;
        this.mapper = groupMapper;
    }

    async findAllGroups(): Promise<Group[]> {
        const groups = await this.model.findAll();
        return groups.map(this.mapper.toService);
    }

    async findGroupById(id: string): Promise<Group> {
        const group = await this.model.findByPk(id);
        return this.mapper.toService(group);
    }

    async createGroup(group: Group): Promise<void> {
        await this.model.create(this.mapper.toDataBase(group));
    }

    async updateGroup(id: string, groupColumnsToUpdate: Group): Promise<void> {
        const group = await this.model.findByPk(id);
        await group?.update(this.mapper.toDataBase(groupColumnsToUpdate));
    }

    async destroyGroup(id: string): Promise<void> {
        const group = await this.model.findByPk(id);
        await group?.destroy();
    }
}
