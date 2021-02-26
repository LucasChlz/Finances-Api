import { Router } from "express";

const router = Router();

router.get("/", () => {
    console.log('ola');
})

export { router }