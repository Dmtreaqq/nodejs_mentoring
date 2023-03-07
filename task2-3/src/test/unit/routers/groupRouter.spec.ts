import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import groupService from '../../../services/groupService';
import { createServer } from '../../createServer';
import { group, groups } from '../../mocks/groupsMock';
import { groupRouter } from '../../../routers/groupRouter';

jest.mock('../../../services/groupService', () => ({
    editGroup: jest.fn(),
    getGroupById: jest.fn(),
    postGroup: jest.fn(),
    deleteGroup: jest.fn(),
    getAllGroups: jest.fn(),
    postUsersToGroup: jest.fn()
}));

jest.mock('../../../middleware/validateToken', () => ({
    validateToken: (req: Request, res: Response, next: NextFunction) => {
        return next();
    }
}));

jest.mock('uuid', () => ({
    v4: () => '1'
}));

beforeEach(() => {
    jest.spyOn(groupService, 'editGroup').mockResolvedValue({} as any);
    jest.spyOn(groupService, 'deleteGroup').mockResolvedValue({} as any);
    jest.spyOn(groupService, 'getGroupById').mockResolvedValue(group as any);
    jest.spyOn(groupService, 'getAllGroups').mockResolvedValue(groups);
    jest.spyOn(groupService, 'postGroup').mockResolvedValue({} as any);
    jest.spyOn(groupService, 'postUsersToGroup').mockResolvedValue({} as any);
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('Group router tests', () => {
    const app = createServer((application: any) => {
        application.use('/groups', groupRouter);
    });

    it('should POST group', async () => {
        const generatedId = 1;
        const groupWithoutId = {
            isDeleted: false,
            age: 22,
            login: 'dmytro',
            password: '12345'
        };

        const response = await request(app)
            .post('/groups')
            .send(groupWithoutId);

        expect(groupService.postGroup).toHaveBeenCalledWith(expect.objectContaining(groupWithoutId));
        expect(groupService.postGroup).toBeCalledTimes(1);
        expect(response.statusCode).toBe(201);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `Group with id ${generatedId} successfully created` }));
    });

    it('should DELETE group by ID', async () => {
        const groupId = '1';

        const response = await request(app).delete(`/groups/${groupId}`);

        expect(groupService.deleteGroup).toHaveBeenCalledWith(groupId);
        expect(groupService.deleteGroup).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `Group with id ${groupId} successfully deleted` }));
    });

    it('should return 404 when group not found while DELETE group by ID', async () => {
        const groupId = '1';
        jest.spyOn(groupService, 'getGroupById').mockResolvedValue(undefined);

        const response = await request(app).delete(`/groups/${groupId}`);

        expect(groupService.deleteGroup).toBeCalledTimes(0);
        expect(response.statusCode).toBe(404);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `Group with id ${groupId} was not found` }));
    });

    it('should PUT group by ID', async () => {
        const groupId = '1';

        const response = await request(app)
            .put(`/groups/${groupId}`)
            .send(group);

        expect(groupService.editGroup).toHaveBeenCalledWith(group.id, group);
        expect(groupService.editGroup).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `Group with id ${group.id} successfully edited` }));
    });

    it('should return 404 when group not found while PUT group by ID', async () => {
        const groupId = '1';
        jest.spyOn(groupService, 'getGroupById').mockResolvedValue(undefined);

        const response = await request(app)
            .put(`/groups/${groupId}`)
            .send(group);

        expect(groupService.editGroup).toBeCalledTimes(0);
        expect(response.statusCode).toBe(404);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `Group with id ${groupId} was not found` }));
    });

    it('should GET group by ID', async () => {
        const groupId = '1';

        const response = await request(app).get(`/groups/${groupId}`);

        expect(groupService.getGroupById).toHaveBeenCalledWith(groupId);
        expect(groupService.getGroupById).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should return 404 when GET group by ID not found', async () => {
        const groupId = '1';
        jest.spyOn(groupService, 'getGroupById').mockResolvedValue(undefined);

        const response = await request(app).get(`/groups/${groupId}`);

        expect(groupService.getGroupById).toHaveBeenCalledWith(groupId);
        expect(groupService.getGroupById).toBeCalledTimes(1);
        expect(response.statusCode).toBe(404);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `Group with id ${groupId} was not found` }));
    });

    it('should GET groups', async () => {
        const response = await request(app).get('/groups');

        expect(groupService.getAllGroups).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });
});
