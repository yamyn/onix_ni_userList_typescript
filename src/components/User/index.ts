import UserService from './services/tableService';
import UserValidation from './validation';
import ValidationError from '../../error/ValidationError';
import { getUserStat, IUserStatistic } from './services/statistic';
import { NextFunction, Request, Response } from 'express';
import { IUserModel } from './model';
import Joi = require('@hapi/joi');

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
        const users: IUserModel[] = await UserService.findAll();

        res.status(200).render('index', {
            users,
            csrfToken: req.csrfToken(),
            template: 'users/table.ejs',
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/users');

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
export async function getStatistic(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const statistic: IUserStatistic = await getUserStat(30);

        res.status(200).render('index', {
            statistic,
            csrfToken: req.csrfToken(),
            template: 'users/statistic.ejs',
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/users');

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

export async function findById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { error }: Joi.ValidationResult = UserValidation.findOne({
            id: req.params.id,
        });

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const user: IUserModel = await UserService.findOne(req.params.id);

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({
                error: error.name,
                details: error.message,
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
export async function create(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { error }: Joi.ValidationResult = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const user: IUserModel = await UserService.create(req.body);

        req.flash(
            'sucsess',
            `New user ${user.fullname} was created (with _id = ${user.id})!`,
        );

        res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);

            return res.redirect('/v1/users');
        }
        if (error.name === 'MongoError') {
            req.flash('error', `${error.name}: ${error.errmsg}`);
            res.redirect('/v1/users');

            return;
        }
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/users');

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
export async function updateById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { error }: Joi.ValidationResult = UserValidation.updateById(
            req.body,
        );

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const user: IUserModel = await UserService.updateById(
            req.body.id,
            req.body,
        );

        req.flash(
            'sucsess',
            `User ${user.fullname} (with _id = ${user.id}) has been
        updated successfully!`,
        );
        res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            res.redirect('/v1/users');

            return;
        }

        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/users');

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
        const { error }: Joi.ValidationResult = UserValidation.deleteById(
            req.body,
        );

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const user: IUserModel = await UserService.deleteById(req.body.id);

        req.flash(
            'sucsess',
            `User ${user.fullname} (with _id = ${user.id}) has been
        deleted successfully!`,
        );

        res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            res.redirect('/v1/users');

            return;
        }

        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/users');

        next(error);
    }
}
