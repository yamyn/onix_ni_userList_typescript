import ScreensService from './services/dBService';
import { NextFunction, Request, Response } from 'express';
import { IScreensModel } from './model';
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const screens: IScreensModel[] = await ScreensService.findAll();

        res.status(200).json({ screens });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

        next(error);
    }
}
