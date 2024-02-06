import { prisma } from "../database/prisma";
import { CreateTask, TaskObject, UpdateTask } from "../interfaces/tasks.interface";

export class TasksService {
    create = async (payload: CreateTask): Promise<TaskObject> => {

        return await prisma.task.create({ data: payload })
    }

    read = async (index: number): Promise<TaskObject | null> => {
        return await prisma.task.findFirst({ where: { id: index } })
    }

    readMany = async (): Promise<TaskObject[]> => {
        return await prisma.task.findMany();
    }

    update = async (index: number, payload: UpdateTask): Promise<TaskObject> => {
        return await prisma.task.update({data: payload, where:{id: index}})
    }

    delete = async (index: number): Promise<void> => {
        prisma.task.delete({where: { id: index}})
    }
}