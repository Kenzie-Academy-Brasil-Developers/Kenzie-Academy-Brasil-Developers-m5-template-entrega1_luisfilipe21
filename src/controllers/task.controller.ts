import { Request, Response } from "express";
import { TasksService } from "../services/tasks.services";

export class TaskController {

    private tasksService = new TasksService();

    create = async (req: Request, res: Response): Promise<Response> => {
        const newTask = await this.tasksService.create(req.body);
        return res.status(201).json(newTask);
    }

    readById = async (req: Request, res: Response): Promise<Response> => {
        const taskId = res.locals.task.id;
        const foundId = await this.tasksService.retreive(taskId);
        return res.status(200).json(foundId);
    }

    readAll = async (req: Request, res: Response): Promise<Response> => {
        const {category} = req.query;
        const readAll = await this.tasksService.readMany(category);

        return res.status(200).json(readAll);
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const taskId = await Number(req.params.id);
        const updateTask = await this.tasksService.update(taskId, req.body);

        return res.status(200).json(updateTask);
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const taskId = await Number(req.params.id);
        await this.tasksService.delete(taskId);
        return res.status(204).json();
    }

}