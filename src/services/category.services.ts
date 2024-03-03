import { categoryObject, createCategory } from "../interfaces/category.interface";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

export class CategoryServices {
    create = async (categoryData: createCategory, userId?: number): Promise<categoryObject> => {
        if (!userId) throw new AppError(403, "This user is not the category owner")

        return await prisma.category.create({ data: { ...categoryData, userId: userId } })
    }

    delete = async (index: number, userId?: number): Promise<void> => {
        if (!userId) throw new AppError(403, "This user is not the category owner");

        const categoryFound = await prisma.category.findFirst({ where: { id: index } });

        if (categoryFound?.userId !== userId) {
            throw new AppError(403, "This user is not the category owner");
        }
        await prisma.category.delete({ where: { id: index, userId } });
    }
}