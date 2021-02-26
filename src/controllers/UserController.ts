import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";

class UserController {

    async store(request: Request, response: Response)  {
        const { name, email, password } = request.body;

        const UserRepo = getCustomRepository(UserRepository);

        const verifyUser = await UserRepo.findOne({ email });

        if (verifyUser) {
            return response.status(400).json({
                error: "Email in use"
            })
        }

        const user = UserRepo.create({ name, email, password });

        await UserRepo.save(user);

        return response.status(201).json(user);
    }
}

export { UserController }