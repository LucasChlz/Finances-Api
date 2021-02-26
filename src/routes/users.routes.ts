import { request, Router } from "express";

const router = Router();


module.exports = app => app.use('/users', router);