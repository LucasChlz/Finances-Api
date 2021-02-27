import { NextFunction, Request, Response } from "express";

export default(request: Request, response: Response, next: NextFunction) => {
    const idAuth = request.session.userId;

    if (!idAuth) return response.status(401).json({ error: 'You need to log into your account'})

    next();
}