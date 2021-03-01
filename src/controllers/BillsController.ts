import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Bills } from "../models/Bills";
import { User } from "../models/User";
import { BillsRepository } from "../repositories/BillsRepository";
import { UserRepository } from "../repositories/UsersRepository";

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

    async listBills(request: Request, response: Response) {
        const user_id = request.session.userId;

        const billsRepo = getCustomRepository(BillsRepository);

        const allBills = await billsRepo.createQueryBuilder("bills")
        .where("bills.user_id = :user_id", { user_id}).getMany();

        return response.status(201).json(allBills);
    }
    
    async PayBillStatus(request: Request, response: Response) {
        const billId = request.params.billId;

        const user_id = request.session.userId;
        
        const billsRepo = getCustomRepository(BillsRepository);
        const userRepo = getCustomRepository(UserRepository);
        
        const getBill = await billsRepo.createQueryBuilder("bills")
        .where("bills.id = :billId AND bills.user_id = :user_id", { billId, user_id }).getOne();

        const getUser = await userRepo.createQueryBuilder("users")
        .where("users.id = :user_id", { user_id }).getOne();

        if (!getBill) return response.status(401).json({ message: "bill nonexistent"});
        
        if (getBill.payed === 1) {

            const updatePayed = billsRepo.update({ id: billId, user_id  }, { payed: 0 }).then((err) => {

                const newUserValueUnpayed = getUser.currentValue + getBill.value;

                const updateCurrentValue = userRepo.update({ id: user_id }, { currentValue: newUserValueUnpayed }).then((err) => {
                    return response.status(201).json({ message: "Bill unpayed" });
                })
                
            })

        } else if (getBill.payed === 0) {

            const updatePayed = billsRepo.update({ id: billId, user_id  }, { payed: 1 }).then((err) => {

                const newUserValuePayed = getUser.currentValue - getBill.value;

                const updateCurrentValue = userRepo.update({ id: user_id }, { currentValue: newUserValuePayed }).then((err) => {
                    return response.status(201).json({ message: "Bill payed" });
                })
                
            })
        }   
    }
}

export { BillsController }