import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import app from '../server/server';

interface RequestWithUser extends Request {
    admin: object | string;
}

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
export function isAuthenticated(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
): void {
    const token: any = req.headers['x-access-token'];

    if (token) {
        try {
            const admin: object | string = jwt.verify(token, app.get('secret'));

            req.admin = admin;
            console.log(admin);

            return next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token!' });
        }
    }
    res.status(401).json({ message: 'x-access-token is missing!' });

    return;
}
