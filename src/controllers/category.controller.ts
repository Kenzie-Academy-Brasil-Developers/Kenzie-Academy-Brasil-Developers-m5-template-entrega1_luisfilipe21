import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryController {
    private categoryService = new CategoryServices();

    create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryService.create(req.body);
        return res.status(201).json(newCategory);
    }

    delete = async (req: Request, res:Response): Promise<Response> => {
        const categoryId = res.locals.category.id;
        await this.categoryService.delete(categoryId);

        return res.status(204).json();
    }
    
}