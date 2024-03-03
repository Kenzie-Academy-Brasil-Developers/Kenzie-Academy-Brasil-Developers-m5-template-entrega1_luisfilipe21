import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryController {
    private categoryService = new CategoryServices();

    create = async (req: Request, res: Response): Promise<Response> => {
        const userId = Number(res.locals.decoded.id);
        const newCategory = await this.categoryService.create(req.body, userId);
        return res.status(201).json(newCategory);
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const userId = res.locals.decoded.id;
        const categoryId = Number(req.params.id);
        await this.categoryService.delete(categoryId, userId);

        return res.status(204).json();
    }

}