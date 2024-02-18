import { Router } from "express";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { TaskController } from "../controllers/task.controller";
import { createTaskSchema } from "../schemas/tasks.schema";

export const taskRouter = Router();
const middleware = new CheckMiddleware();
const controller = new TaskController();

taskRouter.post("/", middleware.validateBody(createTaskSchema), controller.create);
taskRouter.get("/", controller.readAll);

taskRouter.get("/:id", controller.readById);
taskRouter.post("/:id", controller.update);
taskRouter.delete("/:id", controller.delete);