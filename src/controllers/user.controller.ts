import { Request, Response } from "express";
import { UserServices } from "../services/user.services";

export class UserController {
    private userServices = new UserServices();

    createUser = async (req: Request, res: Response): Promise<Response> => {
        const newUser = await this.userServices.create(req.body);
        return res.status(201).json(newUser);
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.userServices.login(req.body)
        return res.status(200).json(user);
    }

    home = async (req: Request, res: Response): Promise<Response> => {
        const {decoded} = res.locals;

        const user = await this.userServices.home(decoded)
        return res.status(200).json(user);
    }
}