import { Router } from 'express';
import * as AuthComponent from '../Auth';
import * as passportConfig from '../../police/passport';

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
router.get(
    '/login',
    passportConfig.isNotAuthenticated,
    AuthComponent.loginPage,
);
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
router.get(
    '/signup',
    passportConfig.isNotAuthenticated,
    AuthComponent.signupPage,
);
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
 * Route serving Logout from users accounts.
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/logout', AuthComponent.logout);

/**
 * @export {express.Router}
 */
export default router;
