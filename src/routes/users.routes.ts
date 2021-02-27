import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

const userController = new UserController();

router.post('/store', userController.store)
router.post('/login', userController.login)

module.exports = app => app.use('/users', router);