import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

export class AuthMiddleware{
    isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
        const auth = req.headers.authorization;
        if(!auth) throw new AppError(401, "Missing authorization");

        const token = auth?.replace("Bearer ", "");

        if(!token) throw new AppError(401, "Missing token");
        const secret = process.env.JWT_SECRET! as string;

        const decoded = verify(token, secret);
        
        res.locals = {
            ...res.locals,
            decoded
        }
        
        return next();
    }
}