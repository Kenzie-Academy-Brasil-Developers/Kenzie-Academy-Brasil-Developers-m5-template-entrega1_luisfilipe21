import { categoryObject, createCategory } from "../interfaces/category.interface";
import { prisma } from "../database/prisma";
import { categorySchema } from "../schemas/category.schema";

export class CategoryServices {
    create = async ({ tasks, ...categoryData }: createCategory): Promise<categoryObject> => {
        if (!tasks) {
            const newCategory = await prisma.category.create({ data: categoryData });
            return categorySchema.parse(newCategory);
        }

        const {id} = await prisma.task.create({ data: tasks  });

        const newCategory = await prisma.category.create({
            data: { ...categoryData, id },
            include: {tasks: true}
        })
        return categorySchema.parse(newCategory);
    }

    delete = async (index: number): Promise<void> => {
        await prisma.category.delete({ where: {id: index}})
    }
}