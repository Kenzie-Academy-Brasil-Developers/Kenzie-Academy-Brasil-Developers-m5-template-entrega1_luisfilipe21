import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    email: z.string().email().min(1),
    password: z.string().min(4)
})

export const createUserSchema = userSchema.omit({id: true})
export const returnUserSchema = userSchema.omit({password: true})

