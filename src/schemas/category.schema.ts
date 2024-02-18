import { z } from "zod";
import { taskSchema } from "./tasks.schema";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string(),

    tasks: taskSchema.nullish(),
});

export const createCategorySchema = categorySchema.omit({id: true});

