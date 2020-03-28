import * as express from 'express';
import * as http from 'http';
import UserRouter from '../components/User/router';
import AuthRouter from '../components/Auth/router';
import * as jwtConfig from '../police/jwtAuth';

/**
 * @function
 * @param {express.Application} app
 * @summary init Application router
 * @returns void
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * Forwards any requests to the /v1/users URI to UserRouter.
     * @name /v1/auth
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/auth', AuthRouter);

    /**
     * Forwards any requests to the /v1/users URI to UserRouter.
     * @name /v1/users
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);

    /**
     * @description No results returned mean the object is not found
     * @function
     * @inner
     * @param {callback} middleware - Express middleware.
     */
    app.use((req: express.Request, res: express.Response): void => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @function
     * @inner
     * @param {express.Router}
     */
    app.use(router);
}
