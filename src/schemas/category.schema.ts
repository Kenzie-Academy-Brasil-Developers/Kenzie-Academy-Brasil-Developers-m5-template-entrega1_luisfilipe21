// CREATE TABLE "Category" (
//     "id" SERIAL NOT NULL,
//     "name" TEXT NOT NULL,

//     CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
// );

import { z } from "zod";
import { taskSchema } from "./tasks.schema";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string(),

    task: taskSchema.nullish()
})