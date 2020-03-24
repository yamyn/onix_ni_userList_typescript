import { Router } from 'express';
import * as AuthComponent from '../Auth';
import * as passport from 'passport';

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router: Router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', AuthComponent.findAll);

/**
 * Route serving a creating admin
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/login', AuthComponent.loginPage);
/**
 * Route serving a creating admin
 * @name /v1/users/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', AuthComponent.login);

/**
 * Route serving a creating admin
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/signup', AuthComponent.signupPage);
/**
 * Route serving a creating admin
 * @name /v1/users/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signup', AuthComponent.signup);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
// router.post('/', AuthComponent.create);

/**
 * Route serving updating user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', AuthComponent.updateById);

/**
 * Route serving a removing user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', AuthComponent.deleteById);

/**
 * @export {express.Router}
 */
export default router;
