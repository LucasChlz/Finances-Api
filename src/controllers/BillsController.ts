import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BillsRepository } from "../repositories/BillsRepository";

class BillsController {

    async store(request: Request, response: Response) {
        const { name, description, value, expiration, payed } = request.body;
        const user_id = request.session.userId;

        const billsRepo = getCustomRepository(BillsRepository);

        const bills = billsRepo.create({
            name, description, value, expiration, payed, user_id
        });

        await billsRepo.save(bills);
        
        return response.status(201).json(bills);
    }
}

export { BillsController }