import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CheckMiddleware } from "../middlewares/check.middlewares";

export const userRouter = Router();
const controller = new UserController();
const middleware = new CheckMiddleware();

userRouter.post("/users", middleware.validEmail, controller.createUser);
userRouter.post("/users/login", controller.login);
userRouter.get("/users/profile", controller.home);