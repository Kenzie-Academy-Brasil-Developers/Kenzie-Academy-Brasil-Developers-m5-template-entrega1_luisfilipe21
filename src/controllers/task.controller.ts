import { Request, Response } from "express";
import { TasksService } from "../services/tasks.services";

export class TaskController {

    private tasksService = new TasksService();

    create = async (req: Request, res: Response): Promise<Response> => {
        const userId = res.locals.decoded.id;
        const newTask = await this.tasksService.create(req.body, userId);

        return res.status(201).json(newTask);
    }

    readById = async (req: Request, res: Response): Promise<Response> => {
        const taskId = res.locals.task.id;
        const foundId = await this.tasksService.retreive(taskId);
        return res.status(200).json(foundId);
    }

    readAll = async (req: Request, res: Response): Promise<Response> => {
        const { category } = req.query;
        const userId = Number(res.locals.decoded.id);
        const readAll = await this.tasksService.readMany(userId, category);

        return res.status(200).json(readAll);
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const userId = res.locals.decoded.id;
        const taskId = Number(req.params.id);

        
        const updateTask = await this.tasksService.update(taskId, req.body, userId);

        return res.status(200).json(updateTask);
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const userId = res.locals.decoded.id;
        const taskId = Number(req.params.id);
        await this.tasksService.delete(taskId, userId);
        return res.status(204).json();
    }

}