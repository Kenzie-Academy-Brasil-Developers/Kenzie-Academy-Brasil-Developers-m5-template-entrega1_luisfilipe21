import { categoryObject, createCategory } from "../interfaces/category.interface";
import { prisma } from "../database/prisma";
import { categorySchema } from "../schemas/category.schema";

export class CategoryServices {
    create = async (categoryData: createCategory): Promise<categoryObject> => {
        const newCategory = await prisma.category.create({ data: categoryData })
        return categorySchema.parse(newCategory);
    }

    delete = async (categoryId: number): Promise<void> => {
        await prisma.category.delete({ where: { id: categoryId } })
    }
}