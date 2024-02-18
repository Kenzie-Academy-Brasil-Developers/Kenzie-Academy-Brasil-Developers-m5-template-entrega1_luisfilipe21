import { number } from "zod";
import { prisma } from "../database/prisma";
import { CreateTask, TaskObject, UpdateTask } from "../interfaces/tasks.interface";

export class TasksService {

    create = async (taskData: CreateTask): Promise<TaskObject> => {
        return await prisma.task.create({ data: taskData });
    }

    retreive = async (id: number) => {
        return await prisma.task.findFirst({ where: { id } });

    }

    readMany = async () => {
        return await prisma.task.findMany();
    }

    update = async (index: number, taskData: UpdateTask): Promise<TaskObject> => {
        return await prisma.task.update({ where: { id: index }, data: { ...taskData } });
    }

    delete = async (index: number): Promise<void> => {
        await prisma.task.delete({ where: { id: index } })
    }
}