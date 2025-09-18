import { UserModel } from "../models/userModel";
import { Response, Request } from "express";

export class UserController {
    static getUsers(req: Request, res: Response) {
        res.json(UserModel.getAll())
    }

    static getUser(req: Request, res: Response) {
        const user = UserModel.getById(Number(req.params.id))
        if (user) res.json(user)
        else res.status(404).json({message: "User not found"})
    }

    static createUser(req: Request, res: Response) {
        const {id, name, email} = req.body
        const newUser = UserModel.create({id, name, email})
        res.status(201).json(newUser)
    }
}