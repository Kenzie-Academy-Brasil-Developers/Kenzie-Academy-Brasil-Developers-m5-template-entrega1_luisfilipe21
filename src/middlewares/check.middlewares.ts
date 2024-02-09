import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export class CheckMiddleware {
    validateBody = (schema: AnyZodObject) => {
        (req: Request, res: Response, next: NextFunction): void => {
            req.body = schema.parse(req.body);
            return next();
        }
    }

    
}