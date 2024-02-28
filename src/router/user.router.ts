import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { createUserSchema } from "../schemas/user.schema";
import { sessionCreateSchema } from "../schemas/session.schema";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export const userRouter = Router();
const controller = new UserController();
const middleware = new CheckMiddleware();
const auth = new AuthMiddleware();


userRouter.post("/", middleware.validateBody(createUserSchema), middleware.validEmail, controller.createUser);
userRouter.post("/login", middleware.validateBody(sessionCreateSchema), controller.login);
userRouter.get("/profile", auth.isAuthenticated, controller.home);
 