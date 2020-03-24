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
 * @summary Makes logout from account
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 * @returns {Express.Response}
 */
export function logout(req: Request, res: Response, next: NextFunction): void {
    req.session.destroy((error: Error): void => {
        if (error) {
            next(error);

            return;
        }
    });
    res.redirect('/v1/auth/login');
}
