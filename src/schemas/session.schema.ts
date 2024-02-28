import { userSchema } from "./user.schema";

export const sessionCreateSchema = userSchema.omit({id: true, name: true});
