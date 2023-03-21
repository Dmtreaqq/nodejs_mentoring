import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import groupService from '../services/groupService';
import { Group } from '../types/Group';
import { validateToken } from '../middleware/validateToken';

export const groupRouter = express.Router();

groupRouter.param('id', async (req: Request, res: Response, next, id) => {
    const group = await groupService.getGroupById(id);

    if (group) req.group = group;
    else {
        res.status(404);
        return res.json({ message: `Group with id ${id} was not found` });
    }
    next();
});

groupRouter.route('/')
    .get(validateToken, async (req: Request, res: Response) => {
        return res.json(await groupService.getAllGroups());
    })
    .post(validateToken, async (req: Request, res: Response) => {
        const group: Group = { ...req.body, id: uuid() };
        await groupService.postGroup(group);
        res.status(201);
        return res.json({ message: `Group with id ${group.id} successfully created` });
    });

groupRouter.route('/:id')
    .get(validateToken, async (req: Request, res: Response) => {
        const { id } = req.group;
        return res.json(await groupService.getGroupById(id));
    })
    .put(validateToken, async (req: Request, res: Response) => {
        const { id } = req.group;
        const group = req.body;
        await groupService.editGroup(id, group);
        return res.json({ message: `Group with id ${group.id} successfully edited` });
    })
    .delete(validateToken, async (req: Request, res: Response) => {
        const { id } = req.group;
        await groupService.deleteGroup(id);
        return res.json({ message: `Group with id ${id} successfully deleted` });
    });

groupRouter.route('/:id/add-users')
    .post(validateToken, async (req: Request, res: Response) => {
        const { users_id } = req.body;
        const { id: group_id } = req.group;
        await groupService.postUsersToGroup(group_id, users_id);
        return res.json({ message: `Group with id ${group_id} was assigned to users with id: ${users_id}` });
    });
