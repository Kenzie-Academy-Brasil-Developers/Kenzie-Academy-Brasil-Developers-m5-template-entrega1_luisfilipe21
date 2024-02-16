import { z } from "zod";
import { createTaskSchema, taskSchema, updateTaskSchema } from "../schemas/tasks.schema";


export type TaskObject = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
