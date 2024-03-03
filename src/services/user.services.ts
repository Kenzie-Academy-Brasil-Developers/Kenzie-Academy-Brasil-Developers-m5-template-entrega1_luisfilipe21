import { compare, hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { Createuser, ReturnUser } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schema";
import { AppError } from "../errors/AppError";
import { SessionCreate, SessionReturn } from "../interfaces/session.interface";
import { sign } from "jsonwebtoken";

export class UserServices {

    create = async (userData: Createuser): Promise<ReturnUser> => {
        userData.password = await hash(userData.password, 10);

        const newUser = await prisma.user.create({ data: userData });

        return returnUserSchema.parse(newUser);
    }

    login = async (userData: SessionCreate): Promise<SessionReturn> => {
        const foundUser = await prisma.user.findFirst({ where: { email: userData.email } });
        if (!foundUser) throw new AppError(404, "User not exists");

        const existsPassword = await compare(userData.password, foundUser.password);
        if (!existsPassword) throw new AppError(401, "Email and password doesn't match");

        const secret = process.env.JWT_SECRET! as string;
        const expiresIn = "1h";

        const accessToken = sign({ id: foundUser.id }, secret, { expiresIn, subject: String(foundUser.id) });

        const user = ({
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
        })

        return { accessToken, user };
    }


    home = async (index: number): Promise<ReturnUser> => {
        
        const user = await prisma.user.findFirst({ where: { id: index } })

        return returnUserSchema.parse(user)
    }
}