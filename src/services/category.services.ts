import { prisma } from "../database/prisma"
import { CategoryObject, CreateCategory } from "../interfaces/category.interface"

export class CategoryServices {

    create = async ({task, ...payload} : CreateCategory): Promise<CategoryObject> => {

        if(!task){
            const newCategory = await prisma.category.create({data: payload })
            
            return  newCategory;
        }

        const {id} = await prisma.task.create({data: task})

        const newTask = await prisma.category.create({
            data: {...payload, id}
        })

        return newTask;
    }

    delete = async (categoryId : number): Promise<void> => {
        await prisma.category.delete({where: {id: categoryId}});
    }
}