import { z } from "zod";
import { createTaskSchema, returnTaskSchema, updateTaskSchema } from "../schemas/tasks.schema";


export type TaskObject = z.infer<typeof createTaskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type ReturnTask = z.infer<typeof returnTaskSchema>;


