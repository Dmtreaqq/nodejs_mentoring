import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import userService from '../../../services/userService';
import { createServer } from '../../createServer';
import { userRouter } from '../../../routers/userRouter';
import { users } from '../../mocks/usersMock';
import { user } from '../../mocks/usersMock';

jest.mock('../../../services/userService', () => ({
    getUsersByLogin: jest.fn(),
    getUserById: jest.fn(),
    postUser: jest.fn(),
    deleteUser: jest.fn(),
    editUser: jest.fn()
}));

jest.mock('../../../middleware/validateToken', () => ({
    validateToken: (req: Request, res: Response, next: NextFunction) => {
        return next();
    }
}));

jest.mock('../../../middleware/validator', () => ({
    validator: {
        body: () => {
            return (req: Request, res: Response, next: NextFunction) => {
                return next();
            };
        }
    }
}));

beforeEach(() => {
    jest.spyOn(userService, 'getUsersByLogin').mockResolvedValue(users);
    jest.spyOn(userService, 'postUser').mockResolvedValue({} as any);
    jest.spyOn(userService, 'deleteUser').mockResolvedValue({} as any);
    jest.spyOn(userService, 'editUser').mockResolvedValue({} as any);
    jest.spyOn(userService, 'getUserById').mockResolvedValue(user);
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('User router tests', () => {
    const app = createServer((application: any) => {
        application.use('/users', userRouter);
    });

    it('should POST user', async () => {
        const userWithoutId = {
            isDeleted: false,
            age: 22,
            login: 'dmytro',
            password: '12345'
        };

        const response = await request(app)
            .post('/users')
            .send(userWithoutId);

        expect(userService.postUser).toHaveBeenCalledWith(expect.objectContaining(userWithoutId));
        expect(userService.postUser).toBeCalledTimes(1);
        expect(response.statusCode).toBe(201);
    });

    it('should DELETE user by ID', async () => {
        const userId = '1';

        const response = await request(app).delete(`/users/${userId}`);

        expect(userService.deleteUser).toHaveBeenCalledWith(userId);
        expect(userService.deleteUser).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should return 404 when user not found while DELETE user by ID', async () => {
        const userId = '1';

        const response = await request(app).delete(`/users/${userId}`);

        expect(userService.deleteUser).toHaveBeenCalledWith(userId);
        expect(userService.deleteUser).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should PUT user by ID', async () => {
        const userId = '1';

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(user);

        expect(userService.editUser).toHaveBeenCalledWith(user.id, user);
        expect(userService.editUser).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should return 404 when user not found while PUT user by ID', async () => {
        const userId = '1';
        jest.spyOn(userService, 'getUserById').mockResolvedValue(undefined);

        const response = await request(app).put(`/users/${userId}`);

        expect(userService.getUserById).toHaveBeenCalledWith(userId);
        expect(userService.getUserById).toBeCalledTimes(1);
        expect(response.statusCode).toBe(404);
    });

    it('should GET user by ID', async () => {
        const userId = '1';

        const response = await request(app).get(`/users/${userId}`);

        expect(userService.getUserById).toHaveBeenCalledWith(userId);
        expect(userService.getUserById).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should return 404 when GET user by ID not found', async () => {
        const userId = '1';
        jest.spyOn(userService, 'getUserById').mockResolvedValue(undefined);

        const response = await request(app).get(`/users/${userId}`);

        expect(userService.getUserById).toHaveBeenCalledWith(userId);
        expect(userService.getUserById).toBeCalledTimes(1);
        expect(response.statusCode).toBe(404);
        expect(response.text)
            .toEqual(JSON.stringify({ message: `User with id ${userId} was not found` }));
    });

    it('should GET users method with default query params', async () => {
        const default_limit = '3';
        const default_filter = '';

        const response = await request(app).get('/users');

        expect(userService.getUsersByLogin).toHaveBeenCalledWith(String(default_filter), default_limit);
        expect(userService.getUsersByLogin).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should GET users with LIMIT query param', async () => {
        const limit = '5';
        const default_filter = '';

        const response = await request(app)
            .get('/users')
            .query({
                limit
            });

        expect(userService.getUsersByLogin).toHaveBeenCalledWith(default_filter, limit);
        expect(userService.getUsersByLogin).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should GET users with FILTER query param', async () => {
        const default_limit = '3';
        const filter = 'a';

        const response = await request(app)
            .get('/users')
            .query({
                filter
            });

        expect(userService.getUsersByLogin).toHaveBeenCalledWith(filter, default_limit);
        expect(userService.getUsersByLogin).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });

    it('should GET users with LIMIT and FILTER query param', async () => {
        const limit = '5';
        const filter = 'a';

        const response = await request(app)
            .get('/users')
            .query({
                limit,
                filter
            });

        expect(userService.getUsersByLogin).toHaveBeenCalledWith(filter, limit);
        expect(userService.getUsersByLogin).toBeCalledTimes(1);
        expect(response.statusCode).toBe(200);
    });
});
