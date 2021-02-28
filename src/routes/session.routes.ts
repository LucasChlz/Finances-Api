import { Router } from "express";
import { SessionController } from "../controllers/SessionController";

const router = Router();

const userController = new SessionController();

router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = app => app.use('/authenticate', router);