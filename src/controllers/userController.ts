import { UserModel } from "../models/userModel";
import { Response, Request } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { ValidateBody } from "../decorators/ValidateBody";

export class UserController {
    @ValidateBody(CreateUserDto)
    static getUsers(req: Request, res: Response) {
        const users = UserModel.getAll()
        res.json(users)
    }
}
