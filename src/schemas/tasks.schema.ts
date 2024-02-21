import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),

    categoryId: z.number().optional().nullable(),
})


export const createTaskSchema = taskSchema.omit({ id: true });
export const updateTaskSchema = createTaskSchema.partial();
export const returnTaskSchema = taskSchema.omit({ categoryId: true });