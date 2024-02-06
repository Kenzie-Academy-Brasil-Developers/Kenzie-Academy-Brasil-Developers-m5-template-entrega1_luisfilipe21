
import { z } from "zod";
import { categorySchema, createCategorySchema, updateCategorySchema } from "../schemas/category.schema";

export type CategoryObject = z.infer<typeof categorySchema>
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;