import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BillsRepository } from "../repositories/BillsRepository";

class BillsController {

    async store(request: Request, response: Response) {
        response.json({ msg: 'store bills' })
    }
}

export { BillsController }