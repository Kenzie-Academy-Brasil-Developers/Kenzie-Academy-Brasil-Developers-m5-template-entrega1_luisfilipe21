import jwt from "jsonwebtoken";
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

    categoryExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const categoryId = Number(req.body.categoryId);

        if (categoryId) {
            const category = await prisma.category.findFirst({ where: { id: categoryId } });

            if (!category) {
                throw new AppError(404, "Category not found");
            }
        }

        next();
    }

    categoryIdValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;

        const validCategory = await prisma.category.findFirst({ where: { id: Number(id) } })

        if (!validCategory) {
            throw new AppError(404, "Category not found");
        }

        res.locals.category = validCategory;

        return next();
    }

    taskIdValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const task = req.params.id;

        const validTask = await prisma.task.findFirst({ where: { id: Number(task) }, include: { category: true } })

        if (!validTask) {
            throw new AppError(404, "Task not found");
        }

        res.locals.task = validTask;

        return next();
    }

    validEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const email = req.body.email;

        if (email) {
            const sameEmail = await prisma.user.findFirst({ where: { email } });

            if (sameEmail) {
                throw new AppError(409, "This email is already registered")
            }
        }
        return next();
    }

    validToken = (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization;

        if (!token) throw new AppError(401, "Token is required");

        const secret = process.env.JWT_SECRET! as string;

        jwt.verify(token, secret);
        res.locals.decode = jwt.decode(token);

        return next();
    }
}