import { z } from "zod";
import { createUserSchema, returnUserSchema } from "../schemas/user.schema";

export type Createuser = z.infer<typeof createUserSchema>
export type ReturnUser = z.infer<typeof returnUserSchema>
export type UserLogin = ({accessToken: string})