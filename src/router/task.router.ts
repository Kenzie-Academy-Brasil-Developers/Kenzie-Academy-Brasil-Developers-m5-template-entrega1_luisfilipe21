import { Router } from "express";
import { CheckMiddleware } from "../middlewares/check.middlewares";
import { TaskController } from "../controllers/task.controller";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema";

export const taskRouter = Router();
const middleware = new CheckMiddleware();
const controller = new TaskController();

taskRouter.post("/", middleware.validateBody(createTaskSchema), middleware.categoryExists, controller.create);
taskRouter.get("/", controller.readAll);

taskRouter.use("/:id", middleware.taskIdValid);

taskRouter.get("/:id", controller.readById);
taskRouter.patch("/:id", middleware.validateBody(updateTaskSchema), controller.update);
taskRouter.delete("/:id", controller.delete);