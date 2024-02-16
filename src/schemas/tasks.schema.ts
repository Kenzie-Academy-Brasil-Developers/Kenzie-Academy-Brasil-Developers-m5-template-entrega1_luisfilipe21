import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean(),

    categoryId: z.number().positive().nullish(),
})

export const createTaskSchema = taskSchema.omit({id:true});
export const updateTaskSchema = createTaskSchema.partial();
