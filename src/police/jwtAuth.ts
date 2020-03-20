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
    const authFromFlash: string = req.flash('token')[0];

    const token: any =
        req.headers['x-access-token'] || req.body.xatoken || authFromFlash;

    if (token) {
        try {
            const admin: object | string = jwt.verify(token, app.get('secret'));
            console.log(admin);
            req.admin = admin;

            return next();
        } catch (error) {
            res.redirect('/v1/auth/getRefresh');

            return;
        }
    }

    res.status(301).redirect('/v1/auth/login');

    return;
}
