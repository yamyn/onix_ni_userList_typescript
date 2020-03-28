import AdminService from './services/service';
import adminValidation from './validation';
import ValidationError from '../../error/ValidationError';
import { NextFunction, Request, Response } from 'express';
import { IAdminModel } from './model';
import Joi = require('@hapi/joi');
import {
    ITokens,
    ITokenInfo,
    generateTokens,
    checkRefresh,
} from './services/getTokens';

// {
//     "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2t5Lm1vbnRoQGdtYWlsLmNvbSIsImlhdCI6MTU4NTM5MTEwNCwiZXhwIjoxNTg1MzkxNDA0fQ.pY1NF_LR__tGOassR2SWfh4bFVFbGRmKaVzz555dJA4",
//     "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2t5Lm1vbnRoQGdtYWlsLmNvbSIsImlhdCI6MTU4NTM5MTEwNCwiZXhwIjoxNTg1NjUwMzA0fQ.Z9S4pyE-6Utxvx68injcESi4Bzs_lhlmdw5uvFezSoU"
// }

/**
 * @export
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { error }: Joi.ValidationResult = adminValidation.login({
            email: req.body.email,
        });

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const admin: IAdminModel = await AdminService.findOne(req.body.email);

        const isMatched: boolean =
            admin && (await admin.comparePassword(req.body.password));

        if (!isMatched) {
            throw new ValidationError('Pasword is invalid!');
        }

        const { accesToken, refreshToken }: ITokens = await generateTokens(
            admin,
        );

        res.status(200).json({
            'x-access-token': accesToken,
            'refresh-token': refreshToken,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({
                error: error.name,
                details: error.message,
            });

            return;
        }
        if (error.name === 'MongoError') {
            res.status(422).json({
                error: error.name,
                details: error.errmsg,
            });

            return;
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        next(error);
    }
}

/**
 * @export
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
export async function signup(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { error }: Joi.ValidationResult = adminValidation.signup(
            req.body,
        );

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const admin: IAdminModel = await AdminService.create(req.body);

        const { accesToken, refreshToken }: ITokens = await generateTokens(
            admin,
        );

        res.status(200).json({
            'x-access-token': accesToken,
            'refresh-token': refreshToken,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({
                error: error.name,
                details: error.message,
            });

            return;
        }
        if (error.name === 'MongoError') {
            res.status(422).json({
                error: error.name,
                details: error.errmsg,
            });

            return;
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        next(error);
    }
}

/**
 * @export
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */

export async function refreshUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const token: any = req.headers['refresh-token'];
        const reqAdminInfo: ITokenInfo | null = checkRefresh(token);

        if (!reqAdminInfo) throw new ValidationError('The token has expired!');

        const admin: IAdminModel = await AdminService.findOne(
            reqAdminInfo.email,
        );

        const isMatched: boolean = admin && (await admin.compareRefresh(token));

        if (!isMatched) throw new ValidationError('Invalid refresh token!');

        const { accesToken, refreshToken }: ITokens = await generateTokens(
            admin,
        );

        res.status(200).json({
            'x-access-token': accesToken,
            'refresh-token': refreshToken,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({
                error: error.name,
                details: error.message,
            });

            return;
        }
        if (error.name === 'MongoError') {
            res.status(422).json({
                error: error.name,
                details: error.errmsg,
            });

            return;
        }
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        next(error);
    }
}
