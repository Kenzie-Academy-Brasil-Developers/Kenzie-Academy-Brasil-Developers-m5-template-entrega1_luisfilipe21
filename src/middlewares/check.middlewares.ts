import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { AppError } from "../errors/AppError";
import { prisma } from "../database/prisma";

export class CheckMiddleware {

    validateBody = (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction): void => {
            req.body = schema.parse(req.body);
            return next();
        }


    categoryIdValid = (req: Request, res: Response, next: NextFunction): void => {
        const { categoryId } = req.params;
        
        if(!categoryId){
            throw new Error("Invalid category")
        }
        
        const teste = prisma.category.findFirst({where: {id: +categoryId}})
        
        if (!teste) {
            throw new AppError("Category not found", 404)
        }
        return next();
    }


}