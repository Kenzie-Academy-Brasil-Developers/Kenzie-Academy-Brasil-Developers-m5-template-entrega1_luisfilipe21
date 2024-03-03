import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { CreateTask, ReturnTask, TaskObject, UpdateTask } from "../interfaces/tasks.interface";
import { returnTaskSchema } from "../schemas/tasks.schema";

export class TasksService {

    create = async (taskData: CreateTask, userId: number): Promise<TaskObject> => {
        if (!userId) throw new AppError(403, "This user is not the task owner")

        const newTask = await prisma.task.create({
            data: { ...taskData, userId }
        })
        return returnTaskSchema.parse(newTask);
    }

    readMany = async (userId: number, search?: any): Promise<ReturnTask[]> => {
        if (!search) {
            return await prisma.task.findMany({
                where: { userId },
                include: { category: true }
            })
        }

        return await prisma.task.findMany({
            where: { category: { name: { contains: search, mode: "insensitive" } } },
            include: { category: true }
        });
    }

    retreive = async (id: number) => {
        return await prisma.task.findFirst({ where: { id }, include: { category: true } },);
    }

    update = async (index: number, taskData: UpdateTask, userId?: number): Promise<TaskObject> => {
        if(!userId) throw new AppError(403, "This user is not the task owner");

        const taskId = await prisma.task.findFirst({ where: {id: index}});
        if(taskId?.userId !== userId) throw new AppError(403, "This user is not the task owner")

        return await prisma.task.update({ where: { id: index }, data: { ...taskData, userId} });
    }

    delete = async (index: number, userId: number): Promise<void> => {  
        if(!userId) throw new AppError(403, "This user is not the task owner");

        const taskId = await prisma.task.findFirst({ where: {id: index}});
        
        if(taskId?.userId !== userId) throw new AppError(403, "This user is not the task owner")


        await prisma.task.delete({ where: { id: index, userId} })
    }
}