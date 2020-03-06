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

export default router;
