import { Router } from "express";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { TaskController } from "../controllers/task.controller";

export const taskRouter = Router();
const middleware = new CheckMiddleware();
const controller = new TaskController();

taskRouter.post("/", middleware.validateBody, controller.create);
taskRouter.get("/", middleware.validateBody, controller.readAll);

taskRouter.use("/:id", middleware.validateBody)

taskRouter.get("/:id", controller.readOne);
taskRouter.post("/:id", controller.update);
taskRouter.delete("/:id", controller.delete);