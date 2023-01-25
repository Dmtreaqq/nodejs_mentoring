import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import groupService from '../services/groupService';
import { Group } from '../types/Group';

export const groupRouter = express.Router();

groupRouter.param('id', async (req: Request, res: Response, next, id) => {
    const group = await groupService.getGroupById(id);

    if (group) req.group = group;
    else {
        return res.send(`Group with id ${id} was not found`);
    }
    next();
});

groupRouter.route('/')
    .get(async (req: Request, res: Response) => {
        return res.json(await groupService.getAllGroups());
    })
    .post(async (req: Request, res: Response) => {
        const group: Group = { ...req.body, id: uuid() };
        await groupService.postGroup(group);
        res.status(201);
        return res.send(`Group with id ${group.id} successfully created`);
    });

groupRouter.route('/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.group;
        return res.json(await groupService.getGroupById(id));
    })
    .put(async (req: Request, res: Response) => {
        const { id } = req.group;
        const group = req.body;
        await groupService.editGroup(id, group);
        return res.json(`Group with id ${group.id} successfully edited`);
    })
    .delete(async (req: Request, res: Response) => {
        const { id } = req.group;
        await groupService.deleteGroup(id);
        return res.json(`Group with id ${id} successfully deleted`);
    });
