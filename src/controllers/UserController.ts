import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { User } from '../models/User';
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

    async setCurrentValue(request: Request, response: Response) {
        const { currentValue } = request.body;
        const userId = request.session.userId;

        const UserRepo = getCustomRepository(UserRepository);
        
        const updateValue = UserRepo.update({ id: userId }, { currentValue }).then((err) => {
            return response.status(201).json({ message: "value sucessfully updated" });
        }).catch((err) => {
            return response.status(400).json(err);
        })
    }
}

export { UserController }