import ScreensService from './services/dBService';
import { NextFunction, Request, Response } from 'express';
import { IScreensModel } from './model';
import { transformDate, IScreen } from './services/transformDate';
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
        const screenList: IScreen[] = transformDate(screens);

        res.status(200).render('index', {
            screenList,
            adminName: req.session.passport.user,
            csrfToken: req.csrfToken(),
            template: 'screens/table.ejs',
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/screens');

        next(error);
    }
}

/**
 * @export
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
export async function deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const screen: IScreensModel = await ScreensService.deleteById(
            req.body.id,
        );

        req.flash(
            'sucsess',
            `Screen with _id = ${screen.id} has been
        deleted successfully!`,
        );

        res.redirect('/v1/screens');
    } catch (error) {
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/screens');

        next(error);
    }
}
