import { Router } from 'express';
import * as AuthComponent from '../Auth';

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router: Router = Router();

/**
 * Route serving sign in user at system
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', AuthComponent.login);

/**
 * Route serving a creating new admin account
 * @name /v1/auth/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signup', AuthComponent.signup);

/**
 * Route serving giving new tokens if is refresh token
 * @name /v1/auth/refreshUp
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/refreshUp', AuthComponent.refreshUpdate);

/**
 * @export {express.Router}
 */
export default router;
