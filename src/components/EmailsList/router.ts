import { Router } from 'express';
import * as EmailListComponent from '../EmailsList';

const router: Router = Router();

/**
 * Route serving list of emails.
 * @name /v1/emails
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', EmailListComponent.findAll);

/**
 * Route serving a new emailsList
 * @name /v1/emails
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', EmailListComponent.create);

/**
 * Route serving a removing user
 * @name /v1/emails
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', EmailListComponent.deleteById);

export default router;
