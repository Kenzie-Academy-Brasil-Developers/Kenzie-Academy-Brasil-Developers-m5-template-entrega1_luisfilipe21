import { Router } from "express";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { TaskController } from "../controllers/task.controller";

export const taskRouter = Router();
const middleware = new CheckMiddleware();
const controller = new TaskController();

taskRouter.post("/", middleware.validateBody, controller.create);
taskRouter.get("/", middleware.validateBody, controller.readAll);

taskRouter.use("/:taskId", middleware.validateBody)

taskRouter.get("/:taskId", controller.readOne);
taskRouter.post("/:taskId", controller.update);
taskRouter.delete("/:taskId", controller.delete);