import AdminService from './services/service';
import adminValidation from './validation';
import ValidationError from '../../error/ValidationError';
import { NextFunction, Request, Response } from 'express';
import { IAdminModel } from './model';
import Joi = require('@hapi/joi');
import * as passport from 'passport';

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
        const admins: IAdminModel[] = await AdminService.findAll();

        res.status(200).json({ admins });
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
export async function loginPage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.status(200).render('auth/index', {
            csrfToken: req.csrfToken(),
            template: 'login.ejs',
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/auth/login');

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

        passport.authenticate('local', {
            successRedirect: '/v1/users/',
            failureRedirect: '/v1/auth/signup',
            failureFlash: true,
        })(req, res, next);
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);

            return res.redirect('/v1/auth/login');
        }
        if (error.name === 'MongoError') {
            req.flash('error', `${error.name}: ${error.errmsg}`);
            res.redirect('/v1/auth/login');

            return;
        }
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/auth/login');

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
export async function signupPage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.status(200).render('auth/index', {
            csrfToken: req.csrfToken(),
            template: 'signup.ejs',
            errors: req.flash('error'),
            successes: req.flash('sucsess'),
        });
    } catch (error) {
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/auth/signup');

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

        res.redirect('/v1/auth/login');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);

            return res.redirect('/v1/auth/signup');
        }
        if (error.name === 'MongoError') {
            req.flash('error', `${error.name}: ${error.errmsg}`);
            res.redirect('/v1/auth/signup');

            return;
        }
        req.flash('error', `${error.name}: ${error.message}`);
        res.redirect('/v1/auth/signup');

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
        const { error }: Joi.ValidationResult = adminValidation.updateById(
            req.body,
        );

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const user: IAdminModel = await AdminService.updateById(
            req.body.id,
            req.body,
        );

        // req.flash(
        //     'sucsess',
        //     `User ${user.fullname} (with _id = ${user.id}) has been
        // updated successfully!`,
        // );
        // res.redirect('/v1/users');
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
        const { error }: Joi.ValidationResult = adminValidation.deleteById(
            req.body,
        );

        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const user: IAdminModel = await AdminService.deleteById(req.body.id);

        // req.flash(
        //     'sucsess',
        //     `New user ${user.fullname} was created (with _id = ${user.id})!`,
        // );
        // req.flash(
        //     'sucsess',
        //     `User ${user.fullname} (with _id = ${user.id}) has been
        // deleted successfully!`,
        // );

        // res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).render('errors/validError.ejs', {
                method: 'delete',
                name: error.name,
                message: error.message,
            });
        }
        // req.flash('error', `${error.name}: ${error.message}`);
        // res.redirect('/v1/users');

        next(error);
    }
}
