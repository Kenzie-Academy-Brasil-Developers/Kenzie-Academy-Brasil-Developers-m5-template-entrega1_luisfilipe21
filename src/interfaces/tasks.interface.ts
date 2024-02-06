import { z } from "zod";
import { createTaskSchema, taskObject, updateTaskSchema } from "../schemas/tasks.schema";


export type TaskObject = z.infer<typeof taskObject>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
