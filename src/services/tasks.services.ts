import { prisma } from "../database/prisma";
import { CreateTask, ReturnTask, TaskObject, UpdateTask } from "../interfaces/tasks.interface";

export class TasksService {

    create = async (taskData: CreateTask): Promise<TaskObject> => {
        return await prisma.task.create({ data: taskData });
    }

    readMany = async (search?: any): Promise<ReturnTask[]> => {
        if (!search) {
            return await prisma.task.findMany({ include: { category: true } })
        }


        return await prisma.task.findMany({
            where: { category: { name: { contains: search, mode: "insensitive" } } },
            include: { category: true }
        });
    }

    retreive = async (id: number) => {
        return await prisma.task.findFirst({ where: { id }, include: { category: true }}, );
    }

    update = async (index: number, taskData: UpdateTask): Promise<TaskObject> => {
        return await prisma.task.update({ where: { id: index }, data: { ...taskData } });
    }

    delete = async (index: number): Promise<void> => {
        await prisma.task.delete({ where: { id: index } })
    }
}