import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

export class HandleErrorsMiddleware {
    execute = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}