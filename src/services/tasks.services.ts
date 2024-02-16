import { prisma } from "../database/prisma";
import { CreateTask, TaskObject, UpdateTask } from "../interfaces/tasks.interface";
import { taskSchema } from "../schemas/tasks.schema";

export class TasksService {

    create = async (payload: CreateTask): Promise<TaskObject> => {
        return await prisma.task.create({ data: payload });
    }

    retreive = async (id: number) => {
        return await prisma.task.findFirst({ where: { id } });

    }

    readMany = async (): Promise<TaskObject[]> => {
        return await prisma.task.findMany();
    }

    update = async (index: number, payload: UpdateTask): Promise<TaskObject> => {
        return await prisma.task.update({ where: { id: index }, data: { ...payload } });
    }

    delete = async (index: number): Promise<void> => {
        await prisma.task.delete({ where: { id: index } })
    }
}