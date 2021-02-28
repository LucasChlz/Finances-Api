import { Router } from "express";
import { UserController } from "../controllers/UserController";

import Auth from '../middlewares/AuthMiddleware';

const router = Router();

const userController = new UserController();

router.post('/store', userController.store);
router.post('/updateValue', Auth, userController.setCurrentValue);

module.exports = app => app.use('/users', router);