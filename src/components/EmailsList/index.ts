import EmailsListService from './service';
import { IEmailListModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
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
        const emails: IEmailListModel[] = await EmailsListService.findAll();

        res.status(200).json({ emails });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

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
export async function create(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        EmailsListService.create(req.body);
        res.status(200).json({ message: 'emails was saved' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

        next(error);
    }
}
