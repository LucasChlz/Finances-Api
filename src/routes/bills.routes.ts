import { Router } from "express";
import { BillsController } from '../controllers/BillsController';

import Auth from '../middlewares/AuthMiddleware';

const router = Router();

const billsController = new BillsController();

router.post('/store', Auth, billsController.store)
router.get('/all', Auth, billsController.listBills)
router.get('/PayUpdate/:billId', Auth, billsController.PayBillStatus)

module.exports = app => app.use('/bills', router);