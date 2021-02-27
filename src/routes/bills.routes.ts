import { Router } from "express";
import { BillsController } from '../controllers/BillsController';

const router = Router();

const billsController = new BillsController();

router.post('/store', billsController.store)

module.exports = app => app.use('/bills', router);