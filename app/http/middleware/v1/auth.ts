import { NextFunction, Request, Response } from "express";

/**
 * middleware - authMiddleware
 * 
 * 
 * Just checking for user id, as no such auth module exist
 */
export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {

    if (!request.headers['user']) {
        response.status(401).json({ message: 'Please pass user header!' })
    }

    next();


}