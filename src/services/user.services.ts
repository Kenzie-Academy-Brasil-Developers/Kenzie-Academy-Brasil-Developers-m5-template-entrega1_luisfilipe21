import { hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { Createuser, ReturnUser, UserLogin } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schema";
import { AppError } from "../errors/AppError";

export class UserServices {

    create = async (userData: Createuser): Promise<ReturnUser> => {
        userData.password = await hash(userData.password, 10);
        
        const newUser = await prisma.user.create({data: userData});
        
        return newUser
    }

    login = async (userData: Createuser): Promise<UserLogin> => {
        const foundUser = await prisma.user.findFirst({where: {email: userData.email}});   
        const existsPassword = await prisma.user.findFirst({where: {password: userData.password}});
        
        if(!foundUser || !existsPassword) throw new AppError(404, "Email and password doesn't match");

        const returnInfo = 

        return 
    }

    home = () => {

    }
}