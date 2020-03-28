import { Router } from 'express';
import * as ScreensComponent from '../Screens';

const router: Router = Router();

/**
 * Route serving list of screenLinks.
 * @name /v1/screens
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', ScreensComponent.findAll);

/**
 * Route serving a removing user
 * @name /v1/screens
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', ScreensComponent.deleteById);

export default router;
