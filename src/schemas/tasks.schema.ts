// CREATE TABLE "Task" (
//     "id" SERIAL NOT NULL,
//     "title" TEXT NOT NULL,
//     "content" TEXT NOT NULL,
//     "finished" BOOLEAN NOT NULL DEFAULT false,
//     "categoryId" INTEGER,

//     CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
// );

import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean(),

    categoryId: z.number().positive(),
})