import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

export class AuthMiddleware{
    isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
        const auth = req.headers.authorization;
        if(!auth) throw new AppError(401, "Missing authorization");

        const token = auth.split(" ")[0];
        const secret = process.env.JWT_SECRET!;

        res.locals = {
            ...res.locals,
            decoded: verify(token, secret)
        }
        
        return next();
    }
}