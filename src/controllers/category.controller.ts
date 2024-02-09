import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryController {
    private categoryServices = new CategoryServices();

    create = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryServices.create(req.body)
        return res.status(201).json(newCategory)
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const categoryId = await Number(req.params.categoryId);
        await this.categoryServices.delete(categoryId)
        return res.status(204).json();
    }
}