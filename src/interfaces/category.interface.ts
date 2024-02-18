import { z } from "zod";
import { categorySchema, createCategorySchema } from "../schemas/category.schema";

export type createCategory = z.infer<typeof createCategorySchema>;
export type categoryObject = z.infer<typeof categorySchema>;
