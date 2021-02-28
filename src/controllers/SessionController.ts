import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";

class SessionController {
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
    
    async logout(request: Request, response: Response) {
    
        if (!request.session.userId) {
            return response.status(401).json({ message: "you don't have a account to log out"})
        }
        
        return request.session.destroy((err) => {
            return response.status(200).json({ message: 'logout'})
        });
    
    }
}

export { SessionController }