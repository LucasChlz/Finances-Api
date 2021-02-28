import bcrypt from 'bcrypt';
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

        const hash = await bcrypt.hash(password, 10);

        const user = UserRepo.create({ name, email, password: hash });

        await UserRepo.save(user);

        return response.status(201).json(user);
    }
}

export { UserController }