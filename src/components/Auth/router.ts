import { Router } from 'express';
import * as AuthComponent from '../Auth';

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router: Router = Router();

/**
 * Route serving get login page
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/login', AuthComponent.loginPage);
/**
 * Route serving login admin in system
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', AuthComponent.login);

/**
 * Route serving get signup page
 * @name /v1/auth/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/signup', AuthComponent.signupPage);
/**
 * Route serving a creating admin
 * @name /v1/auth/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signup', AuthComponent.signup);

/**
 * @export {express.Router}
 */
export default router;
