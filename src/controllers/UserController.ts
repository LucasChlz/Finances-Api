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

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const UserRepo = getCustomRepository(UserRepository);

        const findUser = await UserRepo.findOne({ email });

        if (!findUser) 
            return response.status(401).json({ error: 'User not found'})

        if (!await bcrypt.compare(password, findUser.password)) 
            return response.status(401).json({ error: 'Invalid password'}) 

        request.session.userId = findUser.id;
        request.session.name = findUser.name;
        request.session.email = findUser.email;

        const userToken = request.session.userId;
        const userName = request.session.name;
        const userEmail = request.session.email;
        
        return response.status(200).json({ userToken, userName, userEmail }); 

    }
}

export { UserController }